import {
  CVOXEL_CREATION_FAILED,
  CVOXEL_CREATION_SUCCEED,
  CVOXEL_UPDATE_FAILED,
  CVOXEL_UPDATE_SUCCEED,
  CVOXEL_VERIFY_FAILED,
  CVOXEL_VERIFY_SUCCEED,
} from "@/constants/toastMessage";
import { TransactionLogWithChainId, WorkCredentialWithId } from "@/interfaces";

import {
  getWorkCredentialService,
  IssueFromTXParam,
} from "@/services/workCredential/WorkCredentialService";
import { VerifiableWorkCredential } from "@/__generated__/types/VerifiableWorkCredential";
import {
  DeliverableItem,
  WorkCredential,
} from "@/__generated__/types/WorkCredential";
import { useModal } from "./useModal";
import { TileDoc, useTileDoc } from "./useTileDoc";
import { useToast } from "./useToast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useStateIssueStatus } from "@/recoilstate";
import { useGAEvent } from "./useGAEvent";
import { useContext } from "react";
import { DIDContext } from "@/context/DIDContext";

export function useWorkCredentialRecord(id?: string): TileDoc<WorkCredential> {
  return useTileDoc<WorkCredential>(id);
}

export function useVerifiableWorkCredentialRecord(
  id?: string
): TileDoc<VerifiableWorkCredential> {
  return useTileDoc<VerifiableWorkCredential>(id);
}

export const useWorkCredentials = (did?: string) => {
  const workCredentialService = getWorkCredentialService();
  const queryClient = useQueryClient();

  const {
    data: workCredentials,
    isLoading,
    refetch,
  } = useQuery<WorkCredentialWithId[] | null>(
    ["heldWorkCredentials", did],
    () => workCredentialService.fetchWorkCredentials(did),
    {
      enabled: !!did && did !== "",
      staleTime: Infinity,
      cacheTime: 30000,
    }
  );

  const { mutateAsync: deleteCRDLs } = useMutation<void, unknown, string[]>(
    (param) => workCredentialService.deleteCredential(param),
    {
      onSuccess() {},
      onError(error) {
        console.log(error);
      },
      onSettled: () => {
        queryClient.invalidateQueries("heldWorkCredentials");
      },
    }
  );

  return {
    workCredentials,
    isLoading,
    deleteCRDLs,
    refetch,
  };
};

export const useWorkCredential = () => {
  const { isLoading, showLoading, closeLoading } = useModal();
  const { lancInfo, lancError } = useToast();
  const [issueStatus, setIssueStatus] = useStateIssueStatus();
  const workCredentialService = getWorkCredentialService();
  const queryClient = useQueryClient();
  const { did } = useContext(DIDContext);
  const { issueCRDLEvent, issuingCRDLEvent, issuedCRDLEvent } = useGAEvent();

  const {
    mutateAsync: issueCRDL,
    isLoading: isIssuingCRDL,
    isSuccess,
  } = useMutation<string | undefined, unknown, IssueFromTXParam>(
    (param) => workCredentialService.uploadFromTX(param),
    {
      onSuccess(data) {
        if (data) {
          closeLoading();
          lancInfo(CVOXEL_CREATION_SUCCEED);
          setIssueStatus("completed");
          issuedCRDLEvent(did);
        } else {
          setIssueStatus("failed");
          closeLoading();
          lancError(CVOXEL_CREATION_FAILED);
        }
      },
      onError(error) {
        console.log("error", error);
        setIssueStatus("failed");
        closeLoading();
        lancError(CVOXEL_CREATION_FAILED);
      },
      onSettled: () => {
        queryClient.invalidateQueries("heldWorkCredentials");
        // refetch  offchain DB
        queryClient.invalidateQueries("offchainCVoxelMeta");
      },
    }
  );

  const publish = async (
    address: string,
    selectedTx: TransactionLogWithChainId,
    summary: string,
    detail?: string,
    deliverables?: DeliverableItem[],
    relatedAddresses?: string[],
    genre?: string,
    tags?: string[],
    existedItem?: WorkCredentialWithId
  ) => {
    issueCRDLEvent(did);
    if (isLoading || !summary) {
      return null;
    }
    if (!workCredentialService) {
      lancError();
      return null;
    }

    if (!genre) {
      lancError();
      return null;
    }

    showLoading();
    setIssueStatus("issuing");

    const param: IssueFromTXParam = {
      address,
      selectedTx,
      summary,
      detail,
      deliverables,
      relatedAddresses,
      genre,
      tags,
      existedItem,
    };
    issuingCRDLEvent(did);
    return await issueCRDL(param);
  };

  const signCredential = async (
    id: string,
    crdl: WorkCredential,
    address: string
  ) => {
    try {
      if (!workCredentialService) {
        lancError();
        return null;
      }

      showLoading();

      await workCredentialService.signWorkCredential(id, crdl, address);

      closeLoading();
      lancInfo(CVOXEL_VERIFY_SUCCEED);
      return true;
    } catch (error) {
      console.log("error", error);
      closeLoading();
      lancError(CVOXEL_VERIFY_FAILED);
      return false;
    }
  };

  const update = async (id: string, newItem: WorkCredential) => {
    try {
      if (!workCredentialService) {
        lancError();
        return null;
      }

      showLoading();

      await workCredentialService.update(id, newItem);

      closeLoading();
      lancInfo(CVOXEL_UPDATE_SUCCEED);
      return true;
    } catch (error) {
      console.log("error", error);
      closeLoading();
      lancError(CVOXEL_UPDATE_FAILED);
      return false;
    }
  };
  const updateWithoutNotify = async (id: string, newItem: WorkCredential) => {
    try {
      if (!workCredentialService) {
        lancError();
        return null;
      }

      await workCredentialService.update(id, newItem);
      return true;
    } catch (error) {
      console.log("error", error);
      return false;
    }
  };

  return { publish, signCredential, update, updateWithoutNotify, issueStatus };
};
