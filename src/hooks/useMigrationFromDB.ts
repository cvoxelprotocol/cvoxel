import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCeramicPrefix, removeCeramicPrefix } from "vess-sdk";
import { getHeldMembershipSubjectsFromDB } from "@/lib/firebase/store/workspace";
import { getVESS } from "vess-sdk";
import { CERAMIC_NETWORK } from "@/constants/common";
import { getHeldEventAttendanceFromDB } from "@/lib/firebase/store/event";
import { useModal } from "./useModal";

export const useMigrationFromDB = () => {
  // const vess = getVESS()
  const vess = getVESS(CERAMIC_NETWORK !== "mainnet");
  const queryClient = useQueryClient();
  const { showLoading, closeLoading } = useModal();

  const { mutateAsync: setHeldMembershipSubjects } = useMutation<
    void,
    unknown,
    string[]
  >((param) => vess.setHeldMembershipSubjects(param), {
    onSuccess() {
      console.log("MembershipSubjects migration succeeded");
    },
    onError(error) {
      console.log("error", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["HeldMembershipSubjects"]);
    },
  });

  const { mutateAsync: setHeldEventAttendancesSilently } = useMutation<
    void,
    unknown,
    string[]
  >((param) => vess.setHeldEventAttendanceVerifiableCredentials(param), {
    onSuccess() {
      console.log("heldEvent migration succeeded");
    },
    onError(error) {
      console.log("error", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["HeldEventAttendances"]);
    },
  });

  // set held data from DB
  const issueHeldMembershipFromDB = async (
    targetDid: string
  ): Promise<void> => {
    console.log("membership issuing from DB: check");
    const heldMembership = await vess.getHeldMembershipSubjects(targetDid);
    const membershipFromDB = await getHeldMembershipSubjectsFromDB(targetDid);

    if (membershipFromDB.length === 0) return;
    const existedSubjects = heldMembership?.map((s) =>
      removeCeramicPrefix(s.ceramicId)
    );
    const targetIds = membershipFromDB
      ?.map((m) => removeCeramicPrefix(m.ceramicId))
      .filter((id) => !existedSubjects?.includes(id));
    if (targetIds && targetIds.length > 0) {
      console.log("membership issuing from DB: execute", targetIds);
      await setHeldMembershipSubjects(
        targetIds.map((id) => addCeramicPrefix(id))
      );
    }
  };

  const issueHeldEventFromDB = async (did: string): Promise<void> => {
    console.log("event issuing from DB: check");
    const heldEvent = await vess.getHeldEventAttendanceVerifiableCredentials(
      did
    );
    const eventFromDB = await getHeldEventAttendanceFromDB(did);

    if (eventFromDB.length === 0) return;
    const existedSubjects = heldEvent?.map((s) =>
      removeCeramicPrefix(s.ceramicId)
    );
    const targetIds = eventFromDB
      ?.map((m) => removeCeramicPrefix(m.ceramicId))
      .filter((id) => !existedSubjects?.includes(id));
    if (targetIds && targetIds.length > 0) {
      console.log("event issuing from DB: execute", targetIds);
      await setHeldEventAttendancesSilently(
        targetIds.map((id) => addCeramicPrefix(id))
      );
    }
  };

  const migrateAccount = async (
    did: string,
    originalAddress?: string
  ): Promise<void> => {
    if (!originalAddress) return;
    console.log("migrateAccount: check");
    const workCredentials = await vess.getHeldWorkCredentials(did);
    if (workCredentials && workCredentials.length > 0) return;
    const oldDid = `did:pkh:eip155:1:${originalAddress}`;
    const oldCRDLs = await vess.getHeldWorkCredentialStreamIds(oldDid);
    if (oldCRDLs.length > 0) {
      console.log("migrateAccount: execute", oldCRDLs);
      showLoading();
      await vess.setHeldWorkCredentials(oldCRDLs);
      closeLoading();
      queryClient.invalidateQueries(["heldWorkCredentials"]);
      console.log("migrateAccount end");
    }
  };

  const migrateHeldEvent = async (
    did: string,
    originalAddress?: string
  ): Promise<void> => {
    if (!originalAddress) return;
    console.log("migrateHeldEvent: check");
    const heldEvent = await vess.getHeldEventAttendanceVerifiableCredentials(
      did
    );
    if (heldEvent && heldEvent.length > 0) return;
    const oldDid = `did:pkh:eip155:1:${originalAddress}`;
    const oldCRDLs =
      await vess.getHeldEventAttendanceVerifiableCredentialStreamIds(oldDid);
    if (oldCRDLs.length > 0) {
      showLoading();
      console.log("migrateHeldEvent: execute", oldCRDLs);
      await vess.setHeldEventAttendanceVerifiableCredentials(oldCRDLs);
      closeLoading();
      queryClient.invalidateQueries(["HeldEventAttendances"]);
      console.log("migrateHeldEvent: end");
    }
  };

  return {
    migrateAccount,
    migrateHeldEvent,
    issueHeldMembershipFromDB,
    issueHeldEventFromDB,
  };
};
