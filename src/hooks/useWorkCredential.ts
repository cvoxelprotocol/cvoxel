import {
  CVOXEL_CREATION_FAILED,
  CVOXEL_CREATION_SUCCEED,
  CVOXEL_UPDATE_FAILED,
  CVOXEL_UPDATE_SUCCEED,
  CVOXEL_VERIFY_FAILED,
  CVOXEL_VERIFY_SUCCEED,
} from "@/constants/toastMessage";
import {
  ModelTypes,
  TransactionLogWithChainId,
  WorkCredentialWithId,
} from "@/interfaces";

import { getWorkCredentialService } from "@/services/workCredential/WorkCredentialService";
import { HeldWorkCredentials } from "@/__generated__/types/HeldWorkCredentials";
import { VerifiableWorkCredential } from "@/__generated__/types/VerifiableWorkCredential";
import {
  DeliverableItem,
  WorkCredential,
} from "@/__generated__/types/WorkCredential";
import { TileDocument } from "@ceramicnetwork/stream-tile";
import { useViewerRecord } from "@self.id/framework";
import { useCallback } from "react";
import { useModal } from "./useModal";
import { TileDoc, useTileDoc } from "./useTileDoc";
import { useToast } from "./useToast";
import { CeramicClient } from "@ceramicnetwork/http-client";
import { useStateMySelfID } from "@/recoilstate/ceramic";
import { useQuery } from "react-query";
import { DIDDataStore } from "@glazed/did-datastore";
import { aliases } from "@/__generated__/aliases";
import { useStateIssueStatus } from "@/recoilstate";

export function useWorkCredentialRecord(id?: string): TileDoc<WorkCredential> {
  return useTileDoc<WorkCredential>(id);
}

export function useVerifiableWorkCredentialRecord(
  id?: string
): TileDoc<VerifiableWorkCredential> {
  return useTileDoc<VerifiableWorkCredential>(id);
}

export const useWorkCredentials = (did?: string) => {
  const [mySelfID, _] = useStateMySelfID();

  const {
    data: workCredentials,
    isLoading,
    refetch,
  } = useQuery<WorkCredentialWithId[] | null>(
    ["heldWorkCredentials", did],
    () => fetchCRDLs(did),
    {
      enabled: !!did,
      staleTime: Infinity,
      cacheTime: 30000,
    }
  );

  const fetchCRDLs = async (
    did?: string
  ): Promise<WorkCredentialWithId[] | null> => {
    const ceramic = mySelfID?.client.ceramic || new CeramicClient();
    const dataStore = new DIDDataStore({ ceramic, model: aliases });
    const HeldWorkCredentials = await dataStore.get<
      "heldWorkCredentials",
      HeldWorkCredentials
    >("heldWorkCredentials", did);
    if (!HeldWorkCredentials?.held) return null;
    const promiseArr = [];
    for (const id of HeldWorkCredentials.held) {
      const loadPromise = TileDocument.load<WorkCredential>(ceramic, id);
      promiseArr.push(loadPromise);
    }
    const res = await Promise.all(promiseArr);
    console.log({ res });
    return res.map((r) => {
      const crdl: WorkCredentialWithId = {
        ...r.content,
        backupId: r.id.toString(),
      };
      return crdl;
    });
  };
  return {
    workCredentials,
    isLoading,
    refetch,
  };
};

export const useWorkCredential = () => {
  const { isLoading, showLoading, closeLoading } = useModal();
  const { lancInfo, lancError } = useToast();
  const [issueStatus, setIssueStatus] = useStateIssueStatus();
  const workCredentialRecords = useViewerRecord<
    ModelTypes,
    "heldWorkCredentials"
  >("heldWorkCredentials");
  const workCredentialService = getWorkCredentialService();

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
      existedItem?: WorkCredentialWithId
    ) => {
      if (isLoading || !summary) {
        return null;
      }
      if (!workCredentialRecords.isLoadable) {
        lancError();
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

      try {
        const docUrl = await workCredentialService.uploadFromTX(
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

        if (docUrl) {
          closeLoading();
          // setCvoxelsForDisplay([{ ...meta, id: "0" }]);
          lancInfo(CVOXEL_CREATION_SUCCEED);
          setIssueStatus("completed");

          return docUrl;
        } else {
          setIssueStatus("failed");
          closeLoading();
          lancError(CVOXEL_CREATION_FAILED);
          return null;
        }
      } catch (error) {
        console.log("error", error);
        setIssueStatus("failed");
        closeLoading();
        lancError(CVOXEL_CREATION_FAILED);
        return null;
      }
    },
    [workCredentialRecords.isLoadable, isLoading, workCredentialService]
  );

  const signCredential = async (
    id: string,
    crdl: WorkCredential,
    address: string
  ) => {
    try {
      if (!workCredentialRecords.isLoadable) {
        lancError();
        return null;
      }
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
      if (!workCredentialRecords.isLoadable) {
        lancError();
        return null;
      }
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
      if (!workCredentialRecords.isLoadable) {
        lancError();
        return null;
      }
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
