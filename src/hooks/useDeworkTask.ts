import { CERAMIC_NETWORK } from "@/constants/common";
import { useDIDAccount } from "@/hooks/useDIDAccount";
import { WorkSubjectFromDework } from "@/interfaces";
import { getDeworkTaskListFromFB } from "@/lib/firebase/store/dework";
import {
  getDeworkService,
  issueCRDLFromDeworkParam,
  updateGenreParam,
} from "@/services/Dework/DeworkService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getVESS } from "vess-sdk";

export const useDeworkTask = () => {
  const { account } = useDIDAccount();
  const deworkService = getDeworkService();
  // const vess = getVESS()
  const vess = getVESS(CERAMIC_NETWORK !== "mainnet");

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<WorkSubjectFromDework[]>(
    ["getDeworkTaskListFromFB", account],
    () => getDeworkTaskListFromFB(account?.toLowerCase()),
    {
      enabled: !!account,
      staleTime: Infinity,
      cacheTime: 3000000,
    }
  );

  const { mutateAsync: updateGenreofDeworkTask, isLoading: isUpdatingGenre } =
    useMutation<WorkSubjectFromDework | null, unknown, updateGenreParam>(
      (param) => deworkService.updateDeworkTaskGenre(param),
      {
        onSuccess(data) {
          if (!data) return;
          const old = queryClient.getQueryData<WorkSubjectFromDework[]>([
            "getDeworkTaskListFromFB",
          ]);
          if (old) {
            const oldWithoutTargetTask = old.filter(
              (o) => o.taskId !== data.taskId
            );
            queryClient.setQueryData<WorkSubjectFromDework[]>(
              ["getDeworkTaskListFromFB"],
              [...oldWithoutTargetTask, data]
            );
          }
        },
        onError(error) {
          console.log(error);
        },
        onSettled: () => {
          queryClient.invalidateQueries(["getDeworkTaskListFromFB"]);
        },
      }
    );
  const { mutateAsync: issue } = useMutation<
    void,
    unknown,
    issueCRDLFromDeworkParam
  >((param) => issueCRDLsFromDework(param), {
    onSuccess() {},
    onError(error) {
      console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["heldWorkCredentials"]);
    },
  });

  const refetchDeworkTasks = async () => {
    if (!account) return;
    const res = await deworkService.refetchDeworkTasks(account.toLowerCase());
    if (res) {
      queryClient.setQueryData<WorkSubjectFromDework[]>(
        ["getDeworkTaskListFromFB"],
        res
      );
      queryClient.invalidateQueries(["getDeworkTaskListFromFB"]);
    }
  };

  const updateGenre = async (id: string, genre: string) => {
    if (!account) return;
    await updateGenreofDeworkTask({
      account: account.toLowerCase(),
      id,
      genre,
    });
  };

  const issueCRDLsFromDework = async (param: issueCRDLFromDeworkParam) => {
    try {
      const streamIds = await deworkService.issueCRDLs(param);
      if (streamIds && streamIds.length > 0) {
        await vess.setHeldWorkCredentials(streamIds);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const issueCRDLs = async (ids: string[], storeAll: boolean) => {
    if (!account) return;
    const param: issueCRDLFromDeworkParam = {
      address: account,
      ids,
      storeAll,
    };
    await issue(param);
  };

  return {
    data,
    updateGenre,
    isUpdatingGenre,
    issueCRDLs,
    refetchDeworkTasks,
  };
};
