import { Web3Provider } from "@ethersproject/providers";
import {
  CVoxel,
  CVoxelItem,
  ModelTypes,
  TransactionLogWithChainId,
  WorkCredentialWithId,
} from "@/interfaces";
import { getFiat } from "@/lib/firebase/functions/fiat";
import { getNetworkSymbol } from "@/utils/networkUtil";
import { SelfID } from "@self.id/web";
import { convertDateToTimestampStr } from "@/utils/dateUtil";
import { getPkhDIDFromAddress } from "@/utils/ceramicUtils";
import { createTileDocument, getSchema } from "./CeramicHelper";
import { uploadCRDL } from "@/lib/firebase/functions/workCredential";
import { getEIP712WorkCredentialSubjectSignature } from "@/utils/providerUtils";
import { convertV1DataToCRDLOnCeramic } from "@/utils/workCredentialUtil";
import { TileDocument } from "@ceramicnetwork/stream-tile";
import {
  Client,
  DeliverableItem,
  Signatures,
  Transaction,
  Work,
  WorkCredential,
  WorkSubject,
} from "@/__generated__/types/WorkCredential";

type MigrateDataType = {
  v1: CVoxelItem;
  v2: WorkCredentialWithId | undefined;
  succeeded: boolean;
};

export class WorkCredentialService {
  selfID = undefined as SelfID<ModelTypes> | undefined | null;
  provider = undefined as Web3Provider | undefined;

  constructor(selfID?: SelfID<ModelTypes>, provider?: Web3Provider) {
    this.selfID = selfID;
    this.provider = provider;
  }

  setProvider(selfID?: SelfID<ModelTypes>, provider?: Web3Provider) {
    this.selfID = selfID;
    this.provider = provider;
  }

  uploadFromTX = async (
    address: string,
    selectedTx: TransactionLogWithChainId,
    summary: string,
    detail?: string,
    deliverables?: DeliverableItem[],
    relatedAddresses?: string[],
    genre?: string,
    tags?: string[],
    existedItem?: WorkCredentialWithId
  ): Promise<string | undefined> => {
    if (!this.selfID) return;

    const fiat =
      existedItem && existedItem.subject.tx?.fiatValue
        ? existedItem.subject.tx?.fiatValue
        : await getFiat(
            selectedTx.value,
            selectedTx.tokenSymbol || getNetworkSymbol(selectedTx.chainId),
            selectedTx.tokenDecimal || "18",
            selectedTx.timeStamp
          );

    const metaDraft = await this.createWorkCredential(
      this.selfID.id,
      address,
      selectedTx,
      summary,
      detail,
      deliverables,
      relatedAddresses,
      genre,
      tags,
      fiat,
      "0",
      existedItem
    );

    const docUrl = await this.storeWorkCredential(metaDraft);
    return docUrl;
  };

  storeWorkCredential = async (
    content: WorkCredential
  ): Promise<string | undefined> => {
    if (!this.selfID) return undefined;
    const doc = await createTileDocument<WorkCredential>(
      this.selfID,
      content,
      getSchema("WorkCredential")
    );
    if (!doc) return undefined;
    const docUrl = doc.id.toUrl();
    const crdl: WorkCredentialWithId = { ...content, backupId: docUrl };
    const setHeldWC = this.setHeldWorkCredentials(this.selfID, docUrl);
    const uploadBackup = uploadCRDL(crdl);
    await Promise.all([setHeldWC, uploadBackup]);
    return docUrl;
  };

  setHeldWorkCredentials = async (
    selfID: SelfID<ModelTypes>,
    contentId: string
  ): Promise<void> => {
    const heldWorkCredentials = await selfID.get("heldWorkCredentials");
    const workCRDLs = heldWorkCredentials?.held ?? [];
    const updatedCredentails = [...workCRDLs, contentId];
    await selfID.set("heldWorkCredentials", { held: updatedCredentails });
  };

  createWorkCredential = async (
    id: string,
    address: string,
    selectedTx: TransactionLogWithChainId,
    summary: string,
    detail?: string,
    deliverables?: DeliverableItem[],
    relatedAddresses?: string[],
    genre?: string,
    tags?: string[],
    value?: string,
    tax?: string,
    existedItem?: WorkCredentialWithId
  ): Promise<WorkCredential> => {
    const to = selectedTx.to.toLowerCase();
    const from = selectedTx.from.toLowerCase();
    const usr = address.toLowerCase();
    const isPayer = from === usr;

    let crdl: WorkCredential;
    const nowTimestamp = convertDateToTimestampStr(new Date());

    if (existedItem) {
      const { id, subject, signature } = existedItem;
      const holderSig = await getEIP712WorkCredentialSubjectSignature(
        subject,
        this.provider
      );
      crdl = {
        id,
        subject,
        signature: {
          holderSig: holderSig,
          partnerSig: signature?.partnerSig || "",
          partnerSigner: signature?.partnerSigner || "",
          agentSig: signature?.agentSig || "",
          agentSigner: signature?.agentSigner || "",
        },
        createdAt: nowTimestamp,
        updatedAt: nowTimestamp,
      };
    } else {
      // create metadata
      // if from address is contract address and gnosissafe treasury, use following api and get owners as potentialClient
      // https://safe-transaction.rinkeby.gnosis.io/api/v1/safes/0x9576Ab75741201f430223EDF2d24A750ef787591/

      const releted =
        !relatedAddresses || relatedAddresses.length === 0
          ? [from.toLowerCase(), to.toLowerCase()]
          : relatedAddresses.concat([from.toLowerCase(), to.toLowerCase()]);
      const uniqRelated = Array.from(new Set(releted));

      const clientDID = getPkhDIDFromAddress(isPayer ? to : from);
      const client: Client = {
        format: "DID",
        value: clientDID,
      };

      const tx: Transaction = {
        txHash: selectedTx.hash,
        from: from,
        to: to,
        isPayer: isPayer,
        value: selectedTx.value,
        fiatValue: value,
        fiatSymbol: "USD",
        tokenSymbol:
          selectedTx.tokenSymbol || getNetworkSymbol(selectedTx.chainId),
        tokenDecimal: Number(selectedTx.tokenDecimal) || 18,
        networkId: selectedTx.chainId || 1,
        issuedTimestamp: selectedTx.timeStamp,
        relatedTxHashes: [selectedTx.hash],
        relatedAddresses: uniqRelated,
      };

      const work: Work = {
        id,
        value: value || selectedTx.value,
        tax: tax || "0",
        summary: summary,
        detail: detail || "",
        jobType: "OneTime",
        genre: genre || "",
        tags: tags || [],
        startTimestamp: "",
        endTimestamp: "",
        platform: "",
        deliverableHash: "",
        issuedAt: nowTimestamp,
      };

      const subject: WorkSubject = {
        work,
        tx,
        deliverables,
        client,
      };

      const holderSig = await getEIP712WorkCredentialSubjectSignature(
        subject,
        this.provider
      );

      const signature: Signatures = {
        holderSig: holderSig,
      };

      crdl = {
        id,
        subject,
        signature,
        createdAt: nowTimestamp,
        updatedAt: nowTimestamp,
      };
    }
    return crdl;
  };

