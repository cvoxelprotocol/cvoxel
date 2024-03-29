import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./useToast";
import {
  ORGANIZATION_CREATION_FAILED,
  ORGANIZATION_CREATION_SUCCEED,
} from "@/constants/toastMessage";
import { useModal } from "./useModal";
import { useStateWorkspaceCreateModal } from "@/recoilstate";
import { OrganizationWIthId } from "vess-sdk";
import { useDIDAccount } from "@/hooks/useDIDAccount";
import { CustomResponse, getVESS, Organization } from "vess-sdk";
import { CERAMIC_NETWORK } from "@/constants/common";

export const useOrganization = (orgId?: string) => {
  const { did } = useDIDAccount();
  // const vess = getVESS()
  const vess = getVESS(CERAMIC_NETWORK !== "mainnet");
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
      if (data.streamId) {
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
      queryClient.invalidateQueries(["createdOrganizations"]);
    },
  });

  const { data: createdOrganizations, isInitialLoading } = useQuery<
    OrganizationWIthId[]
  >(["createdOrganizations", did], () => vess.getCreatedOrganization(), {
    enabled: !!did && did !== "",
    staleTime: Infinity,
    cacheTime: 300000,
  });

  const { data: organization } = useQuery<OrganizationWIthId | undefined>(
    ["organization", orgId],
    () => vess.getOrganization(orgId),
    {
      enabled: !!orgId,
      staleTime: Infinity,
      cacheTime: 300000,
    }
  );

  return {
    createdOrganizations,
    isInitialLoading,
    createOrganization,
    isCreatingOrg,
    setShowCreateModal,
    showCreateModal,
    creationSucceeded,
    organization,
  };
};
