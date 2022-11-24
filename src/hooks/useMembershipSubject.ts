import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./useToast";
import {
  MEMBERSHIP_SUBJECT_CREATION_FAILED,
  MEMBERSHIP_SUBJECT_CREATION_SUCCEED,
} from "@/constants/toastMessage";
import { useModal } from "./useModal";
import { useStateMembershipSubjectCreateModal } from "@/recoilstate";
import {
  MembershipSubjectWithId,
  MembershipWithId,
  OrganizationWIthId,
  CustomResponse,
  getVESS,
  VerifiableMembershipSubject,
} from "vess-sdk";
import { useDIDAccount } from "@/hooks/useDIDAccount";
import {
  getHeldMembershipSubjectsFromDB,
  getMembershipSUbjectsFromDB,
} from "@/lib/firebase/store/workspace";
import { CERAMIC_NETWORK } from "@/constants/common";
import { useMemo } from "react";

export const useMembershipSubject = (orgId?: string) => {
  const { did } = useDIDAccount();
  // const vess = getVESS()
  const vess = getVESS(CERAMIC_NETWORK !== "mainnet");
  const queryClient = useQueryClient();
  const { lancInfo, lancError } = useToast();
  const { showLoading, closeLoading } = useModal();
  const [showSubjectModal, setShowSubjectModal] =
    useStateMembershipSubjectCreateModal();

  const { mutateAsync: issueMembershipSubject, isLoading: isCreatingSubject } =
    useMutation<
      CustomResponse<{ streamId: string | undefined }>,
      unknown,
      VerifiableMembershipSubject
    >((param) => vess.issueMembershipSubject(param), {
      onMutate() {
        showLoading();
      },
      onSuccess(data) {
        if (data.streamId) {
          closeLoading();
          lancInfo(MEMBERSHIP_SUBJECT_CREATION_SUCCEED);
        } else {
          closeLoading();
          lancError(MEMBERSHIP_SUBJECT_CREATION_FAILED);
        }
      },
      onError(error) {
        console.log("error", error);
        closeLoading();
        lancError(MEMBERSHIP_SUBJECT_CREATION_FAILED);
      },
      onSettled: () => {
        queryClient.invalidateQueries(["IssuedMembershipSubjects"]);
      },
    });

  const { data: IssuedMembershipSubjects, isInitialLoading } = useQuery<
    MembershipSubjectWithId[] | null
  >(
    ["IssuedMembershipSubjects", did],
    () => vess.getIssuedMembershipSubjects(did),
    {
      enabled: !!did && did !== "",
      staleTime: Infinity,
      cacheTime: 300000,
    }
  );

  const {
    data: HeldMembershipSubjects,
    isInitialLoading: isFetchingHeldMembershipSubjects,
  } = useQuery<MembershipSubjectWithId[] | null>(
    ["HeldMembershipSubjects", did],
    () => vess.getHeldMembershipSubjects(),
    {
      enabled: !!did && did !== "",
      staleTime: Infinity,
      cacheTime: 300000,
    }
  );

  const {
    data: heldMembershipSubjectsFromDB,
    isInitialLoading: isLoadingHeldSubjectsFromDB,
  } = useQuery<MembershipSubjectWithId[] | null>(
    ["heldMembershipSubjectsFromDB", did],
    () => getHeldMembershipSubjectsFromDB(did),
    {
      enabled: !!did && did !== "",
      staleTime: Infinity,
      cacheTime: 300000,
    }
  );

  const {
    data: membershipSubjectsFromDB,
    isInitialLoading: isLoadingSubjectsFromDB,
  } = useQuery<MembershipSubjectWithId[] | null>(
    ["membershipSubjectsFromDB", orgId],
    () => getMembershipSUbjectsFromDB(orgId),
    {
      enabled: !!orgId,
      staleTime: Infinity,
      cacheTime: 300000,
    }
  );

  const issue = async (
    org: OrganizationWIthId,
    membership: MembershipWithId,
    targetDid: string
  ) => {
    const content: VerifiableMembershipSubject = {
      id: targetDid,
      organizationName: org.name,
      organizationId: org.ceramicId,
      organizationIcon: org.icon || "",
      membershipName: membership.name,
      membershipIcon: membership.icon || "",
      membershipId: membership.ceramicId,
    };

    console.log({ content });

    //issue
    const res = await issueMembershipSubject(content);
    console.log({ res });

    return res;
  };

  const IssuedMembershipSubjectsOfOrg = useMemo<
    MembershipSubjectWithId[]
  >(() => {
    console.log({ IssuedMembershipSubjects });
    if (!IssuedMembershipSubjects || !orgId) return [];
    return IssuedMembershipSubjects.filter(
      (m) => m.credentialSubject.organizationId === orgId
    );
  }, [IssuedMembershipSubjects, orgId]);

  return {
    IssuedMembershipSubjects,
    IssuedMembershipSubjectsOfOrg,
    isInitialLoading,
    issue,
    isCreatingSubject,
    setShowSubjectModal,
    showSubjectModal,
    membershipSubjectsFromDB,
    isLoadingSubjectsFromDB,
    heldMembershipSubjectsFromDB,
    HeldMembershipSubjects,
    isFetchingHeldMembershipSubjects,
    isLoadingHeldSubjectsFromDB,
  };
};
