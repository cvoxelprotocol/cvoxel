import { TransactionLog } from "@/interfaces/explore";
import { createDraftWighVerify } from "@/lib/firebase/functions/verify";
import { getCVoxelService } from "@/services/CVoxel/CVoxelService";
import { useConnection, useViewerRecord } from "@self.id/framework";
import { Web3Provider } from "@self.id/multiauth";
import { useWeb3React } from "@web3-react/core";
import { useCallback } from "react";
import type {
  CVoxel,
  CVoxelDraftAndMeta,
  CVoxelMetaDraft,
  ModelTypes,
} from "@/interfaces/cVoxelType";
import { useModal } from "./useModal";
import { useToast } from "./useToast";
import {
  CVOXEL_CREATION_FAILED,
  CVOXEL_CREATION_SUCCEED,
} from "@/constants/toastMessage";
import { extractCVoxel } from "@/utils/cVoxelUtil";

export function useDraftCVoxel() {
  const { chainId } = useWeb3React<Web3Provider>();
  const connect = useConnection<ModelTypes>()[1];
  const cVoxelsRecord = useViewerRecord<ModelTypes, "cVoxels">("cVoxels");
  const { isLoading, showLoading, closeLoading } = useModal();
  const cVoxelService = getCVoxelService();
  const { lancInfo, lancError } = useToast();

  const publish = useCallback(
    async (
      address: string,
      selectedTx: TransactionLog,
      summary: string,
      detail?: string,
      deliverable?: string,
      existedItem?: CVoxelMetaDraft
    ) => {
      if (isLoading || !summary || !chainId) {
        return false;
      }

      const selfID = await connect();
      if (selfID == null || selfID.did == null) {
        lancError();
        return false;
      }
      if (!cVoxelsRecord.isLoadable) {
        lancError();
        return false;
      }

      showLoading();

      try {
        const isPayer = selectedTx.from.toLowerCase() === address.toLowerCase();

        const { meta, draft } = await createDraftObjectWithSig(
          address,
          selectedTx,
          summary,
          detail,
          deliverable,
          existedItem
        );

        const result = await createDraftWighVerify(
          address.toLowerCase(),
          draft
        );
        if (result !== "ok") {
          closeLoading();
          lancError(CVOXEL_CREATION_FAILED);
          return false;
        }

        const doc = await selfID.client.dataModel.createTile("CVoxel", {
          ...meta,
        });
        const cVoxels = cVoxelsRecord.content?.cVoxels ?? [];
        const docUrl = doc.id.toUrl();
        await cVoxelsRecord.set({
          cVoxels: [
            ...cVoxels,
            {
              id: docUrl,
              summary: meta.summary,
              isPayer: isPayer,
              txHash: meta.txHash,
              issuedTimestamp: meta.issuedTimestamp,
            },
          ],
        });
        closeLoading();
        lancInfo(CVOXEL_CREATION_SUCCEED);
        return true;
      } catch (error) {
        closeLoading();
        lancError(CVOXEL_CREATION_FAILED);
        return false;
      }
    },
    [connect, cVoxelsRecord, isLoading, cVoxelsRecord.isLoadable]
  );

  const reClaim = useCallback(
    async (
      address: string,
      selectedTx: TransactionLog,
      summary: string,
      detail?: string,
      deliverable?: string,
      existedItem?: CVoxelMetaDraft
    ) => {
      if (isLoading || !summary || !chainId) {
        return false;
      }

      const selfID = await connect();
      if (selfID == null || selfID.did == null) {
        lancError();
        return false;
      }
      if (!cVoxelsRecord.isLoadable) {
        lancError();
        return false;
      }

      showLoading();

      try {
        const isPayer = selectedTx.from.toLowerCase() === address.toLowerCase();

        const { meta, draft } = await createDraftObjectWithSig(
          address,
          selectedTx,
          summary,
          detail,
          deliverable,
          existedItem
        );

        const doc = await selfID.client.dataModel.createTile("CVoxel", {
          ...meta,
        });
        const cVoxels = cVoxelsRecord.content?.cVoxels ?? [];
        const docUrl = doc.id.toUrl();
        await cVoxelsRecord.set({
          cVoxels: [
            ...cVoxels,
            {
              id: docUrl,
              summary: meta.summary,
              isPayer: isPayer,
              txHash: meta.txHash,
              issuedTimestamp: meta.issuedTimestamp,
            },
          ],
        });
        closeLoading();
        lancInfo(CVOXEL_CREATION_SUCCEED);
        return true;
      } catch (error) {
        closeLoading();
        lancError(CVOXEL_CREATION_FAILED);
        return false;
      }
    },
    [connect, cVoxelsRecord, isLoading, cVoxelsRecord.isLoadable]
  );

  const createDraftObjectWithSig = async (
    address: string,
    selectedTx: TransactionLog,
    summary: string,
    detail?: string,
    deliverable?: string,
    existedItem?: CVoxelMetaDraft
  ): Promise<CVoxelDraftAndMeta> => {
    const to = selectedTx.to.toLowerCase();
    const from = selectedTx.from.toLowerCase();
    const usr = address.toLowerCase();

    const isPayer = from === usr;

    //get hash
    const { signature, hash } = await getMessageHash(
      selectedTx.hash,
      usr,
      summary,
      detail,
      deliverable
    );

    let meta: CVoxel;

    if (existedItem) {
      meta = extractCVoxel(existedItem);
      if (isPayer) {
        meta.fromSig = signature.toString();
      } else {
        meta.toSig = signature.toString();
      }
    } else {
      // create metadata
      // if from address is contract address and gnosissafe treasury, use following api and get owners as potentialClient
      // https://safe-transaction.rinkeby.gnosis.io/api/v1/safes/0x9576Ab75741201f430223EDF2d24A750ef787591/

      meta = {
        summary: summary,
        detail: detail ?? "",
        deliverable: deliverable ?? "",
        jobType: "OneTime",
        from: from,
        to: to,
        isPayer: isPayer,
        value: selectedTx.value,
        tokenSymbol: selectedTx.tokenSymbol || "ETH",
        tokenDecimal: Number(selectedTx.tokenDecimal) || 18,
        networkId: chainId || 1,
        issuedTimestamp: selectedTx.timeStamp,
        txHash: selectedTx.hash,
        relatedTxHashes: [selectedTx.hash],
        tags: [],
        toSig: !isPayer ? signature.toString() : "",
        fromSig: isPayer ? signature.toString() : "",
      };
    }
    const draft: CVoxelMetaDraft = {
      ...meta,
      relatedAddresses: [from.toLowerCase(), to.toLowerCase()],
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

  return { publish, reClaim };
}
