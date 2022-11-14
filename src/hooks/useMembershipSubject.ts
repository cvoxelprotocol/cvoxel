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
        if (data) {
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

  const { data: IssuedMembershipSubjects, isLoading } = useQuery<
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
    isLoading: isFetchingHeldMembershipSubjects,
  } = useQuery<MembershipSubjectWithId[] | null>(
    ["IssuedMembershipSubjects", did],
    () => vess.getHeldMembershipSubjects(),
    {
      enabled: !!did && did !== "",
      staleTime: Infinity,
      cacheTime: 300000,
    }
  );

  const {
    data: heldMembershipSubjectsFromDB,
    isLoading: isLoadingHeldSubjectsFromDB,
  } = useQuery<MembershipSubjectWithId[] | null>(
    ["IssuedMembershipSubjects", did],
    () => getHeldMembershipSubjectsFromDB(did),
    {
      enabled: !!did && did !== "",
      staleTime: Infinity,
      cacheTime: 300000,
    }
  );

  const { data: membershipSubjectsFromDB, isLoading: isLoadingSubjectsFromDB } =
    useQuery<MembershipSubjectWithId[] | null>(
      ["CreatedMembershipSubjects", orgId],
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
    did: string
  ) => {
    const content: VerifiableMembershipSubject = {
      id: did,
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

  return {
    IssuedMembershipSubjects,
    isLoading,
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
