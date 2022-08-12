import {
  CVOXEL_VERIFY_FAILED,
  CVOXEL_VERIFY_SUCCEED,
} from "@/constants/toastMessage";
import { updateDraftWighVerify } from "@/lib/firebase/functions/verify";
import { getCVoxelService } from "@/services/CVoxel/CVoxelService";
import type {
  CVoxel,
  CVoxelMetaDraft,
  ModelTypes,
} from "@/interfaces/cVoxelType";
import { useModal } from "./useModal";
import { useToast } from "./useToast";
import { useViewerRecord } from "@self.id/framework";
import { extractCVoxel } from "@/utils/cVoxelUtil";
import { convertDateToTimestampStr } from "@/utils/dateUtil";
import { useStateMySelfID } from "@/recoilstate/ceramic";
import { useContext } from "react";
import { DIDContext } from "@/context/DIDContext";
import { useWalletAccount } from "./useWalletAccount";

export function useSigRequest() {
  const cVoxelsRecord = useViewerRecord<ModelTypes, "workCredentials">(
    "workCredentials"
  );
  const { showLoading, closeLoading } = useModal();
  const cVoxelService = getCVoxelService();
  const { lancInfo, lancError } = useToast();
  const { connectWallet } = useWalletAccount();
  const { account } = useContext(DIDContext);
  const [mySelfID, _] = useStateMySelfID();

  const verifyWithCeramic = async (tx: CVoxelMetaDraft) => {
    if (!account) {
      lancError();
      return false;
    }
    if (mySelfID == null || mySelfID.did == null) {
      await connectWallet();
      lancError("Please retry again");
      return false;
    }
    if (!cVoxelsRecord.isLoadable) {
      lancError("Please retry again");
      return false;
    }

    showLoading();
    try {
      const isPayer = tx.from.toLowerCase() === account.toLowerCase();
      const meta = await verifyCVoxel(tx, account);
      console.log({ meta });
      if (meta) {
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
              txHash: meta.txHash,
              deliverables: meta.deliverables,
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
      const sig = isPayer ? meta.fromSig : meta.toSig;
      if (!(sig && meta.txHash)) return null;
      const status = await updateDraftWighVerify(
        sig,
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
      const deliverable =
        tx.deliverables && tx.deliverables.length > 0
          ? tx.deliverables.map((d) => d.value).join(",")
          : undefined;
      const { signature, _ } = await cVoxelService.getMessageHash(
        tx.txHash || "",
        account,
        tx.summary,
        tx.detail,
        deliverable
      );

      if (
        isPayer &&
        (tx.from.toLowerCase() === account.toLocaleLowerCase() ||
          tx.relatedAddresses
            .map((a) => a.toLowerCase())
            .includes(account.toLowerCase())) &&
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
        (tx.to.toLowerCase() === account.toLocaleLowerCase() ||
          tx.relatedAddresses
            .map((a) => a.toLowerCase())
            .includes(account.toLowerCase())) &&
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
