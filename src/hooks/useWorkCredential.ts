import {
  CVOXEL_CREATION_FAILED,
  CVOXEL_CREATION_SUCCEED,
  CVOXEL_UPDATE_FAILED,
  CVOXEL_UPDATE_SUCCEED,
  CVOXEL_VERIFY_FAILED,
  CVOXEL_VERIFY_SUCCEED,
} from "@/constants/toastMessage";
import { TransactionLogWithChainId, WorkCredentialWithId } from "@/interfaces";
import { VerifiableWorkCredential } from "@/__generated__/types/VerifiableWorkCredential";
import { useModal } from "./useModal";
import { TileDoc, useTileDoc } from "./useTileDoc";
import { useToast } from "./useToast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useStateIssueStatus } from "@/recoilstate";
import {
  BaseResponse,
  getVESS,
  formatTransaction,
  formatClient,
  formatWork,
  CustomResponse,
} from "vess-sdk";
import { getFiat } from "@/lib/firebase/functions/fiat";
import { getNetworkSymbol } from "@/utils/networkUtil";
import { convertDateToTimestampStr } from "@/utils/dateUtil";
import { convertValidworkSubjectTypedData } from "@/utils/workCredentialUtil";
import { getPkhDIDFromAddress } from "@/utils/ceramicUtils";
import {
  DeliverableItem,
  WorkCredential,
  WorkSubject,
} from "vess-sdk/dist/__generated__/types/WorkCredential";

export function useWorkCredentialRecord(id?: string): TileDoc<WorkCredential> {
  return useTileDoc<WorkCredential>(id);
}

export function useVerifiableWorkCredentialRecord(
  id?: string
): TileDoc<VerifiableWorkCredential> {
  return useTileDoc<VerifiableWorkCredential>(id);
}

export const useWorkCredentials = (did?: string) => {
  // const vess = getVESS()
  const vess = getVESS(true);
  const queryClient = useQueryClient();

  const {
    data: workCredentials,
    isLoading,
    refetch,
  } = useQuery<WorkCredentialWithId[] | null>(
    ["heldWorkCredentials", did],
    () => vess.getHeldWorkCredentials(did),
    {
      enabled: !!did && did !== "",
      staleTime: Infinity,
      cacheTime: 30000,
    }
  );

  const { mutateAsync: deleteCRDLs } = useMutation<
    BaseResponse,
    unknown,
    string[]
  >((param) => vess.deleteWorkCredential(param), {
    onSuccess() {},
    onError(error) {
      console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries("heldWorkCredentials");
    },
  });

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
  // const vess = getVESS()
  const vess = getVESS(true);
  const queryClient = useQueryClient();

  const {
    mutateAsync: issueCRDL,
    isLoading: isIssuingCRDL,
    isSuccess,
  } = useMutation<
    CustomResponse<{
      streamId: string | undefined;
    }>,
    unknown,
    WorkSubject
  >((param) => vess.issueWorkCredential(param), {
    onSuccess(data) {
      if (data) {
        closeLoading();
        lancInfo(CVOXEL_CREATION_SUCCEED);
        setIssueStatus("completed");
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
  });

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
    if (isLoading || !summary) {
      return null;
    }
    if (!vess) {
      lancError();
      return null;
    }

    if (!genre) {
      lancError();
      return null;
    }

    showLoading();
    setIssueStatus("issuing");

    const fiat =
      existedItem && existedItem.subject.tx?.fiatValue
        ? existedItem.subject.tx?.fiatValue
        : await getFiat(
            selectedTx.value,
            selectedTx.tokenSymbol || getNetworkSymbol(selectedTx.chainId),
            selectedTx.tokenDecimal || "18",
            selectedTx.timeStamp
          );
    const to = selectedTx.to.toLowerCase();
    const from = selectedTx.from.toLowerCase();
    const usr = address.toLowerCase();
    const did = getPkhDIDFromAddress(address);
    const isPayer = from === usr;

    let crdl: WorkCredential;
    const nowTimestamp = convertDateToTimestampStr(new Date());

    if (existedItem) {
      const { id, subject, signature } = existedItem;
      const subjectWithDefaultValue = convertValidworkSubjectTypedData(subject);
      return await issueCRDL(subjectWithDefaultValue);
    } else {
      // create metadata
      // if from address is contract address and gnosissafe treasury, use following api and get owners as potentialClient
      // https://safe-transaction.rinkeby.gnosis.io/api/v1/safes/0x9576Ab75741201f430223EDF2d24A750ef787591/

      const releted =
        !relatedAddresses || relatedAddresses.length === 0
          ? [from.toLowerCase(), to.toLowerCase()]
          : relatedAddresses.concat([from.toLowerCase(), to.toLowerCase()]);
      const uniqRelated = Array.from(new Set(releted));

      const clientDID = getPkhDIDFromAddress(isPayer ? to : from);
      const client = formatClient("DID", clientDID);

      const tx = formatTransaction(
        selectedTx.hash,
        from,
        to,
        isPayer,
        selectedTx.value,
        fiat,
        "USD",
        selectedTx.tokenSymbol || getNetworkSymbol(selectedTx.chainId),
        Number(selectedTx.tokenDecimal) || 18,
        selectedTx.chainId || 1,
        selectedTx.timeStamp,
        [selectedTx.hash],
        uniqRelated
      );

      const work = formatWork(
        did,
        summary,
        fiat || selectedTx.value,
        "0",
        detail || "",
        genre || "",
        tags || [],
        "OneTime",
        "",
        "",
        "",
        "",
        "",
        nowTimestamp
      );

      const subject: WorkSubject = {
        work,
        tx,
        deliverables,
        client,
      };
      return await issueCRDL(subject);
    }
  };

  const signCredential = async (
    id: string,
    crdl: WorkCredential,
    address: string
  ) => {
    try {
      if (!vess) {
        lancError();
        return null;
      }

      showLoading();

      await vess.signWorkCredential(id, crdl, address);

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
      if (!vess) {
        lancError();
        return null;
      }

      showLoading();

      await vess.updateWorkCredential(id, newItem);

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
      if (!vess) {
        lancError();
        return null;
      }

      await vess.updateWorkCredential(id, newItem);
      return true;
    } catch (error) {
      console.log("error", error);
      return false;
    }
  };

  return { publish, signCredential, update, updateWithoutNotify, issueStatus };
};
