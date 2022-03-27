import {
  CVOXEL_VERIFY_FAILED,
  CVOXEL_VERIFY_SUCCEED,
} from "@/constants/toastMessage";
import { updateDraftWighVerify } from "@/lib/firebase/functions/verify";
import { getCVoxelService } from "@/services/CVoxel/CVoxelService";
import { Web3Provider } from "@self.id/multiauth";
import { useWeb3React } from "@web3-react/core";
import type {
  CVoxel,
  CVoxelMetaDraft,
  ModelTypes,
} from "@/interfaces/cVoxelType";
import { useModal } from "./useModal";
import { useToast } from "./useToast";
import { useConnection, useViewerRecord } from "@self.id/framework";
import { extractCVoxel } from "@/utils/cVoxelUtil";

export function useSigRequest() {
  const { chainId, account } = useWeb3React<Web3Provider>();
  const connect = useConnection<ModelTypes>()[1];
  const cVoxelsRecord = useViewerRecord<ModelTypes, "cVoxels">("cVoxels");
  const { showLoading, closeLoading } = useModal();
  const cVoxelService = getCVoxelService();
  const { lancInfo, lancError } = useToast();

  const verifyWithCeramic = async (tx: CVoxelMetaDraft) => {
    if (!account) return;
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
      const isPayer = tx.from.toLowerCase() === account.toLowerCase();
      const meta = await verifyCVoxel(tx);
      if (meta) {
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
        lancInfo(CVOXEL_VERIFY_SUCCEED);
        closeLoading();
        return true;
      } else {
        lancError(CVOXEL_VERIFY_FAILED);
        closeLoading();
        return false;
      }
    } catch (error) {
      lancError(CVOXEL_VERIFY_FAILED);
      closeLoading();
    }
  };

  const verifyWithoutCeramic = async (tx: CVoxelMetaDraft) => {
    showLoading();
    try {
      const result = await verifyCVoxel(tx);
      if (result) {
        lancInfo(CVOXEL_VERIFY_SUCCEED);
        closeLoading();
        return true;
      } else {
        lancError(CVOXEL_VERIFY_FAILED);
        closeLoading();
        return false;
      }
    } catch (error) {
      lancError(CVOXEL_VERIFY_FAILED);
      closeLoading();
    }
  };

  const verifyCVoxel = async (tx: CVoxelMetaDraft): Promise<CVoxel | null> => {
    const from = tx.from.toLowerCase();

    if (!(account && chainId && account.toLowerCase() === from)) {
      console.log("not payer");
      return null;
    }

    if (chainId !== tx.networkId) {
      return null;
    }

    const meta: CVoxel = await extractMeta(tx, account);

    try {
      const result = await updateDraftWighVerify(
        meta.fromSig,
        meta.txHash,
        account,
        chainId.toString()
      );
      return meta;
    } catch (error) {
      console.log("Error: ", error);
      return null;
    }
  };

  const extractMeta = async (
    tx: CVoxelMetaDraft,
    account: string
  ): Promise<CVoxel> => {
    let newCVoxel: CVoxel = extractCVoxel(tx);

    //get hash
    const { signature, _ } = await cVoxelService.getMessageHash(
      tx.txHash,
      account,
      tx.summary,
      tx.detail,
      tx.deliverable
    );

    // create metadata
    // if from address is contract address and gnosissafe treasury, use following api and get owners as potentialClient
    // https://safe-transaction.rinkeby.gnosis.io/api/v1/safes/0x9576Ab75741201f430223EDF2d24A750ef787591/
    return { ...newCVoxel, fromSig: signature };
  };

  return { verifyWithCeramic, verifyWithoutCeramic };
}
