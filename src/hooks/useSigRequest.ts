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
import { convertDateToTimestampStr } from "@/utils/dateUtil";

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
      const meta = await verifyCVoxel(tx, account);
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
              deliverable: meta.deliverable,
              fiatValue: meta.fiatValue,
              genre: meta.genre,
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
    if (!account) return;
    showLoading();
    try {
      const meta = await verifyCVoxel(tx, account);
      if (meta) {
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

  const verifyCVoxel = async (
    tx: CVoxelMetaDraft,
    address: string
  ): Promise<CVoxel | null> => {
    const to = tx.to.toLowerCase();
    const from = tx.from.toLowerCase();
    const usr = address.toLowerCase();

    const isPayer = from === usr;

    const metaDraft: CVoxelMetaDraft | null = await extractMeta(
      tx,
      usr,
      isPayer
    );
    if (!metaDraft) return null;

    const meta = extractCVoxel(metaDraft);

    try {
      const status = await updateDraftWighVerify(
        isPayer ? meta.fromSig : meta.toSig,
        meta.txHash,
        usr,
        tx.networkId.toString()
      );
      return status === "ok" ? meta : null;
    } catch (error) {
      console.log("Error: ", error);
      return null;
    }
  };

  const extractMeta = async (
    tx: CVoxelMetaDraft,
    account: string,
    isPayer: boolean
  ): Promise<CVoxelMetaDraft | null> => {
    try {
      const nowTimestamp = convertDateToTimestampStr(new Date());
      //get hash
      const { signature, _ } = await cVoxelService.getMessageHash(
        tx.txHash,
        account,
        tx.summary,
        tx.detail,
        tx.deliverable
      );

      if (
        isPayer &&
        tx.relatedAddresses.map((a) => a.toLowerCase()).includes(account) &&
        (!tx.fromSig || tx.fromSig === "")
      ) {
        return {
          ...tx,
          fromSig: signature,
          fromSigner: account,
          updatedAt: nowTimestamp,
        };
      } else if (
        !isPayer &&
        tx.relatedAddresses.map((a) => a.toLowerCase()).includes(account) &&
        (!tx.toSig || tx.toSig === "")
      ) {
        return {
          ...tx,
          toSig: signature,
          toSigner: account,
          updatedAt: nowTimestamp,
        };
      } else {
        return null;
      }
    } catch (error) {
      console.log("error", error);
      return null;
    }
  };

  return { verifyWithCeramic, verifyWithoutCeramic };
}
