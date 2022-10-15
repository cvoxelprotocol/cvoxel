import { Web3Provider } from "@ethersproject/providers";
import {
  CVoxel,
  CVoxelItem,
  MembershipSubjectWithId,
  MembershipWithId,
  ModelTypes,
  OrganizationWIthId,
  TransactionLogWithChainId,
  WorkCredentialWithId,
} from "@/interfaces";
import { getFiat } from "@/lib/firebase/functions/fiat";
import { getNetworkSymbol } from "@/utils/networkUtil";
import { convertDateToTimestampStr } from "@/utils/dateUtil";
import { getPkhDIDFromAddress } from "@/utils/ceramicUtils";
import { createTileDocument, getSchema } from "./CeramicHelper";
import {
  uploadCRDL,
  uploadMembership,
  uploadMembershipSubject,
  uploadOrg,
} from "@/lib/firebase/functions/workCredential";
import {
  createVerifiableMembershipSubjectCredential,
  getEIP712WorkCredentialSubjectSignature,
} from "@/utils/providerUtils";
import {
  convertV1DataToCRDLOnCeramic,
  convertValidworkSubjectTypedData,
} from "@/utils/workCredentialUtil";
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
import { CeramicClient } from "@ceramicnetwork/http-client";
import { DIDDataStore } from "@glazed/did-datastore";
import { dataModel } from "@/lib/ceramic/dataModel";
import { DID } from "dids";
import { HeldWorkCredentials } from "@/__generated__/types/HeldWorkCredentials";
import { Organization } from "@/__generated__/types/Organization";
import { CERAMIC_URL } from "@/constants/common";
import { CreatedOrganizations } from "@/__generated__/types/CreatedOrganizations";
import { Membership } from "@/__generated__/types/MemberShip";
import { CreatedMemberships } from "@/__generated__/types/CreatedMemberships";
import { CreatedMembershipSubjects } from "@/__generated__/types/CreatedMembershipSubjects";
import { removeUndefinedFromArray } from "@/utils/objectUtil";
import { HeldVerifiableMembershipSubjects } from "@/__generated__/types/HeldVerifiableMembershipSubjects";
import { IssuedVerifiableMembershipSubjects } from "@/__generated__/types/IssuedVerifiableMembershipSubjects";
import { VerifiableMembershipSubjectCredential } from "@/interfaces/eip712";
import { VerifiableMembershipSubject } from "@/__generated__/types/VerifiableMembershipSubjectCredential";

type MigrateDataType = {
  v1: CVoxelItem;
  v2: WorkCredentialWithId | undefined;
  succeeded: boolean;
};

export type IssueFromTXParam = {
  address: string;
  selectedTx: TransactionLogWithChainId;
  summary: string;
  detail?: string;
  deliverables?: DeliverableItem[];
  relatedAddresses?: string[];
  genre?: string;
  tags?: string[];
  existedItem?: WorkCredentialWithId;
};

export class WorkCredentialService {
  did = undefined as DID | undefined;
  provider = undefined as Web3Provider | undefined;
  client = undefined as CeramicClient | undefined;
  dataStore = undefined as DIDDataStore<ModelTypes> | undefined;

  constructor(did?: DID, provider?: Web3Provider, client?: CeramicClient) {
    this.did = did;
    this.provider = provider;
    this.client = client;
    if (client && did) {
      this.dataStore = new DIDDataStore({
        ceramic: client,
        model: dataModel,
        id: did.parent,
      });
    }
  }

  setProvider(did?: DID, provider?: Web3Provider, client?: CeramicClient) {
    this.did = did;
    this.provider = provider;
    this.client = client;
    if (client && did) {
      this.dataStore = new DIDDataStore({
        ceramic: client,
        model: dataModel,
        id: did.parent,
      });
    }
  }

