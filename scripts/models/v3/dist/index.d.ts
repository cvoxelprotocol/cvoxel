import type { ModelTypeAliases, EncodedManagedModel } from "@glazed/types";
import { OldWorkCredential } from "../types/OldWorkCredential";
import { OldWorkCredentials } from "../types/OldWorkCredentials";
import { Organization, WorkCredential } from "../types/WorkCredential";
import { VerifiableWorkCredential } from "../types/VerifiableWorkCredential";
import { HeldWorkCredentials } from "../types/HeldWorkCredentials";
import { HeldVerifiableWorkCredentials } from "../types/HeldVerifiableWorkCredentials";
import { Membership } from "../types/MemberShip";
import { MembershipSubject } from "../types/MembershipSubject";
export declare type ModelTypes = ModelTypeAliases<
  {
    AlsoKnownAs: AlsoKnownAs;
    BasicProfile: BasicProfile;
    CryptoAccounts: CryptoAccountLinks;
    WorkCredential: WorkCredential;
    VerifiableWorkCredential: VerifiableWorkCredential;
    HeldWorkCredentials: HeldWorkCredentials;
    OldWorkCredential: OldWorkCredential;
    OldWorkCredentials: OldWorkCredentials;
    HeldVerifiableWorkCredentials: HeldVerifiableWorkCredentials;
    Organization: Organization;
    MemberShip: Membership;
    MembershipSubject: MembershipSubject;
  },
  {
    alsoKnownAs: "AlsoKnownAs";
    basicProfile: "BasicProfile";
    cryptoAccounts: "CryptoAccounts";
    workCredential: "WorkCredential";
    verifiableWorkCredential: "VerifiableWorkCredential";
    heldWorkCredentials: "HeldWorkCredentials";
    OldWorkCredential: "OldWorkCredential";
    OldWorkCredentials: "OldWorkCredentials";
    heldVerifiableWorkCredentials: "HeldVerifiableWorkCredentials";
    Organization: "Organization";
    MemberShip: "MemberShip";
    MembershipSubject: "MembershipSubject";
  }
>;
export declare const model: EncodedManagedModel;
