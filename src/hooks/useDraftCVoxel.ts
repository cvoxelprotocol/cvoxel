import { TransactionLog } from "@/interfaces/explore";
import { createDraftWighVerify } from "@/lib/firebase/functions/verify";
import { getCVoxelService } from "@/services/CVoxel/CVoxelService";
import { useConnection, useViewerRecord } from "@self.id/framework";
import { Web3Provider } from "@self.id/multiauth";
import { useWeb3React } from "@web3-react/core";
import { useAtom } from "jotai";
import { useCallback } from "react";

import { draftCVoxelAtom } from "../state";
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

export function useDraftCVoxel() {
  const { chainId } = useWeb3React<Web3Provider>();
  const connect = useConnection<ModelTypes>()[1];
  const cVoxelsRecord = useViewerRecord<ModelTypes, "cVoxels">("cVoxels");
  const [defaultVal, _] = useAtom(draftCVoxelAtom);
  const { isLoading, showLoading, closeLoading } = useModal();
  const cVoxelService = getCVoxelService();
  const { lancInfo, lancError } = useToast();

  const publish = useCallback(
    async (value: CVoxel, selectedTx: TransactionLog, address: string) => {
      if (isLoading || !value.summary || !chainId) {
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

      const { meta, draft } = await createDraftObjectWithSig(
        value,
        selectedTx,
        address
      );

      const result = await createDraftWighVerify(address.toLowerCase(), draft);
      if (result !== "ok") {
        closeLoading();
        lancError(CVOXEL_CREATION_FAILED);
        return false;
      }
      try {
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
    value: CVoxel,
    selectedTx: TransactionLog,
    address: string
  ): Promise<CVoxelDraftAndMeta> => {
    const to = selectedTx.to.toLowerCase();
    const from = selectedTx.from.toLowerCase();
    const usr = address.toLowerCase();
    const { summary, detail, deliverable } = value;

    //get hash
    const { signature, hash } = await getMessageHash(
      selectedTx.hash,
      usr,
      summary,
      detail,
      deliverable
    );

    // create metadata
    // if from address is contract address and gnosissafe treasury, use following api and get owners as potentialClient
    // https://safe-transaction.rinkeby.gnosis.io/api/v1/safes/0x9576Ab75741201f430223EDF2d24A750ef787591/
    const meta: CVoxel = {
      summary: value.summary,
      detail: value.detail ?? "",
      deliverable: value.deliverable ?? "",
      jobType: "OneTime",
      from: from,
      to: to,
      value: selectedTx.value,
      tokenSymbol: selectedTx.tokenSymbol || "ETH",
      tokenDecimal: Number(selectedTx.tokenDecimal) || 18,
      networkId: chainId || 1,
      issuedTimestamp: selectedTx.timeStamp,
      txHash: selectedTx.hash,
      relatedTxHashes: [selectedTx.hash],
      tags: [],
      toSig: to === usr ? signature.toString() : "",
      fromSig: from === usr ? signature.toString() : "",
    };

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

  return { publish, isLoading, defaultVal, createDraftObjectWithSig };
}
