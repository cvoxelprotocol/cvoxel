import { TransactionLogWithChainId } from "@/interfaces/explore";
import { uploadDraft } from "@/lib/firebase/functions/verify";
import { getCVoxelService } from "@/services/CVoxel/CVoxelService";
import { useViewerRecord } from "@self.id/framework";
import { useCallback } from "react";
import type {
  CVoxel,
  CVoxelDraftAndMeta,
  CVoxelMetaDraft,
  ModelTypes,
  DeliverableItem,
} from "@/interfaces/cVoxelType";
import { useModal } from "./useModal";
import { useToast } from "./useToast";
import {
  CVOXEL_CREATION_FAILED,
  CVOXEL_CREATION_SUCCEED,
} from "@/constants/toastMessage";
import { extractCVoxel } from "@/utils/cVoxelUtil";
import { getNetworkSymbol } from "@/utils/networkUtil";
import { convertDateToTimestampStr } from "@/utils/dateUtil";
import { useStateIssueStatus } from "@/recoilstate/workCredential";
import { useCVoxelToast } from "@/hooks/useCVoxelToast";
import { useVoxStyler } from "@/hooks/useVoxStyler";
import { useStateMySelfID } from "@/recoilstate/ceramic";
import { useWalletAccount } from "./useWalletAccount";
import { getFiat } from "@/lib/firebase/functions/fiat";
import { getCeramicService } from "@/services/Ceramic/CeramicService";

