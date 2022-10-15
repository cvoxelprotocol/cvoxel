import { getWorkCredentialService } from "@/services/workCredential/WorkCredentialService";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useToast } from "./useToast";
import {
  MEMBERSHIP_CREATION_FAILED,
  MEMBERSHIP_CREATION_SUCCEED,
} from "@/constants/toastMessage";
import { useModal } from "./useModal";
import { useStateMembershipCreateModal } from "@/recoilstate";
import { MembershipWithId } from "@/interfaces";
import { useContext, useMemo } from "react";
import { DIDContext } from "@/context/DIDContext";
import { Membership } from "@/__generated__/types/MemberShip";

export const useMembership = (orgId?: string) => {
  const { did } = useContext(DIDContext);
  const workCredentialService = getWorkCredentialService();
  const queryClient = useQueryClient();
  const { lancInfo, lancError } = useToast();
  const { showLoading, closeLoading } = useModal();
  const [showModal, setShowModal] = useStateMembershipCreateModal();

  const { mutateAsync: createMembership, isLoading: isCreatingOrg } =
    useMutation<string | undefined, unknown, Membership>(
      (param) => workCredentialService.createMembership(param),
      {
        onMutate() {
          showLoading();
        },
        onSuccess(data) {
          if (data) {
            closeLoading();
            lancInfo(MEMBERSHIP_CREATION_SUCCEED);
          } else {
            closeLoading();
            lancError(MEMBERSHIP_CREATION_FAILED);
          }
        },
        onError(error) {
          console.log("error", error);
          closeLoading();
          lancError(MEMBERSHIP_CREATION_FAILED);
        },
        onSettled: () => {
          queryClient.invalidateQueries("createdMemberships");
        },
      }
    );

  const { data: createdMemberships, isLoading } = useQuery<
    MembershipWithId[] | null
  >(
    ["createdMemberships", did],
    () => workCredentialService.fetchCreatedMemberships(),
    {
      enabled: !!did,
      staleTime: Infinity,
      cacheTime: 30000,
    }
  );

  const createdMembershipsOfOrg = useMemo<MembershipWithId[]>(() => {
    if (!createdMemberships || !orgId) return [];
    return createdMemberships.filter((m) => m.organizationId === orgId);
  }, [createdMemberships, orgId]);

  return {
    createdMemberships,
    createdMembershipsOfOrg,
    isLoading,
    createMembership,
    isCreatingOrg,
    setShowModal,
    showModal,
  };
};
