import type { ModelTypeAliases } from "@glazed/types";
import type { BasicProfile } from "@datamodels/identity-profile-basic";
import { AlsoKnownAs } from "@datamodels/identity-accounts-web";
import { CryptoAccountLinks } from "@datamodels/identity-accounts-crypto";
import { CVoxel, CVoxels } from "./cVoxelType";
import {
  Transaction,
  Work,
  WorkCredential,
} from "@/__generated__/types/WorkCredential";
import { VerifiableWorkCredential } from "@/__generated__/types/VerifiableWorkCredential";
import { HeldWorkCredentials } from "@/__generated__/types/HeldWorkCredentials";
import { HeldVerifiableWorkCredentials } from "@/__generated__/types/HeldVerifiableWorkCredentials";
import { Organization } from "@/__generated__/types/Organization";
import { MemberShip } from "@/__generated__/types/MemberShip";
import { MembershipSubject } from "@/__generated__/types/MembershipSubject";

export type WorkCredentialWithId = WorkCredential & {
  backupId?: string;
  holderDid?: string;
  potentialSigners?: string[];
};

export type WorkCredentialForm = Work &
  Transaction & {
    deliverableLink?: string;
    deliverableCID?: string;
  };

export type ModelTypes = ModelTypeAliases<
  {
    AlsoKnownAs: AlsoKnownAs;
    BasicProfile: BasicProfile;
    CryptoAccounts: CryptoAccountLinks;
    WorkCredential: WorkCredential;
    VerifiableWorkCredential: VerifiableWorkCredential;
    HeldWorkCredentials: HeldWorkCredentials;
    OldWorkCredential: CVoxel;
    OldWorkCredentials: CVoxels;
    HeldVerifiableWorkCredentials: HeldVerifiableWorkCredentials;
    Organization: Organization;
    MemberShip: MemberShip;
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

const AliasType = {
  alsoKnownAs: "AlsoKnownAs",
  basicProfile: "BasicProfile",
  cryptoAccounts: "CryptoAccounts",
  workCredential: "WorkCredential",
  verifiableWorkCredential: "VerifiableWorkCredential",
  heldWorkCredentials: "HeldWorkCredentials",
  OldWorkCredential: "OldWorkCredential",
  OldWorkCredentials: "OldWorkCredentials",
  heldVerifiableWorkCredentials: "HeldVerifiableWorkCredentials",
  Organization: "Organization",
  MemberShip: "MemberShip",
  MembershipSubject: "MembershipSubject",
} as const;
export type AliasTypes = typeof AliasType[keyof typeof AliasType];
