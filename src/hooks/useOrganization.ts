import { useMutation, useQuery, useQueryClient } from "react-query";
import { Organization } from "@/__generated__/types/Organization";
import { useToast } from "./useToast";
import {
  ORGANIZATION_CREATION_FAILED,
  ORGANIZATION_CREATION_SUCCEED,
} from "@/constants/toastMessage";
import { useModal } from "./useModal";
import { useStateWorkspaceCreateModal } from "@/recoilstate";
import { OrganizationWIthId } from "@/interfaces";
import { useContext } from "react";
import { DIDContext } from "@/context/DIDContext";
import { CustomResponse, getVESS } from "vess-sdk";

export const useOrganization = (orgId?: string) => {
  const { did } = useContext(DIDContext);
  // const vess = getVESS()
  const vess = getVESS(true);
  const queryClient = useQueryClient();
  const { lancInfo, lancError } = useToast();
  const { showLoading, closeLoading } = useModal();
  const [showCreateModal, setShowCreateModal] = useStateWorkspaceCreateModal();

  const {
    mutateAsync: createOrganization,
    isLoading: isCreatingOrg,
    isSuccess: creationSucceeded,
  } = useMutation<
    CustomResponse<{ streamId: string | undefined }>,
    unknown,
    Organization
  >((param) => vess.createOrganization(param), {
    onMutate() {
      showLoading();
    },
    onSuccess(data) {
      if (data) {
        closeLoading();
        lancInfo(ORGANIZATION_CREATION_SUCCEED);
      } else {
        closeLoading();
        lancError(ORGANIZATION_CREATION_FAILED);
      }
    },
    onError(error) {
      console.log("error", error);
      closeLoading();
      lancError(ORGANIZATION_CREATION_FAILED);
    },
    onSettled: () => {
      queryClient.invalidateQueries("createdOrganizations");
    },
  });

  const { data: createdOrganizations, isLoading } = useQuery<
    OrganizationWIthId[] | null
  >(["createdOrganizations", did], () => vess.getCreatedOrganization(), {
    enabled: !!did && did !== "",
    staleTime: Infinity,
    cacheTime: 30000,
  });

  const { data: organization, isLoading: isFetchingOrg } = useQuery<
    OrganizationWIthId | undefined
  >(["organization", orgId], () => vess.getOrganization(orgId), {
    enabled: !!orgId,
    staleTime: Infinity,
    cacheTime: 30000,
  });

  return {
    createdOrganizations,
    isLoading,
    createOrganization,
    isCreatingOrg,
    setShowCreateModal,
    showCreateModal,
    creationSucceeded,
    organization,
  };
};