  executeMigration = async (address: string): Promise<void> => {
    if (!this.selfID) return;
    console.log("executeMigration start");
    const v1 = await this.selfID.get("OldWorkCredentials");
    if (v1?.WorkCredentials && v1.WorkCredentials.length > 0) {
      await this.migrate(v1.WorkCredentials, address);
    }
  };

  migrate = async (items: CVoxelItem[], address: string): Promise<void> => {
    if (!this.selfID) return;
    if (!this.selfID?.client.ceramic) return;
    let migrateExecute: Promise<MigrateDataType>[] = [];
    for (const item of items) {
      const migrateCeramicPromise = this.migrateWorkCredential(item, address);
      migrateExecute.push(migrateCeramicPromise);
    }
    const crdls = await Promise.all(migrateExecute);

    let migrateFailureItems: string[] = [];
    let v2Ids: string[] = [];
    for (const crdl of crdls) {
      if (crdl.succeeded && crdl.v2?.backupId) {
        v2Ids.push(crdl.v2?.backupId);
      } else {
        migrateFailureItems.push(crdl.v1.id);
      }
    }

    const heldWorkCredentials = await this.selfID.get("heldWorkCredentials");

    const workCRDLs = heldWorkCredentials?.held ?? [];
    const updatedCredentails = [...workCRDLs, ...v2Ids];
    // mirgate heldWorkCredentials
    await this.selfID.set("heldWorkCredentials", { held: updatedCredentails });

    // delete v1 data
    const remainCRDLs = items.filter((item) =>
      migrateFailureItems.includes(item.id)
    );
    await this.selfID.set("OldWorkCredentials", {
      WorkCredentials: remainCRDLs,
    });

    console.log("executeMigration end");
  };

  migrateWorkCredential = async (
    v1Data: CVoxelItem,
    address: string
  ): Promise<MigrateDataType> => {
    if (!this.selfID) return { v1: v1Data, v2: undefined, succeeded: false };
    if (!this.selfID?.client.ceramic)
      return { v1: v1Data, v2: undefined, succeeded: false };
    const v1 = await TileDocument.load<CVoxel>(
      this.selfID?.client.ceramic,
      v1Data.id
    );
    const v2 = convertV1DataToCRDLOnCeramic(v1.content, address);
    if (!v2) return { v1: v1Data, v2: undefined, succeeded: false };

    const doc = await createTileDocument<WorkCredential>(
      this.selfID,
      v2,
      getSchema("WorkCredential")
    );
    if (!doc) return { v1: v1Data, v2: undefined, succeeded: false };
    const docUrl = doc.id.toUrl();
    const crdl: WorkCredentialWithId = { ...v2, backupId: docUrl };
    return { v1: v1Data, v2: crdl, succeeded: true };
  };

  update = async (id: string, newItem: WorkCredential) => {
    if (!this.selfID) return;
    const nowTimestamp = convertDateToTimestampStr(new Date());
    const doc = await TileDocument.load<WorkCredential>(
      this.selfID.client.ceramic,
      id
    );
    if (doc) {
      await doc.update({ ...newItem, updatedAt: nowTimestamp });
      await uploadCRDL({ ...newItem, backupId: id });
    }
  };

  // Only update backup DB
  signWorkCredential = async (
    id: string,
    credential: WorkCredential,
    signer: string
  ): Promise<WorkCredentialWithId> => {
    const nowTimestamp = convertDateToTimestampStr(new Date());
    const signature = await getEIP712WorkCredentialSubjectSignature(
      credential.subject,
      this.provider
    );
    const crdl: WorkCredentialWithId = {
      ...credential,
      signature: {
        ...credential.signature,
        partnerSig: signature,
        partnerSigner: signer,
      },
      updatedAt: nowTimestamp,
    };
    await uploadCRDL({ ...crdl, backupId: id });
    return crdl;
  };
}

let workCredentialService: WorkCredentialService;

export const getWorkCredentialService = (): WorkCredentialService => {
  if (workCredentialService) {
    return workCredentialService;
  }
  workCredentialService = new WorkCredentialService();
  return workCredentialService;
};