  uploadFromTX = async (
    param: IssueFromTXParam
  ): Promise<string | undefined> => {
    if (!this.did) return;
    const {
      address,
      summary,
      detail,
      deliverables,
      relatedAddresses,
      genre,
      tags,
      selectedTx,
      existedItem,
    } = param;

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
      this.did.parent,
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
    if (!this.client || !this.did) return undefined;
    const doc = await createTileDocument<WorkCredential>(
      this.client,
      this.did.parent,
      content,
      getSchema("WorkCredential")
    );
    if (!doc) return undefined;
    const docUrl = doc.id.toUrl();
    const crdl: WorkCredentialWithId = { ...content, backupId: docUrl };
    const setHeldWC = this.setHeldWorkCredential(docUrl);
    const uploadBackup = uploadCRDL(crdl);
    await Promise.all([setHeldWC, uploadBackup]);
    return docUrl;
  };

  setHeldWorkCredential = async (contentId: string): Promise<void> => {
    if (!this.dataStore || !this.did) return undefined;
    const heldWorkCredentials = await this.dataStore.get<
      "heldWorkCredentials",
      HeldWorkCredentials
    >("heldWorkCredentials", this.did.parent);
    const workCRDLs = heldWorkCredentials?.held ?? [];
    const updatedCredentails = [...workCRDLs, contentId];
    await this.dataStore.set("heldWorkCredentials", {
      held: updatedCredentails,
    });
  };

  setMultipleHeldWorkCredentials = async (
    contentIds: string[]
  ): Promise<void> => {
    if (!this.dataStore || !this.did) return undefined;
    const heldWorkCredentials = await this.dataStore.get<
      "heldWorkCredentials",
      HeldWorkCredentials
    >("heldWorkCredentials", this.did.parent);
    const workCRDLs = heldWorkCredentials?.held ?? [];
    const updatedCredentails = [...workCRDLs, ...contentIds];
    await this.dataStore.set("heldWorkCredentials", {
      held: updatedCredentails,
    });
  };

