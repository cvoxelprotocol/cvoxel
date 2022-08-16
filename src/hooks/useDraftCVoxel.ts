import { TransactionLogWithChainId } from "@/interfaces/explore";
import { createDraftWighVerify } from "@/lib/firebase/functions/verify";
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
import { useStateIssueStatus } from "@/recoilstate/cvoxel";
import { useCVoxelToast } from "@/hooks/useCVoxelToast";
import { useVoxStyler } from "@/hooks/useVoxStyler";
import { useStateMySelfID } from "@/recoilstate/ceramic";
import { useWalletAccount } from "./useWalletAccount";

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

  const { showToast } = useCVoxelToast();

  const { cvoxelsForDisplay, convertCVoxelsForDisplay } = useVoxStyler();

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
        return false;
      }

      if (mySelfID == null || mySelfID.did == null) {
        await connectWallet();
        lancError("Please try again");
        return false;
      }
      if (!cVoxelsRecord.isLoadable) {
        lancError();
        return false;
      }

      if (!genre) {
        lancError();
        return false;
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

        const { status, fiat } = await createDraftWighVerify(
          address.toLowerCase(),
          draft
        );
        if (status !== "ok") {
          closeLoading();
          setIssueStatus("failed");
          lancError(CVOXEL_CREATION_FAILED);
          return false;
        }

        // add fiat val
        const metaWithFiat: CVoxel = {
          ...meta,
          fiatValue: fiat || "",
          fiatSymbol: "USD",
        };

        const doc = await mySelfID.client.dataModel.createTile(
          "WorkCredential",
          {
            ...metaWithFiat,
          }
        );
        const cVoxels = cVoxelsRecord.content?.WorkCredentials ?? [];
        const docUrl = doc.id.toUrl();
        await cVoxelsRecord.set({
          WorkCredentials: [
            ...cVoxels,
            {
              id: docUrl,
              summary: metaWithFiat.summary,
              isPayer: isPayer,
              txHash: metaWithFiat.txHash || "",
              deliverables: metaWithFiat.deliverables || [],
              fiatValue: metaWithFiat.fiatValue || "",
              genre: metaWithFiat.genre || "",
              isVerified: false,
              issuedTimestamp: metaWithFiat.issuedTimestamp,
            },
          ],
        });

        closeLoading();
        convertCVoxelsForDisplay([{ ...meta, id: "0" }]);
        if (
          !!cvoxelsForDisplay &&
          cvoxelsForDisplay.length > 0 &&
          !!cvoxelsForDisplay[0]
        ) {
          await showToast({
            message: "Created!",
            voxel: cvoxelsForDisplay[0],
            duration: 3,
          });
        } else {
          lancInfo(CVOXEL_CREATION_SUCCEED);
        }
        setIssueStatus("completed");
        return true;
      } catch (error) {
        console.log("error", error);
        setIssueStatus("failed");
        closeLoading();
        lancError(CVOXEL_CREATION_FAILED);
        return false;
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
        return false;
      }

      if (mySelfID == null || mySelfID.did == null) {
        await connectWallet();
        lancError();
        return false;
      }
      if (!cVoxelsRecord.isLoadable) {
        lancError();
        return false;
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

        await createDraftWighVerify(address.toLowerCase(), draft);

        const doc = await mySelfID.client.dataModel.createTile(
          "WorkCredential",
          {
            ...meta,
          }
        );
        const cVoxels = cVoxelsRecord.content?.WorkCredentials ?? [];
        const docUrl = doc.id.toUrl();
        await cVoxelsRecord.set({
          WorkCredentials: [
            ...cVoxels,
            {
              id: docUrl,
              summary: meta.summary,
              isPayer: isPayer,
              txHash: meta.txHash || "",
              deliverables: meta.deliverables || [],
              fiatValue: meta.fiatValue || "",
              genre: meta.genre || "",
              isVerified: !!meta.toSig && !!meta.fromSig,
              issuedTimestamp: meta.issuedTimestamp,
            },
          ],
        });
        closeLoading();
        setIssueStatus("completed");
        lancInfo(CVOXEL_CREATION_SUCCEED);
        return true;
      } catch (error) {
        console.log("error", error);
        setIssueStatus("failed");
        closeLoading();
        lancError(CVOXEL_CREATION_FAILED);
        return false;
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
        ...extractCVoxel(existedItem),
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
