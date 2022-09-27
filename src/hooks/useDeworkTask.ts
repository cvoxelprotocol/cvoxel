import { DIDContext } from "@/context/DIDContext";
import { WorkSubjectFromDework } from "@/interfaces";
import { getDeworkTaskListFromFB } from "@/lib/firebase/store/dework";
import {
  getDeworkService,
  issueCRDLFromDeworkParam,
  updateGenreParam,
} from "@/services/Dework/DeworkService";
import { getWorkCredentialService } from "@/services/workCredential/WorkCredentialService";
import { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useDeworkTask = () => {
  const { account } = useContext(DIDContext);
  const deworkService = getDeworkService();
  const workCredentialService = getWorkCredentialService();

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<WorkSubjectFromDework[]>(
    ["getDeworkTaskListFromFB", account],
    () => getDeworkTaskListFromFB(account),
    {
      enabled: !!account,
      staleTime: Infinity,
      cacheTime: 3000000,
    }
  );

  const { mutate: updateGenreofDeworkTask, isLoading: isUpdatingGenre } =
    useMutation<WorkSubjectFromDework | null, unknown, updateGenreParam>(
      (param) => deworkService.updateDeworkTaskGenre(param),
      {
        onSuccess(data) {
          if (!data) return;
          const old = queryClient.getQueryData<WorkSubjectFromDework[]>(
            "getDeworkTaskListFromFB"
          );
          if (old) {
            const oldWithoutTargetTask = old.filter(
              (o) => o.taskId !== data.taskId
            );
            queryClient.setQueryData<WorkSubjectFromDework[]>(
              "getDeworkTaskListFromFB",
              [...oldWithoutTargetTask, data]
            );
          }
        },
        onError(error) {
          console.log(error);
        },
        onSettled: () => {
          queryClient.invalidateQueries("getDeworkTaskListFromFB");
        },
      }
    );
  const { mutate } = useMutation<void, unknown, issueCRDLFromDeworkParam>(
    (param) => issueCRDLsFromDework(param),
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

  const updateGenre = async (id: string, genre: string) => {
    if (!account) return;
    updateGenreofDeworkTask({ account, id, genre });
  };

  const issueCRDLsFromDework = async (param: issueCRDLFromDeworkParam) => {
    try {
      const streamIds = await deworkService.issueCRDLs(param);
      console.log({ streamIds });
      if (streamIds && streamIds.length > 0) {
        await workCredentialService.setMultipleHeldWorkCredentials(streamIds);
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
    mutate(param);
  };

  return {
    data,
    updateGenre,
    isUpdatingGenre,
    issueCRDLs,
  };
};
