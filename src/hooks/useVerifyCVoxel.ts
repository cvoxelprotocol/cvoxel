import {
  CVOXEL_VERIFY_FAILED,
  CVOXEL_VERIFY_SUCCEED,
  POTENTIAL_CVOXEL_CREATION_FAILED,
  POTENTIAL_CVOXEL_CREATION_SUCCEED,
} from "@/constants/toastMessage";
import { TransactionLog } from "@/interfaces/explore";
import {
  createDraftWighVerify,
  updateDraftWighVerify,
} from "@/lib/firebase/functions/verify";
import { getCVoxelService } from "@/services/CVoxel/CVoxelService";
import { Web3Provider } from "@self.id/multiauth";
import { useWeb3React } from "@web3-react/core";
import { useCallback } from "react";
import type { CVoxel, CVoxelMetaDraft } from "@/interfaces/cVoxelType";
import { useDraftCVoxel } from "./useDraftCVoxel";
import { useModal } from "./useModal";
import { useToast } from "./useToast";

export function useVerifyCVoxel() {
  const { chainId, account } = useWeb3React<Web3Provider>();
  const { isLoading, showLoading, closeLoading } = useModal();
  const cVoxelService = getCVoxelService();
  const { createDraftObjectWithSig } = useDraftCVoxel();
  const { lancInfo, lancError } = useToast();

  const createDraftWithVerify = useCallback(
    async (
      value: CVoxel,
      selectedTx: TransactionLog,
      address: string
    ): Promise<boolean> => {
      if (isLoading || !value.summary || !chainId) {
        return false;
      }
      showLoading();

      try {
        const { meta, draft } = await createDraftObjectWithSig(
          value,
          selectedTx,
          address
        );

        const result = await createDraftWighVerify(
          address.toLowerCase(),
          draft
        );
        if (result === "ok") {
          lancInfo(POTENTIAL_CVOXEL_CREATION_SUCCEED);
          closeLoading();
          return true;
        } else {
          lancInfo(POTENTIAL_CVOXEL_CREATION_FAILED);
          closeLoading();
          return false;
        }
      } catch (error) {
        closeLoading();
        lancError(POTENTIAL_CVOXEL_CREATION_FAILED);
        return false;
      }
    },
    [chainId, isLoading]
  );

  const verifyCVoxel = async (tx: CVoxelMetaDraft) => {
    const from = tx.from.toLowerCase();

    if (!(account && chainId && account.toLowerCase() === from)) {
      console.log("not payer");
      return false;
    }

    showLoading();

    try {
      //get hash
      const { signature, _ } = await cVoxelService.getMessageHash(
        tx.txHash,
        account,
        tx.summary,
        tx.detail,
        tx.deliverable
      );

      const result = await updateDraftWighVerify(
        signature,
        tx.txHash,
        account,
        chainId.toString()
      );
      if (result === "ok") {
        lancInfo(CVOXEL_VERIFY_SUCCEED);
        closeLoading();
        return true;
      } else {
        lancError(CVOXEL_VERIFY_FAILED);
        closeLoading();
        return false;
      }
    } catch (error) {
      console.log("Error: ", error);
      lancError(CVOXEL_VERIFY_FAILED);
      closeLoading();
      return false;
    }
  };

  return { verifyCVoxel, createDraftWithVerify };
}