export function useDraftCVoxel() {
  const { connectWallet } = useWalletAccount();
  const [mySelfID, _] = useStateMySelfID();
  const cVoxelsRecord = useViewerRecord<ModelTypes, "workCredentials">(
    "workCredentials"
  );
  const { isLoading, showLoading, closeLoading } = useModal();
  const cVoxelService = getCVoxelService();
  const { lancInfo, lancError } = useToast();
  const [issueStatus, setIssueStatus] = useStateIssueStatus();
  const ceramicService = getCeramicService();

  const { showToast } = useCVoxelToast();

  const { setCvoxelsForDisplay } = useVoxStyler();

  const publish = useCallback(
    async (
      address: string,
      selectedTx: TransactionLogWithChainId,
      summary: string,
      detail?: string,
      deliverables?: DeliverableItem[],
      relatedAddresses?: string[],
      genre?: string,
      tags?: string[],
      existedItem?: CVoxelMetaDraft
    ) => {
      if (isLoading || !summary) {
        return null;
      }

      if (mySelfID == null || mySelfID.did == null) {
        await connectWallet();
        lancError("Please try again");
        return null;
      }
      if (!cVoxelsRecord.isLoadable) {
        lancError();
        return null;
      }

      if (!genre) {
        lancError();
        return null;
      }

      showLoading();
      setIssueStatus("issuing");

      try {
        const isPayer = selectedTx.from.toLowerCase() === address.toLowerCase();

        const sigResultPromise = createDraftObjectWithSig(
          address,
          selectedTx,
          summary,
          detail,
          deliverables,
          relatedAddresses,
          genre,
          tags,
          existedItem
        );

        const fiatPromise = getFiat(
          selectedTx.value,
          selectedTx.tokenSymbol || getNetworkSymbol(selectedTx.chainId),
          selectedTx.tokenDecimal || "18",
          selectedTx.timeStamp
        );
        const res = await Promise.all([sigResultPromise, fiatPromise]);
        const { meta, draft } = res[0];
        const fiat = res[1];

        const metaDraft: CVoxelMetaDraft = {
          ...draft,
          fiatValue: fiat || "",
          fiatSymbol: "USD",
        };

        // add fiat val
        const metaWithFiat: CVoxel = {
          ...meta,
          fiatValue: fiat || "",
          fiatSymbol: "USD",
        };

        const uploadDraftPromise = uploadDraft(metaDraft);
        const workCRDLPromise = storeWorkCredential(
          metaWithFiat,
          isPayer,
          false
        );

        const storingResult = await Promise.all([
          uploadDraftPromise,
          workCRDLPromise,
        ]);
        const { status } = storingResult[0];
        const docUrl = storingResult[1];

        if (!(docUrl && status === "ok")) {
          closeLoading();
          setIssueStatus("failed");
          lancError(CVOXEL_CREATION_FAILED);
          return null;
        }

        closeLoading();
        setCvoxelsForDisplay([{ ...meta, id: "0" }]);
        lancInfo(CVOXEL_CREATION_SUCCEED);
        setIssueStatus("completed");

        return docUrl;
      } catch (error) {
        console.log("error", error);
        setIssueStatus("failed");
        closeLoading();
        lancError(CVOXEL_CREATION_FAILED);
        return null;
      }
    },
    [
      mySelfID,
      connectWallet,
      cVoxelsRecord,
      isLoading,
      cVoxelsRecord.isLoadable,
    ]
  );

  const reClaim = useCallback(
    async (
      address: string,
      selectedTx: TransactionLogWithChainId,
      summary: string,
      detail?: string,
      deliverables?: DeliverableItem[],
      relatedAddresses?: string[],
      genre?: string,
      tags?: string[],
      existedItem?: CVoxelMetaDraft
    ) => {
      if (isLoading || !summary) {
        return null;
      }

      if (mySelfID == null || mySelfID.did == null) {
        await connectWallet();
        lancError();
        return null;
      }
      if (!cVoxelsRecord.isLoadable) {
        lancError();
        return null;
      }

      showLoading();
      setIssueStatus("issuing");

      try {
        const isPayer = selectedTx.from.toLowerCase() === address.toLowerCase();
        const { meta, draft } = await createDraftObjectWithSig(
          address,
          selectedTx,
          summary,
          detail,
          deliverables,
          relatedAddresses,
          genre,
          tags,
          existedItem
        );

        const uploadDraftPromise = uploadDraft(draft);
        const workCRDLPromise = storeWorkCredential(
          meta,
          isPayer,
          !!meta.toSig && !!meta.fromSig
        );

        const res = await Promise.all([uploadDraftPromise, workCRDLPromise]);
        const { status } = res[0];
        const docUrl = res[1];

        if (!(docUrl && status === "ok")) {
          lancError();
          return null;
        }

        closeLoading();
        setIssueStatus("completed");
        lancInfo(CVOXEL_CREATION_SUCCEED);
        return docUrl;
      } catch (error) {
        console.log("error", error);
        setIssueStatus("failed");
        closeLoading();
        lancError(CVOXEL_CREATION_FAILED);
        return null;
      }
    },
    [
      mySelfID,
      connectWallet,
      cVoxelsRecord,
      isLoading,
      cVoxelsRecord.isLoadable,
    ]
  );

  const storeWorkCredential = async (
    draft: CVoxel,
    isPayer: boolean,
    isVerified: boolean
  ): Promise<string | null> => {
    if (!(mySelfID && cVoxelsRecord.isLoadable)) return null;
    const docUrl = await ceramicService.setWorkCredential(draft);
    if (!docUrl) {
      return null;
    }
    const cVoxels = cVoxelsRecord.content?.WorkCredentials ?? [];
    await cVoxelsRecord.set({
      WorkCredentials: [
        ...cVoxels,
        {
          id: docUrl,
          summary: draft.summary,
          isPayer: isPayer,
          txHash: draft.txHash || "",
          deliverables: draft.deliverables || [],
          fiatValue: draft.fiatValue || "",
          genre: draft.genre || "",
          isVerified: isVerified,
          issuedTimestamp: draft.issuedTimestamp,
        },
      ],
    });
    return docUrl;
  };

  const createDraftObjectWithSig = async (
    address: string,
    selectedTx: TransactionLogWithChainId,
    summary: string,
    detail?: string,
    deliverables?: DeliverableItem[],
    relatedAddresses?: string[],
    genre?: string,
    tags?: string[],
    existedItem?: CVoxelMetaDraft
  ): Promise<CVoxelDraftAndMeta> => {
    const to = selectedTx.to.toLowerCase();
    const from = selectedTx.from.toLowerCase();
    const usr = address.toLowerCase();

    const isPayer = from === usr;

    //get hash
    const deliverable = deliverables
      ? deliverables.map((d) => d.value).join(",")
      : undefined;
    const { signature, hash } = await getMessageHash(
      selectedTx.hash,
      usr,
      summary,
      detail,
      deliverable
    );

    let meta: CVoxel;
    const nowTimestamp = convertDateToTimestampStr(new Date());

    if (existedItem) {
      meta = {
        ...extractCVoxel(existedItem, isPayer),
        updatedAt: nowTimestamp,
      };
      if (!meta.createdAt) {
        meta.createdAt = nowTimestamp;
      }
      if (isPayer) {
        meta.fromSig = signature.toString();
      } else {
        meta.toSig = signature.toString();
      }
    } else {
      // create metadata
      // if from address is contract address and gnosissafe treasury, use following api and get owners as potentialClient
      // https://safe-transaction.rinkeby.gnosis.io/api/v1/safes/0x9576Ab75741201f430223EDF2d24A750ef787591/

      const releted =
        !relatedAddresses || relatedAddresses.length === 0
          ? [from.toLowerCase(), to.toLowerCase()]
          : relatedAddresses.concat([from.toLowerCase(), to.toLowerCase()]);
      const uniqRelated = Array.from(new Set(releted));

      meta = {
        summary: summary,
        detail: detail || "",
        deliverables: deliverables || [],
        jobType: "OneTime",
        from: from,
        to: to,
        isPayer: isPayer,
        value: selectedTx.value,
        tokenSymbol:
          selectedTx.tokenSymbol || getNetworkSymbol(selectedTx.chainId),
        tokenDecimal: Number(selectedTx.tokenDecimal) || 18,
        networkId: selectedTx.chainId || 1,
        fiatSymbol: "USD",
        issuedTimestamp: selectedTx.timeStamp,
        txHash: selectedTx.hash,
        relatedTxHashes: [selectedTx.hash],
        genre: genre || "",
        tags: tags || [],
        toSig: !isPayer ? signature.toString() : "",
        fromSig: isPayer ? signature.toString() : "",
        toSigner: !isPayer ? usr : "",
        fromSigner: isPayer ? usr : "",
        relatedAddresses: uniqRelated,
        createdAt: nowTimestamp,
        updatedAt: nowTimestamp,
      };
    }
    const draft: CVoxelMetaDraft = {
      ...meta,
      potencialPayer: [from.toLowerCase()],
      completed: true,
    };
    return { meta: meta, draft: draft };
  };

  const getMessageHash = async (
    tx: string,
    address: string,
    summary: string,
    description?: string,
    deliverable?: string
  ): Promise<{ [x: string]: any }> => {
    const { signature, hash } = await cVoxelService.getMessageHash(
      tx,
      address,
      summary,
      description,
      deliverable
    );
    return { signature, hash };
  };

  return { publish, reClaim, issueStatus };
}