  deleteCredential = async (contentIds: string[]): Promise<void> => {
    if (!this.dataStore || !this.did) return undefined;
    const heldWorkCredentials = await this.dataStore.get<
      "heldWorkCredentials",
      HeldWorkCredentials
    >("heldWorkCredentials", this.did.parent);
    const workCRDLs = heldWorkCredentials?.held ?? [];
    const updatedCredentails = workCRDLs.filter((c) => !contentIds.includes(c));
    console.log(contentIds.length);
    console.log(updatedCredentails.length);
    console.log({ contentIds });
    console.log({ updatedCredentails });
    await this.dataStore.set("heldWorkCredentials", {
      held: updatedCredentails,
    });
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
      const subjectWithDefaultValue = convertValidworkSubjectTypedData(subject);
      const holderSig = await getEIP712WorkCredentialSubjectSignature(
        subjectWithDefaultValue,
        this.provider
      );
      crdl = {
        id,
        subject: subjectWithDefaultValue,
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
        organization: "",
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
    if (!this.dataStore || !this.did) return;
    console.log("executeMigration start");
    const v1 = await this.dataStore.get("OldWorkCredentials", this.did.parent);
    if (v1?.WorkCredentials && v1.WorkCredentials.length > 0) {
      await this.migrate(v1.WorkCredentials, address);
    }
  };

  migrate = async (items: CVoxelItem[], address: string): Promise<void> => {
    if (!this.dataStore || !this.did) return;
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

    const heldWorkCredentials = await this.dataStore.get(
      "heldWorkCredentials",
      this.did.parent
    );

    const workCRDLs = heldWorkCredentials?.held ?? [];
    const updatedCredentails = [...workCRDLs, ...v2Ids];
    // mirgate heldWorkCredentials
    await this.dataStore.set("heldWorkCredentials", {
      held: updatedCredentails,
    });

    // delete v1 data
    const remainCRDLs = items.filter((item) =>
      migrateFailureItems.includes(item.id)
    );
    await this.dataStore.set("OldWorkCredentials", {
      WorkCredentials: remainCRDLs,
    });

    console.log("executeMigration end");
  };

  migrateWorkCredential = async (
    v1Data: CVoxelItem,
    address: string
  ): Promise<MigrateDataType> => {
    if (!this.client) return { v1: v1Data, v2: undefined, succeeded: false };
    const v1 = await TileDocument.load<CVoxel>(this.client, v1Data.id);
    const v2 = convertV1DataToCRDLOnCeramic(v1.content, address);
    if (!v2) return { v1: v1Data, v2: undefined, succeeded: false };

    const doc = await createTileDocument<WorkCredential>(
      this.client,
      getPkhDIDFromAddress(address),
      v2,
      getSchema("WorkCredential")
    );
    if (!doc) return { v1: v1Data, v2: undefined, succeeded: false };
    const docUrl = doc.id.toUrl();
    const crdl: WorkCredentialWithId = { ...v2, backupId: docUrl };
    return { v1: v1Data, v2: crdl, succeeded: true };
  };

  update = async (id: string, newItem: WorkCredential) => {
    if (!this.client) return;
    const nowTimestamp = convertDateToTimestampStr(new Date());
    const doc = await TileDocument.load<WorkCredential>(this.client, id);
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

  fetchWorkCredentials = async (
    did?: string
  ): Promise<WorkCredentialWithId[]> => {
    if (!did) return [];
    const ceramic = this.client || new CeramicClient(CERAMIC_URL);
    const dataStore = new DIDDataStore({ ceramic, model: dataModel });
    const HeldWorkCredentials = await dataStore.get<
      "heldWorkCredentials",
      HeldWorkCredentials
    >("heldWorkCredentials", did);
    console.log({ HeldWorkCredentials });
    if (!HeldWorkCredentials?.held) return [];
    const promiseArr = [];
    for (const id of HeldWorkCredentials.held) {
      const loadPromise = TileDocument.load<WorkCredential>(ceramic, id);
      promiseArr.push(loadPromise);
    }
    const res = await Promise.all(promiseArr);
    return res.map((r) => {
      const crdl: WorkCredentialWithId = {
        ...r.content,
        backupId: r.id.toString(),
      };
      return crdl;
    });
  };

  fetchCreatedOrganization = async (
    did?: string
  ): Promise<OrganizationWIthId[] | null> => {
    const ceramic = this.client || new CeramicClient(CERAMIC_URL);
    const pkhDid = did || this.did?.parent;
    const dataStore =
      this.dataStore ||
      new DIDDataStore({
        ceramic: ceramic,
        model: dataModel,
        id: pkhDid,
      });
    const CreatedOrganizations = await dataStore.get<
      "CreatedOrganizations",
      CreatedOrganizations
    >("CreatedOrganizations", pkhDid);
    const createdOrgs = CreatedOrganizations?.created ?? [];
    if (createdOrgs.length === 0) return null;
    const arr: Promise<OrganizationWIthId | undefined>[] = [];
    for (const orgId of createdOrgs) {
      const o = this.fetchOrganization(orgId);
      arr.push(o);
    }
    const res = await Promise.all(arr);
    return removeUndefinedFromArray<OrganizationWIthId>(res);
  };

  fetchCreatedMemberships = async (
    did?: string
  ): Promise<MembershipWithId[] | null> => {
    const ceramic = this.client || new CeramicClient(CERAMIC_URL);
    const pkhDid = did || this.did?.parent;
    const dataStore =
      this.dataStore ||
      new DIDDataStore({
        ceramic: ceramic,
        model: dataModel,
        id: pkhDid,
      });
    const CreatedMemberships = await dataStore.get<
      "CreatedMemberships",
      CreatedMemberships
    >("CreatedMemberships", pkhDid);
    const created = CreatedMemberships?.created ?? [];
    if (created.length === 0) return null;
    const arr: Promise<MembershipWithId | undefined>[] = [];
    for (const id of created) {
      const o = this.fetcMembership(id);
      arr.push(o);
    }
    const res = await Promise.all(arr);
    return removeUndefinedFromArray<MembershipWithId>(res);
  };

  fetchIssuedMembershipSubjects = async (
    did?: string
  ): Promise<MembershipSubjectWithId[] | null> => {
    const ceramic = this.client || new CeramicClient(CERAMIC_URL);
    const pkhDid = did || this.did?.parent;
    const dataStore =
      this.dataStore ||
      new DIDDataStore({
        ceramic: ceramic,
        model: dataModel,
        id: pkhDid,
      });
    const IssuedVerifiableMembershipSubjects = await dataStore.get<
      "IssuedVerifiableMembershipSubjects",
      IssuedVerifiableMembershipSubjects
    >("IssuedVerifiableMembershipSubjects", pkhDid);
    const issued = IssuedVerifiableMembershipSubjects?.issued ?? [];
    console.log({ issued });
    if (issued.length === 0) return null;
    const arr: Promise<MembershipSubjectWithId | undefined>[] = [];
    for (const id of issued) {
      const o = this.fetcMembershipSubject(id);
      arr.push(o);
    }
    const res = await Promise.all(arr);
    return removeUndefinedFromArray<MembershipSubjectWithId>(res);
  };

  fetchHeldMembershipSubjects = async (
    did?: string
  ): Promise<MembershipSubjectWithId[] | null> => {
    const ceramic = this.client || new CeramicClient(CERAMIC_URL);
    const pkhDid = did || this.did?.parent;
    const dataStore =
      this.dataStore ||
      new DIDDataStore({
        ceramic: ceramic,
        model: dataModel,
        id: pkhDid,
      });
    const HeldMembershipSubjects = await dataStore.get<
      "HeldVerifiableMembershipSubjects",
      HeldVerifiableMembershipSubjects
    >("HeldVerifiableMembershipSubjects", pkhDid);
    const created = HeldMembershipSubjects?.held ?? [];
    if (created.length === 0) return [];
    const arr: Promise<MembershipSubjectWithId | undefined>[] = [];
    for (const id of created) {
      const o = this.fetcMembershipSubject(id);
      arr.push(o);
    }
    const res = await Promise.all(arr);
    return removeUndefinedFromArray<MembershipSubjectWithId>(res);
  };

  fetchOrganization = async (
    orgId?: string
  ): Promise<OrganizationWIthId | undefined> => {
    if (!orgId) return undefined;
    const ceramic = this.client || new CeramicClient(CERAMIC_URL);
    const doc = await TileDocument.load<Organization>(ceramic, orgId);
    return { ...doc.content, ceramicId: orgId };
  };

  fetcMembership = async (
    id?: string
  ): Promise<MembershipWithId | undefined> => {
    if (!id) return undefined;
    const ceramic = this.client || new CeramicClient(CERAMIC_URL);
    const doc = await TileDocument.load<Membership>(ceramic, id);
    return { ...doc.content, ceramicId: id };
  };

  fetcMembershipSubject = async (
    id?: string
  ): Promise<MembershipSubjectWithId | undefined> => {
    if (!id) return undefined;
    const ceramic = this.client || new CeramicClient(CERAMIC_URL);
    const doc = await TileDocument.load<VerifiableMembershipSubjectCredential>(
      ceramic,
      id
    );
    return { ...doc.content, ceramicId: id };
  };

  createOrganization = async (
    content: Organization
  ): Promise<string | undefined> => {
    if (!this.client || !this.did || !this.dataStore) return undefined;
    const doc = await createTileDocument<Organization>(
      this.client,
      this.did.parent,
      content,
      getSchema("Organization")
    );
    if (!doc) return undefined;
    const docUrl = doc.id.toUrl();
    const val: OrganizationWIthId = { ...content, ceramicId: docUrl };
    const setOrgs = this.setCreatedOrganizations(docUrl);
    const uploadBackup = uploadOrg(val);
    await Promise.all([setOrgs, uploadBackup]);
    return docUrl;
  };

  setCreatedOrganizations = async (contentId: string): Promise<void> => {
    if (!this.dataStore || !this.did) return undefined;
    const CreatedOrganizations = await this.dataStore.get<
      "CreatedOrganizations",
      CreatedOrganizations
    >("CreatedOrganizations", this.did.parent);
    const orgs = CreatedOrganizations?.created ?? [];
    const updatedOrgs = [...orgs, contentId];
    await this.dataStore.set("CreatedOrganizations", {
      created: updatedOrgs,
    });
  };

  createMembership = async (
    content: Membership
  ): Promise<string | undefined> => {
    if (!this.client || !this.did || !this.dataStore) return undefined;
    const doc = await createTileDocument<Membership>(
      this.client,
      this.did.parent,
      content,
      getSchema("MemberShip")
    );
    if (!doc) return undefined;
    const docUrl = doc.id.toUrl();
    const val: MembershipWithId = { ...content, ceramicId: docUrl };
    const setPromise = this.setCreatedMemberships(docUrl);
    const uploadBackup = uploadMembership(val);
    await Promise.all([setPromise, uploadBackup]);
    return docUrl;
  };

  setCreatedMemberships = async (contentId: string): Promise<void> => {
    if (!this.dataStore || !this.did) return undefined;
    const CreatedMemberships = await this.dataStore.get<
      "CreatedMemberships",
      CreatedMemberships
    >("CreatedMemberships", this.did.parent);
    const currentVal = CreatedMemberships?.created ?? [];
    const updatedVal = [...currentVal, contentId];
    await this.dataStore.set("CreatedMemberships", {
      created: updatedVal,
    });
  };

  issueMembershipSubject = async (
    content: VerifiableMembershipSubject
  ): Promise<string | undefined> => {
    if (!this.client || !this.did || !this.dataStore) return undefined;

    // TODO: sign and create verifiable credential before save data
    const vc = await createVerifiableMembershipSubjectCredential(
      content,
      this.provider
    );

    const doc = await createTileDocument<VerifiableMembershipSubjectCredential>(
      this.client,
      this.did.parent,
      vc,
      getSchema("VerifiableMembershipSubjectCredential")
    );
    if (!doc) return undefined;
    const docUrl = doc.id.toUrl();
    const val: MembershipSubjectWithId = { ...vc, ceramicId: docUrl };
    const setOrgs = this.setIssuedMembershipSubjects(docUrl);
    const uploadBackup = uploadMembershipSubject(val);
    await Promise.all([setOrgs, uploadBackup]);
    return docUrl;
  };

  setIssuedMembershipSubjects = async (contentId: string): Promise<void> => {
    if (!this.dataStore || !this.did) return undefined;
    const CreatedMembershipSubjects = await this.dataStore.get<
      "IssuedVerifiableMembershipSubjects",
      IssuedVerifiableMembershipSubjects
    >("IssuedVerifiableMembershipSubjects", this.did.parent);
    const currentVal = CreatedMembershipSubjects?.issued ?? [];
    const updatedVal = [...currentVal, contentId];
    await this.dataStore.set("IssuedVerifiableMembershipSubjects", {
      issued: updatedVal,
    });
  };

  setHeldMembershipSubjects = async (contentIds: string[]): Promise<void> => {
    if (!this.dataStore || !this.did) return undefined;
    const HeldMembershipSubjects = await this.dataStore.get<
      "HeldVerifiableMembershipSubjects",
      HeldVerifiableMembershipSubjects
    >("HeldVerifiableMembershipSubjects", this.did.parent);
    const currentVal = HeldMembershipSubjects?.held ?? [];
    const updatedVal = [...currentVal, ...contentIds];
    await this.dataStore.set("HeldVerifiableMembershipSubjects", {
      held: updatedVal,
    });
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
