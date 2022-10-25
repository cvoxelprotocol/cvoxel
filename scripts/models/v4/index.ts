import type { ModelTypeAliases, EncodedManagedModel } from "@glazed/types";
import type { BasicProfile } from "@datamodels/identity-profile-basic";
import { AlsoKnownAs } from "@datamodels/identity-accounts-web";
import { CryptoAccountLinks } from "@datamodels/identity-accounts-crypto";

import { OldWorkCredential } from "./types/OldWorkCredential";
import { OldWorkCredentials } from "./types/OldWorkCredentials";
import { Organization, WorkCredential } from "./types/WorkCredential";
import { VerifiableWorkCredential } from "./types/VerifiableWorkCredential";
import { HeldWorkCredentials } from "./types/HeldWorkCredentials";
import { HeldVerifiableWorkCredentials } from "./types/HeldVerifiableWorkCredentials";
import { Membership } from "./types/MemberShip";
import { MembershipSubject } from "./types/MembershipSubject";
import { CreatedOrganizations } from "./types/CreatedOrganizations";
import { CreatedMemberships } from "./types/CreatedMemberships";
import { CreatedMembershipSubjects } from "./types/CreatedMembershipSubjects";
import { VerifiableMembershipSubjectCredential } from "./types/VerifiableMembershipSubjectCredential";
import { HeldVerifiableMembershipSubjects } from "./types/HeldVerifiableMembershipSubjects";
import { IssuedVerifiableMembershipSubjects } from "./types/IssuedVerifiableMembershipSubjects";

export type ModelTypes = ModelTypeAliases<
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
    CreatedOrganizations: CreatedOrganizations;
    CreatedMemberships: CreatedMemberships;
    CreatedMembershipSubjects: CreatedMembershipSubjects;
    VerifiableMembershipSubjectCredential: VerifiableMembershipSubjectCredential;
    HeldVerifiableMembershipSubjects: HeldVerifiableMembershipSubjects;
    IssuedVerifiableMembershipSubjects: IssuedVerifiableMembershipSubjects;
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
    CreatedOrganizations: "CreatedOrganizations";
    CreatedMemberships: "CreatedMemberships";
    CreatedMembershipSubjects: "CreatedMembershipSubjects";
    VerifiableMembershipSubjectCredential: "VerifiableMembershipSubjectCredential";
    HeldVerifiableMembershipSubjects: "HeldVerifiableMembershipSubjects";
    IssuedVerifiableMembershipSubjects: "IssuedVerifiableMembershipSubjects";
  }
>;

export const prodModel: EncodedManagedModel = {
  schemas: {
    kjzl6cwe1jw146x1pnq7vg4t0lwea84s2a8u58tt1clfmv7mrju3l2341klxyu6: {
      alias: "BasicProfile",
      commits: [
        {
          jws: {
            payload: "AXESIMy4lYCUWSpzFW5jKQ0mYJOQ67EQnv5Exuv3F599h-et",
            signatures: [
              {
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3NOWUU2V3RNWjNXTGJQd2NwOUdtN2RUN0ozRHNOUDhhdVFOblBwUUJ1MzdBI3o2TWtzTllFNld0TVozV0xiUHdjcDlHbTdkVDdKM0RzTlA4YXVRTm5QcFFCdTM3QSJ9",
                signature:
                  "yeEnzWKALkvTn_X7wjgL3ldLW8I8vWANs5QZmqI6PGbU5AJl12eIuWyID-mRPuGF9flovtGNX1P-qKkc6Y8JBA",
              },
            ],
            link: "bafyreigmxckybfczfjzrk3tdfegsmyetsdv3cee67zcmn27xc6px3b7hvu",
          },
          linkedBlock:
            "o2RkYXRhpWR0eXBlZm9iamVjdGV0aXRsZWxCYXNpY1Byb2ZpbGVnJHNjaGVtYXgnaHR0cDovL2pzb24tc2NoZW1hLm9yZy9kcmFmdC0wNy9zY2hlbWEjanByb3BlcnRpZXOsY3VybKJkdHlwZWZzdHJpbmdpbWF4TGVuZ3RoGPBkbmFtZaJkdHlwZWZzdHJpbmdpbWF4TGVuZ3RoGJZlZW1vammiZHR5cGVmc3RyaW5naW1heExlbmd0aAJlaW1hZ2WhZCRyZWZ4GiMvZGVmaW5pdGlvbnMvaW1hZ2VTb3VyY2VzZmdlbmRlcqJkdHlwZWZzdHJpbmdpbWF4TGVuZ3RoGCppYmlydGhEYXRlo2R0eXBlZnN0cmluZ2Zmb3JtYXRkZGF0ZWltYXhMZW5ndGgKamJhY2tncm91bmShZCRyZWZ4GiMvZGVmaW5pdGlvbnMvaW1hZ2VTb3VyY2Vza2Rlc2NyaXB0aW9uomR0eXBlZnN0cmluZ2ltYXhMZW5ndGgZAaRsYWZmaWxpYXRpb25zomR0eXBlZWFycmF5ZWl0ZW1zomR0eXBlZnN0cmluZ2ltYXhMZW5ndGgYjGxob21lTG9jYXRpb26iZHR5cGVmc3RyaW5naW1heExlbmd0aBiMbW5hdGlvbmFsaXRpZXOjZHR5cGVlYXJyYXllaXRlbXOjZHR5cGVmc3RyaW5nZ3BhdHRlcm5qXltBLVpdezJ9JGhtYXhJdGVtcwVobWluSXRlbXMBcHJlc2lkZW5jZUNvdW50cnmjZHR5cGVmc3RyaW5nZ3BhdHRlcm5qXltBLVpdezJ9JGltYXhMZW5ndGgCa2RlZmluaXRpb25zpGdJUEZTVXJso2R0eXBlZnN0cmluZ2dwYXR0ZXJual5pcGZzOi8vLitpbWF4TGVuZ3RoGJZsaW1hZ2VTb3VyY2Vzo2R0eXBlZm9iamVjdGhyZXF1aXJlZIFob3JpZ2luYWxqcHJvcGVydGllc6Job3JpZ2luYWyhZCRyZWZ4GyMvZGVmaW5pdGlvbnMvaW1hZ2VNZXRhZGF0YWxhbHRlcm5hdGl2ZXOiZHR5cGVlYXJyYXllaXRlbXOhZCRyZWZ4GyMvZGVmaW5pdGlvbnMvaW1hZ2VNZXRhZGF0YW1pbWFnZU1ldGFkYXRho2R0eXBlZm9iamVjdGhyZXF1aXJlZIRjc3JjaG1pbWVUeXBlZXdpZHRoZmhlaWdodGpwcm9wZXJ0aWVzpWNzcmOhZCRyZWZ1Iy9kZWZpbml0aW9ucy9JUEZTVXJsZHNpemWhZCRyZWZ4HSMvZGVmaW5pdGlvbnMvcG9zaXRpdmVJbnRlZ2VyZXdpZHRooWQkcmVmeB0jL2RlZmluaXRpb25zL3Bvc2l0aXZlSW50ZWdlcmZoZWlnaHShZCRyZWZ4HSMvZGVmaW5pdGlvbnMvcG9zaXRpdmVJbnRlZ2VyaG1pbWVUeXBlomR0eXBlZnN0cmluZ2ltYXhMZW5ndGgYMm9wb3NpdGl2ZUludGVnZXKiZHR5cGVnaW50ZWdlcmdtaW5pbXVtAWZoZWFkZXKiZnNjaGVtYfdrY29udHJvbGxlcnOBeDhkaWQ6a2V5Ono2TWtzTllFNld0TVozV0xiUHdjcDlHbTdkVDdKM0RzTlA4YXVRTm5QcFFCdTM3QWdkb2N0eXBlZHRpbGU=",
        },
      ],
      dependencies: {},
      version:
        "k3y52l7qbv1frxt706gqfzmq6cbqdkptzk8uudaryhlkf6ly9vx21hqu4r6k1jqio",
    },
    kjzl6cwe1jw14bie69guriwn4hsto1gdh5q1ytpwi84xkz2b9oxkw9qs7d3v3vv: {
      alias: "CryptoAccounts",
      commits: [
        {
          jws: {
            payload: "AXESIF-4Olz6gzTYrKPZj_7buHaUsueU-P0K67cq6kHlJphd",
            signatures: [
              {
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3NOWUU2V3RNWjNXTGJQd2NwOUdtN2RUN0ozRHNOUDhhdVFOblBwUUJ1MzdBI3o2TWtzTllFNld0TVozV0xiUHdjcDlHbTdkVDdKM0RzTlA4YXVRTm5QcFFCdTM3QSJ9",
                signature:
                  "WMNOLmFwYUcYg-dhzg_zkFYit2j7hdYY4_NvcRy_4q_CJmfj8WOxTeHRQ1HqdXkXVycg_Q4JmtqUG992Cdf2CA",
              },
            ],
            link: "bafyreic7xa5fz6udgtmkzi6zr77nxodwsszopfhy7ufoxnzk5ja6kjuylu",
          },
          linkedBlock:
            "o2RkYXRhpmR0eXBlZm9iamVjdGV0aXRsZXJDcnlwdG9BY2NvdW50TGlua3NnJHNjaGVtYXgnaHR0cDovL2pzb24tc2NoZW1hLm9yZy9kcmFmdC0wNy9zY2hlbWEjbXByb3BlcnR5TmFtZXOhaW1heExlbmd0aBkEAHFwYXR0ZXJuUHJvcGVydGllc6F4OF5bYS16QS1aMC05XXsxLDYzfUBbLWEtekEtWjAtOV17MywxNn06Wy1hLXpBLVowLTldezEsNDd9o2R0eXBlZnN0cmluZ2dwYXR0ZXJubV5jZXJhbWljOi8vLitpbWF4TGVuZ3RoGQQAdGFkZGl0aW9uYWxQcm9wZXJ0aWVz9GZoZWFkZXKiZnNjaGVtYfdrY29udHJvbGxlcnOBeDhkaWQ6a2V5Ono2TWtzTllFNld0TVozV0xiUHdjcDlHbTdkVDdKM0RzTlA4YXVRTm5QcFFCdTM3QWdkb2N0eXBlZHRpbGU=",
        },
      ],
      dependencies: {},
      version:
        "k3y52l7qbv1frypussjburqg4fykyyycfu0p9znc75lv2t5cg4xaslhagkd7h7mkg",
    },
    kjzl6cwe1jw14bbsas0m29cxrnsyesfp0v45gz9l44p3wpw86j21kio8onil8po: {
      alias: "AlsoKnownAs",
      commits: [
        {
          jws: {
            payload: "AXESIALdl9Z9fNLBS6NfkZ2JRIClBQFb0cIi2rVwS1Kie2k1",
            signatures: [
              {
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3NOWUU2V3RNWjNXTGJQd2NwOUdtN2RUN0ozRHNOUDhhdVFOblBwUUJ1MzdBI3o2TWtzTllFNld0TVozV0xiUHdjcDlHbTdkVDdKM0RzTlA4YXVRTm5QcFFCdTM3QSJ9",
                signature:
                  "bg4CcLmHGYPYsRvl_EObk2HgtOjijDNBJrOzupI2NMT-n_3Wj4GaUn83wA2IqTtql5uZRpgBYqxOjGdH4GB6CA",
              },
            ],
            link: "bafyreiac3wl5m7l42lauxi27sgoysreauucqcw6ryirnvnlqjnjke63jgu",
          },
          linkedBlock:
            "o2RkYXRhp2R0eXBlZm9iamVjdGV0aXRsZWtBbHNvS25vd25Bc2ckc2NoZW1heCdodHRwOi8vanNvbi1zY2hlbWEub3JnL2RyYWZ0LTA3L3NjaGVtYSNocmVxdWlyZWSBaGFjY291bnRzanByb3BlcnRpZXOhaGFjY291bnRzomR0eXBlZWFycmF5ZWl0ZW1zoWQkcmVmdSMvZGVmaW5pdGlvbnMvQWNjb3VudGtkZWZpbml0aW9uc6JnQWNjb3VudKNkdHlwZWZvYmplY3RocmVxdWlyZWSCaHByb3RvY29sYmlkanByb3BlcnRpZXOlYmlkomR0eXBlZnN0cmluZ2ltYXhMZW5ndGgZAcJkaG9zdKJkdHlwZWZzdHJpbmdpbWF4TGVuZ3RoGJZlY2xhaW2iZHR5cGVmc3RyaW5naW1heExlbmd0aBkBwmhwcm90b2NvbKJkdHlwZWZzdHJpbmdpbWF4TGVuZ3RoGDJsYXR0ZXN0YXRpb25zomR0eXBlZWFycmF5ZWl0ZW1zoWQkcmVmeBkjL2RlZmluaXRpb25zL0F0dGVzdGF0aW9ua0F0dGVzdGF0aW9uomR0eXBlZm9iamVjdGpwcm9wZXJ0aWVzomdkaWQtand0omR0eXBlZnN0cmluZ2ltYXhMZW5ndGgZA+hqZGlkLWp3dC12Y6JkdHlwZWZzdHJpbmdpbWF4TGVuZ3RoGQPodGFkZGl0aW9uYWxQcm9wZXJ0aWVz9GZoZWFkZXKiZnNjaGVtYfdrY29udHJvbGxlcnOBeDhkaWQ6a2V5Ono2TWtzTllFNld0TVozV0xiUHdjcDlHbTdkVDdKM0RzTlA4YXVRTm5QcFFCdTM3QWdkb2N0eXBlZHRpbGU=",
        },
      ],
      dependencies: {},
      version:
        "k3y52l7qbv1fryojt8n8cw2k04p9wp67ly59iwqs65dejso566fij5wsdrb871yio",
    },
    kjzl6cwe1jw145vb7ew4q0yjx67dvegzlx08k5qbq0m6l2x7kffzbzoeeos1h3n: {
      alias: "OldWorkCredential",
      commits: [
        {
          jws: {
            payload: "AXESIKokSC75KdCcuy2PXVT1uOy1QpNLkcFxxpXIRJhnmp_1",
            signatures: [
              {
                signature:
                  "WqznxgijtJlXYGEBR8DOtLz7oyGuf_UtpKi3lH4DqFwJeelohoCxfN7jgfwrdslFo0gGubLoyU9Z604ZSF8jBw",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreifkerec56jj2colwlmplvkplohmwvbjgs4ryfy4nfoiismgpgu76u",
          },
          linkedBlock:
            "omRkYXRhpmR0eXBlZm9iamVjdGV0aXRsZW5Xb3JrQ3JlZGVudGlhbGckc2NoZW1heCdodHRwOi8vanNvbi1zY2hlbWEub3JnL2RyYWZ0LTA3L3NjaGVtYSNocmVxdWlyZWSHYnRvZGZyb21nc3VtbWFyeWV2YWx1ZWt0b2tlblN5bWJvbGluZXR3b3JrSWRvaXNzdWVkVGltZXN0YW1wanByb3BlcnRpZXO4HmJ0b6NkdHlwZWZzdHJpbmdldGl0bGVidG9rZGVzY3JpcHRpb25tcGF5ZWUgYWRkcmVzc2Rmcm9to2R0eXBlZnN0cmluZ2V0aXRsZWRmcm9ta2Rlc2NyaXB0aW9ubXBheWVyIGFkZHJlc3NkdGFnc6VkdHlwZWVhcnJheWVpdGVtc6FkdHlwZWZzdHJpbmdldGl0bGVkdGFnc2tkZXNjcmlwdGlvbml3b3JrIHRhZ3NrdW5pcXVlSXRlbXP1ZWdlbnJlo2R0eXBlZnN0cmluZ2V0aXRsZWVnZW5yZWtkZXNjcmlwdGlvbngfd29yayBnZW5yZSBlLmcsIERldiwgRGVzaWduIGV0Y2V0b1NpZ6NkdHlwZWZzdHJpbmdldGl0bGVldG9TaWdrZGVzY3JpcHRpb25yc2lnbmF0dXJlIG9mIHBleWVlZXZhbHVlo2R0eXBlZnN0cmluZ2V0aXRsZWV2YWx1ZWtkZXNjcmlwdGlvbmpwYWlkIHZhbHVlZmRldGFpbKNkdHlwZWZzdHJpbmdldGl0bGVmZGV0YWlsa2Rlc2NyaXB0aW9ua3dvcmsgZGV0YWlsZnR4SGFzaKNkdHlwZWZzdHJpbmdldGl0bGVmdHhIYXNoa2Rlc2NyaXB0aW9ud2hhc2ggb2YgdGhlIHRyYW5zYWN0aW9uZ2Zyb21TaWejZHR5cGVmc3RyaW5nZXRpdGxlZ2Zyb21TaWdrZGVzY3JpcHRpb25yc2lnbmF0dXJlIG9mIHBleWVyZ2lzUGF5ZXKjZHR5cGVnYm9vbGVhbmV0aXRsZWdpc1BheWVya2Rlc2NyaXB0aW9ueBt3aGV0aGVyIG9yIG5vdCBESUQgaXMgcGF5ZXJnam9iVHlwZaNkdHlwZWZzdHJpbmdldGl0bGVnam9iVHlwZWtkZXNjcmlwdGlvbngxY3VycmVudGx5IHN1cHBvcnQgZnVsbHRpbWUsIHBhcnR0aW1lLCBhbmQgb25ldGltZWdzdW1tYXJ5o2R0eXBlZnN0cmluZ2V0aXRsZWdzdW1tYXJ5a2Rlc2NyaXB0aW9ubHdvcmsgc3VtbWFyeWhwbGF0Zm9ybaNkdHlwZWZzdHJpbmdldGl0bGVocGxhdGZvcm1rZGVzY3JpcHRpb254LWEgdHJhbnNhY3Rpb24gcGxhdGZvcm0gaWYgZXhpc3RzIGUuZywgZ2l0Y29pbmhzdWJ0YXNrc6RkdHlwZWVhcnJheWVpdGVtc6NkdHlwZWZvYmplY3RldGl0bGVnc3VidGFza2pwcm9wZXJ0aWVzomVnZW5yZaNkdHlwZWZzdHJpbmdldGl0bGVlZ2VucmVrZGVzY3JpcHRpb254H3dvcmsgZ2VucmUgZS5nLCBEZXYsIERlc2lnbiBldGNmZGV0YWlso2R0eXBlZnN0cmluZ2V0aXRsZWZkZXRhaWxrZGVzY3JpcHRpb25rd29yayBkZXRhaWxldGl0bGVoc3VidGFza3NrZGVzY3JpcHRpb25oc3VidGFza3NodG9TaWduZXKjZHR5cGVmc3RyaW5nZXRpdGxlaHRvU2lnbmVya2Rlc2NyaXB0aW9ueCJBZGRyZXNzIG9mIHBlcnNvbiBzaWduaW5nIGFzIHBheWVlaWNyZWF0ZWRBdKJkdHlwZWZzdHJpbmdldGl0bGVpY3JlYXRlZEF0aWZpYXRWYWx1ZaNkdHlwZWZzdHJpbmdldGl0bGVldmFsdWVrZGVzY3JpcHRpb254KWZpYXQgcHJpY2UgYXQgdGhlIHRpbWUgb2YgdGhlIHRyYW5zYWN0aW9uaW5ldHdvcmtJZKNkdHlwZWZudW1iZXJldGl0bGVpbmV0d29ya0lka2Rlc2NyaXB0aW9ueB1uZXR3b3JrIGlkIG9mIHRoZSB0cmFuc2FjdGlvbml1cGRhdGVkQXSiZHR5cGVmc3RyaW5nZXRpdGxlaXVwZGF0ZWRBdGpmaWF0U3ltYm9so2R0eXBlZnN0cmluZ2V0aXRsZWpmaWF0U3ltYm9sa2Rlc2NyaXB0aW9ueBpjdXJyZW50bHkgb25seSBzdXBwb3J0IFVTRGpmcm9tU2lnbmVyo2R0eXBlZnN0cmluZ2V0aXRsZWpmcm9tU2lnbmVya2Rlc2NyaXB0aW9ueCJBZGRyZXNzIG9mIHBlcnNvbiBzaWduaW5nIGFzIHBheWVya3Rva2VuU3ltYm9so2R0eXBlZnN0cmluZ2V0aXRsZWt0b2tlblN5bWJvbGtkZXNjcmlwdGlvbnFwYWlkIHRva2VuIHN5bWJvbGxkZWxpdmVyYWJsZXOkZHR5cGVlYXJyYXllaXRlbXOjZHR5cGVmb2JqZWN0ZXRpdGxlb2RlbGl2ZXJhYmxlSXRlbWpwcm9wZXJ0aWVzomV2YWx1ZaNkdHlwZWZzdHJpbmdldGl0bGVldmFsdWVrZGVzY3JpcHRpb254H3dvcmsgZGVsaXZlcmFibGUgdmFsdWUodXJsL2NpZClmZm9ybWF0o2R0eXBlZnN0cmluZ2V0aXRsZWZmb3JtYXRrZGVzY3JpcHRpb254HmN1cnJlbnQgZm9ybWF0cyBhcmUgdXJsIG9yIGNpZGV0aXRsZWxkZWxpdmVyYWJsZXNrZGVzY3JpcHRpb25xd29yayBkZWxpdmVyYWJsZXNsZW5kVGltZXN0YW1wo2R0eXBlZnN0cmluZ2V0aXRsZWxlbmRUaW1lc3RhbXBrZGVzY3JpcHRpb254GFRpbWUgc3RhbXAgb2Ygd29yayBlbmRlZGx0b2tlbkRlY2ltYWyjZHR5cGVmbnVtYmVyZXRpdGxlbHRva2VuRGVjaW1hbGtkZXNjcmlwdGlvbnJwYWlkIHRva2VuIGRlY2ltYWxuc3RhcnRUaW1lc3RhbXCjZHR5cGVmc3RyaW5nZXRpdGxlbnN0YXJ0VGltZXN0YW1wa2Rlc2NyaXB0aW9ueBpUaW1lIHN0YW1wIG9mIHdvcmsgc3RhcnRlZG9kZWxpdmVyYWJsZUhhc2ijZHR5cGVmc3RyaW5nZXRpdGxlb2RlbGl2ZXJhYmxlSGFzaGtkZXNjcmlwdGlvbnhCaGFzaCB2YWx1ZSBvZiBhbGwgd29yayBkZXNjcmlwdGlvbnMoc3VtbWFyeSwgZGV0YWlsLCBkZWxpdmVyYWJsZXMpb2lzc3VlZFRpbWVzdGFtcKNkdHlwZWZzdHJpbmdldGl0bGVvaXNzdWVkVGltZXN0YW1wa2Rlc2NyaXB0aW9ueCRUaW1lIHN0YW1wIG9mIHRyYW5zYWN0aW9uIG9jY3VycmVuY2VvcmVsYXRlZFR4SGFzaGVzpGR0eXBlZWFycmF5ZWl0ZW1zoWR0eXBlZnN0cmluZ2V0aXRsZW9yZWxhdGVkVHhIYXNoZXNrdW5pcXVlSXRlbXP1cHJlbGF0ZWRBZGRyZXNzZXOkZHR5cGVlYXJyYXllaXRlbXOhZHR5cGVmc3RyaW5nZXRpdGxlbnJlbGF0ZWRBZGRyZXNza3VuaXF1ZUl0ZW1z9XRhZGRpdGlvbmFsUHJvcGVydGllc/RmaGVhZGVyomZ1bmlxdWVwc3hzMnlJZ3RCR1p2Qms4QWtjb250cm9sbGVyc4F4OGRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03",
        },
      ],
      dependencies: {},
      version:
        "k3y52l7qbv1frxlqnopwhl2tpnw4inawt7upovcr7d0dqtws5t9tn99pigg7ehlvk",
    },
    kjzl6cwe1jw14aaegoi4ca3lo85qlo3wwvql7cp5un7d3l51qyhbu88giq67u63: {
      alias: "OldWorkCredentials",
      commits: [
        {
          jws: {
            payload: "AXESIE23FD-iKeiIWH-EUqhiuPdK3z_0FkRStYF-RMa1v3Zw",
            signatures: [
              {
                signature:
                  "OLPqgx2UsmnozmfQOElYjTOeWcuHEWMc5oxJlaJM0TowX-kfNFlGqz8sP4Wh4CtEFbzcW4PNEkLukR_OVCVXCg",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreicnw4kd7irj5cefq74ekkugfohxjlpt75awirjllal6itdllp3woa",
          },
          linkedBlock:
            "omRkYXRhpWR0eXBlZm9iamVjdGV0aXRsZW9Xb3JrQ3JlZGVudGlhbHNnJHNjaGVtYXgnaHR0cDovL2pzb24tc2NoZW1hLm9yZy9kcmFmdC0wNy9zY2hlbWEjanByb3BlcnRpZXOhb1dvcmtDcmVkZW50aWFsc6NkdHlwZWVhcnJheWVpdGVtc6RkdHlwZWZvYmplY3RldGl0bGVyV29ya0NyZWRlbnRpYWxJdGVtanByb3BlcnRpZXOrYmlkpGR0eXBlZnN0cmluZ2dwYXR0ZXJueBxeY2VyYW1pYzovLy4rKFw/dmVyc2lvbj0uKyk/aCRjb21tZW50eFVjaXA4ODpyZWY6Y2VyYW1pYzovL2szeTUybDdxYnYxZnJ4bHFub3B3aGwydHBudzRpbmF3dDd1cG92Y3I3ZDBkcXR3czV0OXRuOTlwaWdnN2VobHZraW1heExlbmd0aBjIZWdlbnJlo2R0eXBlZnN0cmluZ2V0aXRsZWVnZW5yZWtkZXNjcmlwdGlvbngfd29yayBnZW5yZSBlLmcsIERldiwgRGVzaWduIGV0Y2Z0eEhhc2ijZHR5cGVmc3RyaW5nZXRpdGxlZnR4SGFzaGtkZXNjcmlwdGlvbndoYXNoIG9mIHRoZSB0cmFuc2FjdGlvbmdpc1BheWVyo2R0eXBlZ2Jvb2xlYW5ldGl0bGVnaXNQYXllcmtkZXNjcmlwdGlvbngbd2hldGhlciBvciBub3QgRElEIGlzIHBheWVyZ3N1bW1hcnmjZHR5cGVmc3RyaW5nZXRpdGxlZ3N1bW1hcnlrZGVzY3JpcHRpb25sd29yayBzdW1tYXJ5aHBsYXRmb3Jto2R0eXBlZnN0cmluZ2V0aXRsZWhwbGF0Zm9ybWtkZXNjcmlwdGlvbngtYSB0cmFuc2FjdGlvbiBwbGF0Zm9ybSBpZiBleGlzdHMgZS5nLCBnaXRjb2luaWZpYXRWYWx1ZaNkdHlwZWZzdHJpbmdldGl0bGVldmFsdWVrZGVzY3JpcHRpb254KWZpYXQgcHJpY2UgYXQgdGhlIHRpbWUgb2YgdGhlIHRyYW5zYWN0aW9uamlzVmVyaWZpZWSjZHR5cGVnYm9vbGVhbmV0aXRsZWppc1ZlcmlmaWVka2Rlc2NyaXB0aW9ueD9FaXRoZXIgYm90aCBzaWduYXR1cmVzIGV4aXN0IG9yIHRoZSB0cmFuc2FjdGlvbiBpcyB2aWEgcGxhdGZvcm1sZGVsaXZlcmFibGVzpGR0eXBlZWFycmF5ZWl0ZW1zo2R0eXBlZm9iamVjdGV0aXRsZW9kZWxpdmVyYWJsZUl0ZW1qcHJvcGVydGllc6JldmFsdWWjZHR5cGVmc3RyaW5nZXRpdGxlZXZhbHVla2Rlc2NyaXB0aW9ueB93b3JrIGRlbGl2ZXJhYmxlIHZhbHVlKHVybC9jaWQpZmZvcm1hdKNkdHlwZWZzdHJpbmdldGl0bGVmZm9ybWF0a2Rlc2NyaXB0aW9ueB5jdXJyZW50IGZvcm1hdHMgYXJlIHVybCBvciBjaWRldGl0bGVsZGVsaXZlcmFibGVza2Rlc2NyaXB0aW9ucXdvcmsgZGVsaXZlcmFibGVzb2RlbGl2ZXJhYmxlSGFzaKNkdHlwZWZzdHJpbmdldGl0bGVvZGVsaXZlcmFibGVIYXNoa2Rlc2NyaXB0aW9ueEJoYXNoIHZhbHVlIG9mIGFsbCB3b3JrIGRlc2NyaXB0aW9ucyhzdW1tYXJ5LCBkZXRhaWwsIGRlbGl2ZXJhYmxlcylvaXNzdWVkVGltZXN0YW1wo2R0eXBlZnN0cmluZ2V0aXRsZW9pc3N1ZWRUaW1lc3RhbXBrZGVzY3JpcHRpb254JFRpbWUgc3RhbXAgb2YgdHJhbnNhY3Rpb24gb2NjdXJyZW5jZWtkZXNjcmlwdGlvbnJ3b3JrIGNyZWRlbnRpYWwgaWRldGl0bGVvV29ya0NyZWRlbnRpYWxzdGFkZGl0aW9uYWxQcm9wZXJ0aWVz9GZoZWFkZXKiZnVuaXF1ZXAzTDR4bUwvTDFvT1dJb0s2a2NvbnRyb2xsZXJzgXg4ZGlkOmtleTp6Nk1rcHptenR4dlBZU0NaOHR6U0NCUWhzUFR4Rml4VWtyekNEaFNLQmJRNlN2bTc=",
        },
      ],
      dependencies: {
        "WorkCredentials.id": [
          "kjzl6cwe1jw145vb7ew4q0yjx67dvegzlx08k5qbq0m6l2x7kffzbzoeeos1h3n",
        ],
      },
      version:
        "k3y52l7qbv1fryh5yum8uvbtm4a0t63fu1tp2saaxlx0d5ibwfp786yk5h647qj9c",
    },
    kjzl6cwe1jw146t6x5l3jcj4v8fx7bojr39u3ea27hpy3mnbr1pck848yd9yb4u: {
      alias: "WorkCredential",
      commits: [
        {
          jws: {
            payload: "AXESIF2RPlg3_zuHPU3PMkE5AOKTzqrrXIIc_86TBq6JzWRl",
            signatures: [
              {
                signature:
                  "fM3kkn-HdwlW7wsv6SblqE5tDfnbbJpSc6l4TH-iO_ne9LZv7Foi2cAbs2hJvrTavdrGN4n0_mKzhzo7rw0FDg",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreic5se7fqn77hodt2topgjatsahcsphkv224qiop7tuta2xittlemu",
          },
          linkedBlock:
            "omRkYXRhpmR0eXBlZm9iamVjdGV0aXRsZW5Xb3JrQ3JlZGVudGlhbGckc2NoZW1heCdodHRwOi8vanNvbi1zY2hlbWEub3JnL2RyYWZ0LTA3L3NjaGVtYSNocmVxdWlyZWSCYmlkZ3N1YmplY3RqcHJvcGVydGllc6ViaWSiZHR5cGVmc3RyaW5naW1heExlbmd0aBjwZ3N1YmplY3SjZHR5cGVmb2JqZWN0ZXRpdGxla1dvcmtTdWJqZWN0anByb3BlcnRpZXOkYnR4pWR0eXBlZm9iamVjdGV0aXRsZWtUcmFuc2FjdGlvbmhyZXF1aXJlZIFmdHhIYXNoanByb3BlcnRpZXOtYnRvo2R0eXBlZnN0cmluZ2V0aXRsZWJ0b2tkZXNjcmlwdGlvbm1wYXllZSBhZGRyZXNzZGZyb22jZHR5cGVmc3RyaW5nZXRpdGxlZGZyb21rZGVzY3JpcHRpb25tcGF5ZXIgYWRkcmVzc2V2YWx1ZaNkdHlwZWZzdHJpbmdldGl0bGVldmFsdWVrZGVzY3JpcHRpb25qcGFpZCB2YWx1ZWZ0eEhhc2ijZHR5cGVmc3RyaW5nZXRpdGxlZnR4SGFzaGtkZXNjcmlwdGlvbndoYXNoIG9mIHRoZSB0cmFuc2FjdGlvbmdpc1BheWVyo2R0eXBlZ2Jvb2xlYW5ldGl0bGVnaXNQYXllcmtkZXNjcmlwdGlvbngbd2hldGhlciBvciBub3QgRElEIGlzIHBheWVyaWZpYXRWYWx1ZaNkdHlwZWZzdHJpbmdldGl0bGVldmFsdWVrZGVzY3JpcHRpb254KWZpYXQgcHJpY2UgYXQgdGhlIHRpbWUgb2YgdGhlIHRyYW5zYWN0aW9uaW5ldHdvcmtJZKNkdHlwZWZudW1iZXJldGl0bGVpbmV0d29ya0lka2Rlc2NyaXB0aW9ueB1uZXR3b3JrIGlkIG9mIHRoZSB0cmFuc2FjdGlvbmpmaWF0U3ltYm9so2R0eXBlZnN0cmluZ2V0aXRsZWpmaWF0U3ltYm9sa2Rlc2NyaXB0aW9ueBpjdXJyZW50bHkgb25seSBzdXBwb3J0IFVTRGt0b2tlblN5bWJvbKNkdHlwZWZzdHJpbmdldGl0bGVrdG9rZW5TeW1ib2xrZGVzY3JpcHRpb25xcGFpZCB0b2tlbiBzeW1ib2xsdG9rZW5EZWNpbWFso2R0eXBlZm51bWJlcmV0aXRsZWx0b2tlbkRlY2ltYWxrZGVzY3JpcHRpb25ycGFpZCB0b2tlbiBkZWNpbWFsb2lzc3VlZFRpbWVzdGFtcKNkdHlwZWZzdHJpbmdldGl0bGVvaXNzdWVkVGltZXN0YW1wa2Rlc2NyaXB0aW9ueCRUaW1lIHN0YW1wIG9mIHRyYW5zYWN0aW9uIG9jY3VycmVuY2VvcmVsYXRlZFR4SGFzaGVzpGR0eXBlZWFycmF5ZWl0ZW1zoWR0eXBlZnN0cmluZ2V0aXRsZW9yZWxhdGVkVHhIYXNoZXNrdW5pcXVlSXRlbXP1cHJlbGF0ZWRBZGRyZXNzZXOkZHR5cGVlYXJyYXllaXRlbXOhZHR5cGVmc3RyaW5nZXRpdGxlbnJlbGF0ZWRBZGRyZXNza3VuaXF1ZUl0ZW1z9XRhZGRpdGlvbmFsUHJvcGVydGllc/Rkd29ya6VkdHlwZWZvYmplY3RldGl0bGVkV29ya2hyZXF1aXJlZINiaWRnc3VtbWFyeWhpc3N1ZWRBdGpwcm9wZXJ0aWVzrmJpZKJkdHlwZWZzdHJpbmdpbWF4TGVuZ3RoGPBjdGF4o2R0eXBlZnN0cmluZ2V0aXRsZWV2YWx1ZWtkZXNjcmlwdGlvbmpwYWlkIHZhbHVlZHRhZ3OlZHR5cGVlYXJyYXllaXRlbXOhZHR5cGVmc3RyaW5nZXRpdGxlZHRhZ3NrZGVzY3JpcHRpb25pd29yayB0YWdza3VuaXF1ZUl0ZW1z9WVnZW5yZaNkdHlwZWZzdHJpbmdldGl0bGVlZ2VucmVrZGVzY3JpcHRpb254H3dvcmsgZ2VucmUgZS5nLCBEZXYsIERlc2lnbiBldGNldmFsdWWjZHR5cGVmc3RyaW5nZXRpdGxlZXZhbHVla2Rlc2NyaXB0aW9uanBhaWQgdmFsdWVmZGV0YWlso2R0eXBlZnN0cmluZ2V0aXRsZWZkZXRhaWxrZGVzY3JpcHRpb25rd29yayBkZXRhaWxnam9iVHlwZaNkdHlwZWZzdHJpbmdldGl0bGVnam9iVHlwZWtkZXNjcmlwdGlvbngxY3VycmVudGx5IHN1cHBvcnQgZnVsbHRpbWUsIHBhcnR0aW1lLCBhbmQgb25ldGltZWdzdW1tYXJ5o2R0eXBlZnN0cmluZ2V0aXRsZWdzdW1tYXJ5a2Rlc2NyaXB0aW9ubHdvcmsgc3VtbWFyeWhpc3N1ZWRBdKNkdHlwZWZzdHJpbmdldGl0bGVoaXNzdWVkQXRrZGVzY3JpcHRpb25vQ1JETCBpc3N1ZSBkYXRlaHBsYXRmb3Jto2R0eXBlZnN0cmluZ2V0aXRsZWhwbGF0Zm9ybWtkZXNjcmlwdGlvbngtYSB0cmFuc2FjdGlvbiBwbGF0Zm9ybSBpZiBleGlzdHMgZS5nLCBnaXRjb2lubGVuZFRpbWVzdGFtcKNkdHlwZWZzdHJpbmdldGl0bGVsZW5kVGltZXN0YW1wa2Rlc2NyaXB0aW9ueBhUaW1lIHN0YW1wIG9mIHdvcmsgZW5kZWRsb3JnYW5pemF0aW9uo2R0eXBlZnN0cmluZ2V0aXRsZWxvcmdhbml6YXRpb25rZGVzY3JpcHRpb254GG9yZ2FuaXphdGlvbiBJZCBpZiBleGlzdG5zdGFydFRpbWVzdGFtcKNkdHlwZWZzdHJpbmdldGl0bGVuc3RhcnRUaW1lc3RhbXBrZGVzY3JpcHRpb254GlRpbWUgc3RhbXAgb2Ygd29yayBzdGFydGVkb2RlbGl2ZXJhYmxlSGFzaKNkdHlwZWZzdHJpbmdldGl0bGVvZGVsaXZlcmFibGVIYXNoa2Rlc2NyaXB0aW9ueEJoYXNoIHZhbHVlIG9mIGFsbCB3b3JrIGRlc2NyaXB0aW9ucyhzdW1tYXJ5LCBkZXRhaWwsIGRlbGl2ZXJhYmxlcyl0YWRkaXRpb25hbFByb3BlcnRpZXP1ZmNsaWVudKNkdHlwZWZvYmplY3RldGl0bGVmY2xpZW50anByb3BlcnRpZXOiZXZhbHVlo2R0eXBlZnN0cmluZ2V0aXRsZWV2YWx1ZWtkZXNjcmlwdGlvbmtDbGllbnQgSW5mb2Zmb3JtYXSjZHR5cGVmc3RyaW5nZXRpdGxlZmZvcm1hdGtkZXNjcmlwdGlvbmtuYW1lIG9yIERJRGxkZWxpdmVyYWJsZXOjZHR5cGVlYXJyYXllaXRlbXOkZHR5cGVmb2JqZWN0ZXRpdGxlb2RlbGl2ZXJhYmxlSXRlbWpwcm9wZXJ0aWVzomV2YWx1ZaNkdHlwZWZzdHJpbmdldGl0bGVldmFsdWVrZGVzY3JpcHRpb254H3dvcmsgZGVsaXZlcmFibGUgdmFsdWUodXJsL2NpZClmZm9ybWF0o2R0eXBlZnN0cmluZ2V0aXRsZWZmb3JtYXRrZGVzY3JpcHRpb254HmN1cnJlbnQgZm9ybWF0cyBhcmUgdXJsIG9yIGNpZHRhZGRpdGlvbmFsUHJvcGVydGllc/RldGl0bGVsZGVsaXZlcmFibGVzaWNyZWF0ZWRBdKJkdHlwZWZzdHJpbmdldGl0bGVpY3JlYXRlZEF0aXNpZ25hdHVyZaRkdHlwZWZvYmplY3RldGl0bGVqc2lnbmF0dXJlc2pwcm9wZXJ0aWVzpWhhZ2VudFNpZ6NkdHlwZWZzdHJpbmdldGl0bGVoYWdlbnRTaWdrZGVzY3JpcHRpb25yc2lnbmF0dXJlIG9mIGFnZW50aWhvbGRlclNpZ6NkdHlwZWZzdHJpbmdldGl0bGVpaG9sZGVyU2lna2Rlc2NyaXB0aW9uc3NpZ25hdHVyZSBvZiBob2xkZXJqcGFydG5lclNpZ6NkdHlwZWZzdHJpbmdldGl0bGVqcGFydG5lclNpZ2tkZXNjcmlwdGlvbnRzaWduYXR1cmUgb2YgcGFydG5lcmthZ2VudFNpZ25lcqNkdHlwZWZzdHJpbmdldGl0bGVrYWdlbnRTaWduZXJrZGVzY3JpcHRpb25sRElEIG9mIGFnZW50bXBhcnRuZXJTaWduZXKjZHR5cGVmc3RyaW5nZXRpdGxlbXBhcnRuZXJTaWduZXJrZGVzY3JpcHRpb25sRElEIG9mIGFnZW50dGFkZGl0aW9uYWxQcm9wZXJ0aWVz9Gl1cGRhdGVkQXSiZHR5cGVmc3RyaW5nZXRpdGxlaXVwZGF0ZWRBdHRhZGRpdGlvbmFsUHJvcGVydGllc/RmaGVhZGVyomZ1bmlxdWVwaGdSYVY4OU51S0xuOS8zQmtjb250cm9sbGVyc4F4OGRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03",
        },
      ],
      dependencies: {},
      version:
        "k3y52l7qbv1frxsfl7rq15l42m418432kgn9y05jjpa0iht1vkc49btq7oeerz6dc",
    },
    kjzl6cwe1jw149g9jsu7ona1k9w2r1vkiznrfnmqkj7zjwd99ubfneknzr29h48: {
      alias: "VerifiableWorkCredential",
      commits: [
        {
          jws: {
            payload: "AXESIHkY3eUHpo1qT8xbiZWG2of5821xtwcIt2GTuQ1kMZYM",
            signatures: [
              {
                signature:
                  "I9pK2RaOxwHIAR08IubAXpuwsWko16Le4KU7jht7tVsEHFwOzLMdwzZF_1BuDMY6QrkIdhbxoZJiQwZ4IL4cAw",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreidzddo6kb5grvve7tc3rgkynwuh7hzw24nxa4eloymtxegwimmwbq",
          },
          linkedBlock:
            "omRkYXRhpmR0eXBlZm9iamVjdGV0aXRsZXgYVmVyaWZpYWJsZVdvcmtDcmVkZW50aWFsZyRzY2hlbWF4J2h0dHA6Ly9qc29uLXNjaGVtYS5vcmcvZHJhZnQtMDcvc2NoZW1hI2hyZXF1aXJlZIdoQGNvbnRleHRkdHlwZWJpZGZpc3N1ZXJxY3JlZGVudGlhbFN1YmplY3RwY3JlZGVudGlhbFNjaGVtYWxpc3N1YW5jZURhdGVqcHJvcGVydGllc6xiaWSiZHR5cGVmc3RyaW5naW1heExlbmd0aBjwZHR5cGWiZHR5cGVlYXJyYXllaXRlbXOhZHR5cGVmc3RyaW5nZXByb29mo2R0eXBlZm9iamVjdGhyZXF1aXJlZIFkdHlwZWpwcm9wZXJ0aWVzp2R0eXBloWR0eXBlZnN0cmluZ2ZlaXA3MTKkZHR5cGVmb2JqZWN0aHJlcXVpcmVkg2Zkb21haW5ldHlwZXNrcHJpbWFyeVR5cGVqcHJvcGVydGllc6NldHlwZXOhZHR5cGVmb2JqZWN0ZmRvbWFpbqRkdHlwZWZvYmplY3RocmVxdWlyZWSDZ2NoYWluSWRkbmFtZWd2ZXJzaW9uanByb3BlcnRpZXOkZG5hbWWhZHR5cGVmc3RyaW5nZ2NoYWluSWShZHR5cGVnaW50ZWdlcmd2ZXJzaW9uoWR0eXBlZnN0cmluZ3F2ZXJpZnlpbmdDb250cmFjdKFkdHlwZWZzdHJpbmd0YWRkaXRpb25hbFByb3BlcnRpZXP0a3ByaW1hcnlUeXBloWR0eXBlZnN0cmluZ3RhZGRpdGlvbmFsUHJvcGVydGllc/RnY3JlYXRlZKFkdHlwZWZzdHJpbmdqcHJvb2ZWYWx1ZaFkdHlwZWZzdHJpbmdscHJvb2ZQdXJwb3NloWR0eXBlZnN0cmluZ29ldGhlcmV1bUFkZHJlc3OhZHR5cGVmc3RyaW5ncnZlcmlmaWNhdGlvbk1ldGhvZKFkdHlwZWZzdHJpbmdmaXNzdWVyo2R0eXBlZm9iamVjdGhyZXF1aXJlZIFiaWRqcHJvcGVydGllc6JiaWShZHR5cGVmc3RyaW5nb2V0aGVyZXVtQWRkcmVzc6FkdHlwZWZzdHJpbmdoQGNvbnRleHSiZHR5cGVlYXJyYXllaXRlbXOhZHR5cGVmc3RyaW5naGV2aWRlbmNlo2R0eXBlZWFycmF5ZWl0ZW1zpWR0eXBlZm9iamVjdGV0aXRsZWhFdmlkZW5jZWhyZXF1aXJlZIJiaWRkdHlwZWpwcm9wZXJ0aWVzp2JpZKFkdHlwZWZzdHJpbmdkaXRlbaFlb25lT2aDpWR0eXBlZm9iamVjdGV0aXRsZWtUcmFuc2FjdGlvbmhyZXF1aXJlZIFmdHhIYXNoanByb3BlcnRpZXOtYnRvo2R0eXBlZnN0cmluZ2V0aXRsZWJ0b2tkZXNjcmlwdGlvbm1wYXllZSBhZGRyZXNzZGZyb22jZHR5cGVmc3RyaW5nZXRpdGxlZGZyb21rZGVzY3JpcHRpb25tcGF5ZXIgYWRkcmVzc2V2YWx1ZaNkdHlwZWZzdHJpbmdldGl0bGVldmFsdWVrZGVzY3JpcHRpb25qcGFpZCB2YWx1ZWZ0eEhhc2ijZHR5cGVmc3RyaW5nZXRpdGxlZnR4SGFzaGtkZXNjcmlwdGlvbndoYXNoIG9mIHRoZSB0cmFuc2FjdGlvbmdpc1BheWVyo2R0eXBlZ2Jvb2xlYW5ldGl0bGVnaXNQYXllcmtkZXNjcmlwdGlvbngbd2hldGhlciBvciBub3QgRElEIGlzIHBheWVyaWZpYXRWYWx1ZaNkdHlwZWZzdHJpbmdldGl0bGVldmFsdWVrZGVzY3JpcHRpb254KWZpYXQgcHJpY2UgYXQgdGhlIHRpbWUgb2YgdGhlIHRyYW5zYWN0aW9uaW5ldHdvcmtJZKNkdHlwZWZudW1iZXJldGl0bGVpbmV0d29ya0lka2Rlc2NyaXB0aW9ueB1uZXR3b3JrIGlkIG9mIHRoZSB0cmFuc2FjdGlvbmpmaWF0U3ltYm9so2R0eXBlZnN0cmluZ2V0aXRsZWpmaWF0U3ltYm9sa2Rlc2NyaXB0aW9ueBpjdXJyZW50bHkgb25seSBzdXBwb3J0IFVTRGt0b2tlblN5bWJvbKNkdHlwZWZzdHJpbmdldGl0bGVrdG9rZW5TeW1ib2xrZGVzY3JpcHRpb25xcGFpZCB0b2tlbiBzeW1ib2xsdG9rZW5EZWNpbWFso2R0eXBlZm51bWJlcmV0aXRsZWx0b2tlbkRlY2ltYWxrZGVzY3JpcHRpb25ycGFpZCB0b2tlbiBkZWNpbWFsb2lzc3VlZFRpbWVzdGFtcKNkdHlwZWZzdHJpbmdldGl0bGVvaXNzdWVkVGltZXN0YW1wa2Rlc2NyaXB0aW9ueCRUaW1lIHN0YW1wIG9mIHRyYW5zYWN0aW9uIG9jY3VycmVuY2VvcmVsYXRlZFR4SGFzaGVzpGR0eXBlZWFycmF5ZWl0ZW1zoWR0eXBlZnN0cmluZ2V0aXRsZW9yZWxhdGVkVHhIYXNoZXNrdW5pcXVlSXRlbXP1cHJlbGF0ZWRBZGRyZXNzZXOkZHR5cGVlYXJyYXllaXRlbXOhZHR5cGVmc3RyaW5nZXRpdGxlbnJlbGF0ZWRBZGRyZXNza3VuaXF1ZUl0ZW1z9XRhZGRpdGlvbmFsUHJvcGVydGllc/SjZHR5cGVlYXJyYXllaXRlbXOkZHR5cGVmb2JqZWN0ZXRpdGxlb2RlbGl2ZXJhYmxlSXRlbWpwcm9wZXJ0aWVzomV2YWx1ZaNkdHlwZWZzdHJpbmdldGl0bGVldmFsdWVrZGVzY3JpcHRpb254H3dvcmsgZGVsaXZlcmFibGUgdmFsdWUodXJsL2NpZClmZm9ybWF0o2R0eXBlZnN0cmluZ2V0aXRsZWZmb3JtYXRrZGVzY3JpcHRpb254HmN1cnJlbnQgZm9ybWF0cyBhcmUgdXJsIG9yIGNpZHRhZGRpdGlvbmFsUHJvcGVydGllc/RldGl0bGVsZGVsaXZlcmFibGVzpGR0eXBlZm9iamVjdGV0aXRsZWpzaWduYXR1cmVzanByb3BlcnRpZXOlaGFnZW50U2lno2R0eXBlZnN0cmluZ2V0aXRsZWhhZ2VudFNpZ2tkZXNjcmlwdGlvbnJzaWduYXR1cmUgb2YgYWdlbnRpaG9sZGVyU2lno2R0eXBlZnN0cmluZ2V0aXRsZWlob2xkZXJTaWdrZGVzY3JpcHRpb25zc2lnbmF0dXJlIG9mIGhvbGRlcmpwYXJ0bmVyU2lno2R0eXBlZnN0cmluZ2V0aXRsZWpwYXJ0bmVyU2lna2Rlc2NyaXB0aW9udHNpZ25hdHVyZSBvZiBwYXJ0bmVya2FnZW50U2lnbmVyo2R0eXBlZnN0cmluZ2V0aXRsZWthZ2VudFNpZ25lcmtkZXNjcmlwdGlvbmxESUQgb2YgYWdlbnRtcGFydG5lclNpZ25lcqNkdHlwZWZzdHJpbmdldGl0bGVtcGFydG5lclNpZ25lcmtkZXNjcmlwdGlvbmxESUQgb2YgYWdlbnR0YWRkaXRpb25hbFByb3BlcnRpZXP0ZHR5cGWiZHR5cGVlYXJyYXllaXRlbXOhZHR5cGVmc3RyaW5naHZlcmlmaWVyoWR0eXBlZnN0cmluZ29zdWJqZWN0UHJlc2VuY2WhZHR5cGVmc3RyaW5ncGRvY3VtZW50UHJlc2VuY2WhZHR5cGVmc3RyaW5ncGV2aWRlbmNlRG9jdW1lbnShZHR5cGVmc3RyaW5ndGFkZGl0aW9uYWxQcm9wZXJ0aWVz9WV0aXRsZWlFdmlkZW5jZXNpdXBkYXRlZEF0omR0eXBlZnN0cmluZ2V0aXRsZWl1cGRhdGVkQXRsaXNzdWFuY2VEYXRloWR0eXBlZnN0cmluZ25leHBpcmF0aW9uRGF0ZaFkdHlwZWZzdHJpbmdwY3JlZGVudGlhbFNjaGVtYaRkdHlwZWZvYmplY3RocmVxdWlyZWSCYmlkZHR5cGVqcHJvcGVydGllc6JiaWShZHR5cGVmc3RyaW5nZHR5cGWhZHR5cGVmc3RyaW5ndGFkZGl0aW9uYWxQcm9wZXJ0aWVz9HBjcmVkZW50aWFsU3RhdHVzpGR0eXBlZm9iamVjdGhyZXF1aXJlZIJiaWRkdHlwZWpwcm9wZXJ0aWVzomJpZKFkdHlwZWZzdHJpbmdkdHlwZaFkdHlwZWZzdHJpbmd0YWRkaXRpb25hbFByb3BlcnRpZXP0cWNyZWRlbnRpYWxTdWJqZWN0pGR0eXBlZm9iamVjdGhyZXF1aXJlZIFiaWRqcHJvcGVydGllc6FiaWSiZHR5cGVmc3RyaW5naW1heExlbmd0aBjwdGFkZGl0aW9uYWxQcm9wZXJ0aWVz9XRhZGRpdGlvbmFsUHJvcGVydGllc/RmaGVhZGVyomZ1bmlxdWVwR0JCUDlqSnVtRC8rZ2JWSmtjb250cm9sbGVyc4F4OGRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03",
        },
      ],
      dependencies: {},
      version:
        "k3y52l7qbv1fryb7nwt2un9jf46c3kdchz1kz3c1oy0osti69xzlbafmym8g3dq0w",
    },
    kjzl6cwe1jw149ntddjczkfz281kk1fwqwf2c70b3csq2fuln5h7hkvlro6nwjs: {
      alias: "HeldWorkCredentials",
      commits: [
        {
          jws: {
            payload: "AXESIGmjb_eR8mve01xyo7LDWjRwr7eU7COQX9rn9kvn-NnG",
            signatures: [
              {
                signature:
                  "dI9w_xLOEVR204pfDhOnLxdu5EwBglckxCkQYxWlt_OicIq2VD8L6Kzl6qPFJlhyH10XsWZ1c1laydmORJDlCw",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreidjunx7pepsnppngxdsuozmgwruocx3pfhmeoif7wxh6zf6p6gzyy",
          },
          linkedBlock:
            "omRkYXRhpGR0eXBlZm9iamVjdGV0aXRsZXNIZWxkV29ya0NyZWRlbnRpYWxzZyRzY2hlbWF4J2h0dHA6Ly9qc29uLXNjaGVtYS5vcmcvZHJhZnQtMDcvc2NoZW1hI2pwcm9wZXJ0aWVzoWRoZWxkpGR0eXBlZWFycmF5ZWl0ZW1zpGR0eXBlZnN0cmluZ2dwYXR0ZXJueBxeY2VyYW1pYzovLy4rKFw/dmVyc2lvbj0uKyk/aCRjb21tZW50eFVjaXA4ODpyZWY6Y2VyYW1pYzovL2szeTUybDdxYnYxZnJ4c2ZsN3JxMTVsNDJtNDE4NDMya2duOXkwNWpqcGEwaWh0MXZrYzQ5YnRxN29lZXJ6NmRjaW1heExlbmd0aBjIZ2RlZmF1bHSAdGFkZGl0aW9uYWxQcm9wZXJ0aWVz9GZoZWFkZXKiZnVuaXF1ZXBHb3JQcksrU3dVSzVDdG45a2NvbnRyb2xsZXJzgXg4ZGlkOmtleTp6Nk1rcHptenR4dlBZU0NaOHR6U0NCUWhzUFR4Rml4VWtyekNEaFNLQmJRNlN2bTc=",
        },
      ],
      dependencies: {
        held: [
          "kjzl6cwe1jw146t6x5l3jcj4v8fx7bojr39u3ea27hpy3mnbr1pck848yd9yb4u",
        ],
      },
      version:
        "k3y52l7qbv1frycpcv49ocxdlbt766i94vaj4mpu6vv09dcplwmyd90gqsrzdzgn4",
    },
    kjzl6cwe1jw1476mfxgghpmnlmldpvmcuegdbah1fnjmdzip2q5tv3p4wsujaib: {
      alias: "HeldVerifiableWorkCredentials",
      commits: [
        {
          jws: {
            payload: "AXESIJObY3FB4JRk1UYAOQ7BQtLriKJ3_TesBeIWEbd_UU2m",
            signatures: [
              {
                signature:
                  "PXVA0ir6F41qmB8q1fhtO-YqtS5ml6zQafDPsr5x5TQ0AQu_S8pgrdNi64FyLKYhVelH_L9lx6p7LfEz_j-BDw",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreiettnrxcqpasrsnkrqahehmcqws5oeke575g6walyqwcg3x6uknuy",
          },
          linkedBlock:
            "omRkYXRhpGR0eXBlZm9iamVjdGV0aXRsZXgdSGVsZFZlcmlmaWFibGVXb3JrQ3JlZGVudGlhbHNnJHNjaGVtYXgnaHR0cDovL2pzb24tc2NoZW1hLm9yZy9kcmFmdC0wNy9zY2hlbWEjanByb3BlcnRpZXOhZGhlbGSkZHR5cGVlYXJyYXllaXRlbXOkZHR5cGVmc3RyaW5nZ3BhdHRlcm54HF5jZXJhbWljOi8vLisoXD92ZXJzaW9uPS4rKT9oJGNvbW1lbnR4VWNpcDg4OnJlZjpjZXJhbWljOi8vazN5NTJsN3FidjFmcnliN253dDJ1bjlqZjQ2YzNrZGNoejFrejNjMW95MG9zdGk2OXh6bGJhZm15bThnM2RxMHdpbWF4TGVuZ3RoGMhnZGVmYXVsdIB0YWRkaXRpb25hbFByb3BlcnRpZXP0ZmhlYWRlcqJmdW5pcXVlcDh5ZmtvVjlMN1BsRkwwdEdrY29udHJvbGxlcnOBeDhkaWQ6a2V5Ono2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNw==",
        },
      ],
      dependencies: {
        held: [
          "kjzl6cwe1jw149g9jsu7ona1k9w2r1vkiznrfnmqkj7zjwd99ubfneknzr29h48",
        ],
      },
      version:
        "k3y52l7qbv1frxv33l9x19y93tso1k0uzc6seoah67bfj7gkybe1gd6aqx9556q68",
    },
    kjzl6cwe1jw145t2ryyl34h950spsymbyv2kxca8vkks6b4bwh59hosoc6d9irc: {
      alias: "Organization",
      commits: [
        {
          jws: {
            payload: "AXESIHn40kHaWL-bT48XI7ZcLK55-UhTUHfp1h_ecoInNsUV",
            signatures: [
              {
                signature:
                  "hVzv4OWz6be-srDufhjExYWTqh1JCKNxdz0ZItAuWuOH0KrxoyOc0yTUOEs_2P93oG-JCLdYtM1i70Xkm-ZeBA",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreidz7djedwsyx6nu7dyxeo3fylfoph4uqu2qo7u5mh66okbconwfcu",
          },
          linkedBlock:
            "omRkYXRhpmR0eXBlZm9iamVjdGV0aXRsZWxPcmdhbml6YXRpb25nJHNjaGVtYXgnaHR0cDovL2pzb24tc2NoZW1hLm9yZy9kcmFmdC0wNy9zY2hlbWEjaHJlcXVpcmVkgmVhZG1pbmRuYW1lanByb3BlcnRpZXOmZGRlc2OiZHR5cGVmc3RyaW5nZXRpdGxlZGRlc2NkaWNvbqJkdHlwZWZzdHJpbmdldGl0bGVkaWNvbmRuYW1lo2R0eXBlZnN0cmluZ2V0aXRsZWRuYW1laW1heExlbmd0aBjwZWFkbWluo2R0eXBlZnN0cmluZ2V0aXRsZWVhZG1pbmltYXhMZW5ndGgY8GljcmVhdGVkQXSiZHR5cGVmc3RyaW5nZXRpdGxlaWNyZWF0ZWRBdHJvcmJpc1NvY2lhbEdyb3VwSWSiZHR5cGVmc3RyaW5nZXRpdGxlcm9yYmlzU29jaWFsR3JvdXBJZHRhZGRpdGlvbmFsUHJvcGVydGllc/VmaGVhZGVyomZ1bmlxdWVwTlg0Q3NTQ1VNd0hiT0FHbWtjb250cm9sbGVyc4F4OGRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03",
        },
      ],
      dependencies: {},
      version:
        "k3y52l7qbv1frxlarqwlxy7uozpo7hy6t3wyct3cv4ibscv2smxxfhsbx2labpedc",
    },
    kjzl6cwe1jw149608rdaf2w287undgfpzmblrkbt2tat3boqzyn1qa65r9nw9rf: {
      alias: "MemberShip",
      commits: [
        {
          jws: {
            payload: "AXESINjMxEpR-K2Vwhxju_ei-Gl-UjvmohGjwBg-qQoAWSUm",
            signatures: [
              {
                signature:
                  "HoJqsOlpuCjOoI9XJbsq71O0s2dfsgg5lQ0Aa1yuJ3wrjxXhhYqj81HBW321vzKLTFMVkbljvJNFytfzpPBUBw",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreigyztceuupyvwk4ehddxp32f6djpzjdxzvccgr4agb6vefaawjfey",
          },
          linkedBlock:
            "omRkYXRhpmR0eXBlZm9iamVjdGV0aXRsZWpNZW1iZXJzaGlwZyRzY2hlbWF4J2h0dHA6Ly9qc29uLXNjaGVtYS5vcmcvZHJhZnQtMDcvc2NoZW1hI2hyZXF1aXJlZIJub3JnYW5pemF0aW9uSWRkbmFtZWpwcm9wZXJ0aWVzpWRkZXNjomR0eXBlZnN0cmluZ2V0aXRsZWRkZXNjZGljb26iZHR5cGVmc3RyaW5nZXRpdGxlZGljb25kbmFtZaNkdHlwZWZzdHJpbmdldGl0bGVkbmFtZWltYXhMZW5ndGgY8GljcmVhdGVkQXSiZHR5cGVmc3RyaW5nZXRpdGxlaWNyZWF0ZWRBdG5vcmdhbml6YXRpb25JZKNkdHlwZWZzdHJpbmdldGl0bGVub3JnYW5pemF0aW9uSWRpbWF4TGVuZ3RoGPB0YWRkaXRpb25hbFByb3BlcnRpZXP1ZmhlYWRlcqJmdW5pcXVlcEYrcDdLSEhlQzhVNzU4OEZrY29udHJvbGxlcnOBeDhkaWQ6a2V5Ono2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNw==",
        },
      ],
      dependencies: {},
      version:
        "k3y52l7qbv1fry96pqami38jzufty7ovstaqis0jys0cuvn3zzqbwawbsxwpxheyo",
    },
    kjzl6cwe1jw146bf1pmkic9tw5ab4k4xch46aa1z4oalw7dboyinfjj05k4m69q: {
      alias: "MembershipSubject",
      commits: [
        {
          jws: {
            payload: "AXESIHZOBzkXaJZqV5oPP6cORgS67GbNi3OPuIN6pW7jYZYQ",
            signatures: [
              {
                signature:
                  "CWA1d4axd22BfJ1v3dJKdAgoL0DkYWZ6s_9I5tarnmspVEQMekb4Qh65U8BXtFjachyuKiGEv5kqplExpoMhBw",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreidwjydtsf3iszvfpgqph6tq4rqexlwgntmlooh3ra32uvxogymwca",
          },
          linkedBlock:
            "omRkYXRhpmR0eXBlZm9iamVjdGV0aXRsZXFNZW1iZXJzaGlwU3ViamVjdGckc2NoZW1heCdodHRwOi8vanNvbi1zY2hlbWEub3JnL2RyYWZ0LTA3L3NjaGVtYSNocmVxdWlyZWSDYmlkbm9yZ2FuaXphdGlvbklkbG1lbWJlcnNoaXBJZGpwcm9wZXJ0aWVzo2JpZKNkdHlwZWZzdHJpbmdldGl0bGViaWRpbWF4TGVuZ3RoGPBsbWVtYmVyc2hpcElko2R0eXBlZnN0cmluZ2V0aXRsZWxtZW1iZXJzaGlwSWRpbWF4TGVuZ3RoGPBub3JnYW5pemF0aW9uSWSjZHR5cGVmc3RyaW5nZXRpdGxlbm9yZ2FuaXphdGlvbklkaW1heExlbmd0aBjwdGFkZGl0aW9uYWxQcm9wZXJ0aWVz9WZoZWFkZXKiZnVuaXF1ZXBaZ01BeFNSVFFWMXptdVFka2NvbnRyb2xsZXJzgXg4ZGlkOmtleTp6Nk1rcHptenR4dlBZU0NaOHR6U0NCUWhzUFR4Rml4VWtyekNEaFNLQmJRNlN2bTc=",
        },
      ],
      dependencies: {},
      version:
        "k3y52l7qbv1frxox7068huf9wkllb4f714ppop3i1t8rfp0er5hgmmiv53j4tol4w",
    },
    kjzl6cwe1jw14b1kmgqiyprszzuuia98jumgogjwgjwxvgucgdh4dgmoymkn22i: {
      alias: "VerifiableMembershipSubjectCredential",
      commits: [
        {
          jws: {
            payload: "AXESIPVsrCUsaaEHUARLX_AGmmUGH4iLwO42ok288VXCHWHw",
            signatures: [
              {
                signature:
                  "VneRTDYflXtFqaIAdLGDLDyWOk6OxqHSAbkVka5s0e511okGrS1482KK5t2TGj50kbH1t9wAG-2j_Jx4yyJTBw",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreihvnswckldjuedvabcll7yangtfaypyrc6a5y3ketn46fk4ehlb6a",
          },
          linkedBlock:
            "omRkYXRhpmR0eXBlZm9iamVjdGV0aXRsZXglVmVyaWZpYWJsZU1lbWJlcnNoaXBTdWJqZWN0Q3JlZGVudGlhbGckc2NoZW1heCdodHRwOi8vanNvbi1zY2hlbWEub3JnL2RyYWZ0LTA3L3NjaGVtYSNocmVxdWlyZWSHaEBjb250ZXh0ZHR5cGViaWRmaXNzdWVycWNyZWRlbnRpYWxTdWJqZWN0cGNyZWRlbnRpYWxTY2hlbWFsaXNzdWFuY2VEYXRlanByb3BlcnRpZXOsYmlkomR0eXBlZnN0cmluZ2ltYXhMZW5ndGgY8GR0eXBlomR0eXBlZWFycmF5ZWl0ZW1zoWR0eXBlZnN0cmluZ2Vwcm9vZqNkdHlwZWZvYmplY3RocmVxdWlyZWSBZHR5cGVqcHJvcGVydGllc6dkdHlwZaFkdHlwZWZzdHJpbmdmZWlwNzEypGR0eXBlZm9iamVjdGhyZXF1aXJlZINmZG9tYWluZXR5cGVza3ByaW1hcnlUeXBlanByb3BlcnRpZXOjZXR5cGVzoWR0eXBlZm9iamVjdGZkb21haW6kZHR5cGVmb2JqZWN0aHJlcXVpcmVkg2djaGFpbklkZG5hbWVndmVyc2lvbmpwcm9wZXJ0aWVzpGRuYW1loWR0eXBlZnN0cmluZ2djaGFpbklkoWR0eXBlZ2ludGVnZXJndmVyc2lvbqFkdHlwZWZzdHJpbmdxdmVyaWZ5aW5nQ29udHJhY3ShZHR5cGVmc3RyaW5ndGFkZGl0aW9uYWxQcm9wZXJ0aWVz9GtwcmltYXJ5VHlwZaFkdHlwZWZzdHJpbmd0YWRkaXRpb25hbFByb3BlcnRpZXP0Z2NyZWF0ZWShZHR5cGVmc3RyaW5nanByb29mVmFsdWWhZHR5cGVmc3RyaW5nbHByb29mUHVycG9zZaFkdHlwZWZzdHJpbmdvZXRoZXJldW1BZGRyZXNzoWR0eXBlZnN0cmluZ3J2ZXJpZmljYXRpb25NZXRob2ShZHR5cGVmc3RyaW5nZmlzc3VlcqNkdHlwZWZvYmplY3RocmVxdWlyZWSBYmlkanByb3BlcnRpZXOiYmlkoWR0eXBlZnN0cmluZ29ldGhlcmV1bUFkZHJlc3OhZHR5cGVmc3RyaW5naEBjb250ZXh0omR0eXBlZWFycmF5ZWl0ZW1zoWR0eXBlZnN0cmluZ2hldmlkZW5jZaNkdHlwZWVhcnJheWVpdGVtc6VkdHlwZWZvYmplY3RldGl0bGVtQmFzaWNFdmlkZW5jZWhyZXF1aXJlZIJiaWRkdHlwZWpwcm9wZXJ0aWVzp2JpZKFkdHlwZWZzdHJpbmdkaXRlbaFkdHlwZWZvYmplY3RkdHlwZaJkdHlwZWVhcnJheWVpdGVtc6FkdHlwZWZzdHJpbmdodmVyaWZpZXKhZHR5cGVmc3RyaW5nb3N1YmplY3RQcmVzZW5jZaFkdHlwZWZzdHJpbmdwZG9jdW1lbnRQcmVzZW5jZaFkdHlwZWZzdHJpbmdwZXZpZGVuY2VEb2N1bWVudKFkdHlwZWZzdHJpbmd0YWRkaXRpb25hbFByb3BlcnRpZXP1ZXRpdGxlbkJhc2ljRXZpZGVuY2VzaXVwZGF0ZWRBdKJkdHlwZWZzdHJpbmdldGl0bGVpdXBkYXRlZEF0bGlzc3VhbmNlRGF0ZaFkdHlwZWZzdHJpbmduZXhwaXJhdGlvbkRhdGWhZHR5cGVmc3RyaW5ncGNyZWRlbnRpYWxTY2hlbWGkZHR5cGVmb2JqZWN0aHJlcXVpcmVkgmJpZGR0eXBlanByb3BlcnRpZXOiYmlkoWR0eXBlZnN0cmluZ2R0eXBloWR0eXBlZnN0cmluZ3RhZGRpdGlvbmFsUHJvcGVydGllc/RwY3JlZGVudGlhbFN0YXR1c6RkdHlwZWZvYmplY3RocmVxdWlyZWSCYmlkZHR5cGVqcHJvcGVydGllc6JiaWShZHR5cGVmc3RyaW5nZHR5cGWhZHR5cGVmc3RyaW5ndGFkZGl0aW9uYWxQcm9wZXJ0aWVz9HFjcmVkZW50aWFsU3ViamVjdKVkdHlwZWZvYmplY3RldGl0bGV4G1ZlcmlmaWFibGVNZW1iZXJzaGlwU3ViamVjdGhyZXF1aXJlZINiaWRwb3JnYW5pemF0aW9uTmFtZW5tZW1iZXJzaGlwTmFtZWpwcm9wZXJ0aWVzp2JpZKJkdHlwZWZzdHJpbmdpbWF4TGVuZ3RoGPBsbWVtYmVyc2hpcElko2R0eXBlZnN0cmluZ2V0aXRsZWxtZW1iZXJzaGlwSWRpbWF4TGVuZ3RoGPBubWVtYmVyc2hpcEljb26iZHR5cGVmc3RyaW5nZXRpdGxlZGljb25ubWVtYmVyc2hpcE5hbWWjZHR5cGVmc3RyaW5nZXRpdGxlbm1lbWJlcnNoaXBOYW1laW1heExlbmd0aBjwbm9yZ2FuaXphdGlvbklko2R0eXBlZnN0cmluZ2V0aXRsZW5vcmdhbml6YXRpb25JZGltYXhMZW5ndGgY8HBvcmdhbml6YXRpb25JY29uomR0eXBlZnN0cmluZ2V0aXRsZWRpY29ucG9yZ2FuaXphdGlvbk5hbWWjZHR5cGVmc3RyaW5nZXRpdGxlcG9yZ2FuaXphdGlvbk5hbWVpbWF4TGVuZ3RoGPB0YWRkaXRpb25hbFByb3BlcnRpZXP1dGFkZGl0aW9uYWxQcm9wZXJ0aWVz9GZoZWFkZXKiZnVuaXF1ZXBFMzl6emJzbjlVVmFGQllJa2NvbnRyb2xsZXJzgXg4ZGlkOmtleTp6Nk1rcHptenR4dlBZU0NaOHR6U0NCUWhzUFR4Rml4VWtyekNEaFNLQmJRNlN2bTc=",
        },
      ],
      dependencies: {},
      version:
        "k3y52l7qbv1frymj6nr0muv9q7yzcy0xot5rqlxpitpm8vrrskftr3q9di8iryps0",
    },
    kjzl6cwe1jw14b15tach4fz5wcbcasj44k8cv7fr5k216guw5lkxzdzjllr2say: {
      alias: "CreatedOrganizations",
      commits: [
        {
          jws: {
            payload: "AXESIIH0tyMw66fH7S0cAsw0bW12HrSowtEPtAsjezW845gB",
            signatures: [
              {
                signature:
                  "z1OS0YHBFbCKMqDcBEjpQZvvqo9hCGAPvat3YMvvPUMXih4dyVD-m9HPxW-c7G78XWWAZbQ6q4yELjowGsC_Cw",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreieb6s3sgmhlu7d62li4algdi3lnoypljkgc2eh3iczdpm23zy4yae",
          },
          linkedBlock:
            "omRkYXRhpGR0eXBlZm9iamVjdGV0aXRsZXRDcmVhdGVkT3JnYW5pemF0aW9uc2ckc2NoZW1heCdodHRwOi8vanNvbi1zY2hlbWEub3JnL2RyYWZ0LTA3L3NjaGVtYSNqcHJvcGVydGllc6FnY3JlYXRlZKRkdHlwZWVhcnJheWVpdGVtc6RkdHlwZWZzdHJpbmdncGF0dGVybngcXmNlcmFtaWM6Ly8uKyhcP3ZlcnNpb249LispP2gkY29tbWVudHhVY2lwODg6cmVmOmNlcmFtaWM6Ly9rM3k1Mmw3cWJ2MWZyeGxhcnF3bHh5N3VvenBvN2h5NnQzd3ljdDNjdjRpYnNjdjJzbXh4ZmhzYngybGFicGVkY2ltYXhMZW5ndGgYyGdkZWZhdWx0gHRhZGRpdGlvbmFsUHJvcGVydGllc/RmaGVhZGVyomZ1bmlxdWVwKzZjSXlKd0lnYmRFMVRUbWtjb250cm9sbGVyc4F4OGRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03",
        },
      ],
      dependencies: {
        created: [
          "kjzl6cwe1jw145t2ryyl34h950spsymbyv2kxca8vkks6b4bwh59hosoc6d9irc",
        ],
      },
      version:
        "k3y52l7qbv1frymg9c9kprlm1xzkngqvxcfvfhww13imgdzvontgxnngrdmojt9ts",
    },
    kjzl6cwe1jw1488lmq1uxfnzm9thowz6jno4y2xfalqp2kkecjb1v499eisvldn: {
      alias: "CreatedMemberships",
      commits: [
        {
          jws: {
            payload: "AXESIF_RWfxe4kFe6Kqem-F8voQIDiPodOQ3tStlpkxT84lH",
            signatures: [
              {
                signature:
                  "fikgOGr1QYJ8Cz6yzzOTryA60yzDXwmkDv43PP3rNvKpAaVUqLUFnT0S2d6c_Lon1Z9qCQ6bGRJRmPJGKkupDQ",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreic72fm7yxxcifporku6tpqxzpuebahch2du4q33kk3fuzgfh44ji4",
          },
          linkedBlock:
            "omRkYXRhpGR0eXBlZm9iamVjdGV0aXRsZXJDcmVhdGVkTWVtYmVyc2hpcHNnJHNjaGVtYXgnaHR0cDovL2pzb24tc2NoZW1hLm9yZy9kcmFmdC0wNy9zY2hlbWEjanByb3BlcnRpZXOhZ2NyZWF0ZWSkZHR5cGVlYXJyYXllaXRlbXOkZHR5cGVmc3RyaW5nZ3BhdHRlcm54HF5jZXJhbWljOi8vLisoXD92ZXJzaW9uPS4rKT9oJGNvbW1lbnR4VWNpcDg4OnJlZjpjZXJhbWljOi8vazN5NTJsN3FidjFmcnk5NnBxYW1pMzhqenVmdHk3b3ZzdGFxaXMwanlzMGN1dm4zenpxYndhd2JzeHdweGhleW9pbWF4TGVuZ3RoGMhnZGVmYXVsdIB0YWRkaXRpb25hbFByb3BlcnRpZXP0ZmhlYWRlcqJmdW5pcXVlcGU0OEFQdzdpY08wMEk1T3FrY29udHJvbGxlcnOBeDhkaWQ6a2V5Ono2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNw==",
        },
      ],
      dependencies: {
        created: [
          "kjzl6cwe1jw149608rdaf2w287undgfpzmblrkbt2tat3boqzyn1qa65r9nw9rf",
        ],
      },
      version:
        "k3y52l7qbv1fry2l5tl97xreladtpt6i6jsbn6ctoreluaa9215al9a9uv9pco0zk",
    },
    kjzl6cwe1jw145o7jc9qapnj85e3zozj9fjys2dgdb6qblslhy6lc8tdj7jv450: {
      alias: "CreatedMembershipSubjects",
      commits: [
        {
          jws: {
            payload: "AXESIDuxbQgotfl2YRty7mIVhpTLCQIknhm9TISrAoPvesEO",
            signatures: [
              {
                signature:
                  "vVU4tNWrj-MoIIDaoyFWtR3H6RFAMeUhLdexn8BurnFhUc9JwaftflkoXKh0zsimSyC_qPuv-JQ_g6J3hJ6ACg",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreib3wfwqqkfv7f3gcg3s5zrblbuuzmeqeje6dg6uzbflakb666wbby",
          },
          linkedBlock:
            "omRkYXRhpGR0eXBlZm9iamVjdGV0aXRsZXgZQ3JlYXRlZE1lbWJlcnNoaXBTdWJqZWN0c2ckc2NoZW1heCdodHRwOi8vanNvbi1zY2hlbWEub3JnL2RyYWZ0LTA3L3NjaGVtYSNqcHJvcGVydGllc6FnY3JlYXRlZKRkdHlwZWVhcnJheWVpdGVtc6RkdHlwZWZzdHJpbmdncGF0dGVybngcXmNlcmFtaWM6Ly8uKyhcP3ZlcnNpb249LispP2gkY29tbWVudHhVY2lwODg6cmVmOmNlcmFtaWM6Ly9rM3k1Mmw3cWJ2MWZyeG94NzA2OGh1Zjl3a2xsYjRmNzE0cHBvcDNpMXQ4cmZwMGVyNWhnbW1pdjUzajR0b2w0d2ltYXhMZW5ndGgYyGdkZWZhdWx0gHRhZGRpdGlvbmFsUHJvcGVydGllc/RmaGVhZGVyomZ1bmlxdWVwc0E4MDY3S3RFd0FLS2ZSRGtjb250cm9sbGVyc4F4OGRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03",
        },
      ],
      dependencies: {
        created: [
          "kjzl6cwe1jw146bf1pmkic9tw5ab4k4xch46aa1z4oalw7dboyinfjj05k4m69q",
        ],
      },
      version:
        "k3y52l7qbv1frxkc5lj9706fcpyccdtooz2lzbkvoenjv6izcvn2vr2ow8lp99fk0",
    },
    kjzl6cwe1jw147r4w0nyvqzy8ww6am6rfvclov56nt8ja4rhx37d6txzf5b2nkt: {
      alias: "IssuedVerifiableMembershipSubjects",
      commits: [
        {
          jws: {
            payload: "AXESIBt05EID8h0sgU7R1ZRkWpry_RNjkYf8rGpjHOUnShke",
            signatures: [
              {
                signature:
                  "3mygHklq7pbNfK3bYWXBwXt6iA1rBfmOfsmqOgaYpNZVFLfAE5rQd_X-eBCTpV-YFNI8n4suLePMib2uX8rMAg",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreia3otseea7sduwictwr2wkgiwu26l6rgy4rq76ky2tddtssosqzdy",
          },
          linkedBlock:
            "omRkYXRhpGR0eXBlZm9iamVjdGV0aXRsZXgiSXNzdWVkVmVyaWZpYWJsZU1lbWJlcnNoaXBTdWJqZWN0c2ckc2NoZW1heCdodHRwOi8vanNvbi1zY2hlbWEub3JnL2RyYWZ0LTA3L3NjaGVtYSNqcHJvcGVydGllc6FmaXNzdWVkpGR0eXBlZWFycmF5ZWl0ZW1zpGR0eXBlZnN0cmluZ2dwYXR0ZXJueBxeY2VyYW1pYzovLy4rKFw/dmVyc2lvbj0uKyk/aCRjb21tZW50eFVjaXA4ODpyZWY6Y2VyYW1pYzovL2szeTUybDdxYnYxZnJ5bWo2bnIwbXV2OXE3eXpjeTB4b3Q1cnFseHBpdHBtOHZycnNrZnRyM3E5ZGk4aXJ5cHMwaW1heExlbmd0aBjIZ2RlZmF1bHSAdGFkZGl0aW9uYWxQcm9wZXJ0aWVz9GZoZWFkZXKiZnVuaXF1ZXAraCtIRnI4cFY4RGlsVWlra2NvbnRyb2xsZXJzgXg4ZGlkOmtleTp6Nk1rcHptenR4dlBZU0NaOHR6U0NCUWhzUFR4Rml4VWtyekNEaFNLQmJRNlN2bTc=",
        },
      ],
      dependencies: {
        issued: [
          "kjzl6cwe1jw14b1kmgqiyprszzuuia98jumgogjwgjwxvgucgdh4dgmoymkn22i",
        ],
      },
      version:
        "k3y52l7qbv1frxz4yroqg1rznjdwsrhs34uxm8tgvdbwp41vjfasdskxnvpqqvny8",
    },
    kjzl6cwe1jw14an9sqr3gxutqoccn5lumzus7c7dub56lhpb19va7bia1kwbhtc: {
      alias: "HeldVerifiableMembershipSubjects",
      commits: [
        {
          jws: {
            payload: "AXESIJDhDxbCA5c-fqj5011u0kU6OVhW1qM8ChURp64XSEpK",
            signatures: [
              {
                signature:
                  "GmlxC37VzasI0k581pjyt7DYPl4sKzjlFCO82XZr20XES300wUaX8V0UtKF0EEDpFdPXCrAMCBdo8SeB3cE2AA",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreieq4ehrnqqds47h5khz2now5usfhi4vqvwwum6aufiru6xbosckji",
          },
          linkedBlock:
            "omRkYXRhpGR0eXBlZm9iamVjdGV0aXRsZXggSGVsZFZlcmlmaWFibGVNZW1iZXJzaGlwU3ViamVjdHNnJHNjaGVtYXgnaHR0cDovL2pzb24tc2NoZW1hLm9yZy9kcmFmdC0wNy9zY2hlbWEjanByb3BlcnRpZXOhZGhlbGSkZHR5cGVlYXJyYXllaXRlbXOkZHR5cGVmc3RyaW5nZ3BhdHRlcm54HF5jZXJhbWljOi8vLisoXD92ZXJzaW9uPS4rKT9oJGNvbW1lbnR4VWNpcDg4OnJlZjpjZXJhbWljOi8vazN5NTJsN3FidjFmcnltajZucjBtdXY5cTd5emN5MHhvdDVycWx4cGl0cG04dnJyc2tmdHIzcTlkaThpcnlwczBpbWF4TGVuZ3RoGMhnZGVmYXVsdIB0YWRkaXRpb25hbFByb3BlcnRpZXP0ZmhlYWRlcqJmdW5pcXVlcHRHTW1pNkM3K1MvWXV2dVNrY29udHJvbGxlcnOBeDhkaWQ6a2V5Ono2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNw==",
        },
      ],
      dependencies: {
        held: [
          "kjzl6cwe1jw14b1kmgqiyprszzuuia98jumgogjwgjwxvgucgdh4dgmoymkn22i",
        ],
      },
      version:
        "k3y52l7qbv1fryjphoe8oogr7hp3twnvdviywk6sifj8uwtvyh26gk1tzf8ltqolc",
    },
  },
  definitions: {
    kjzl6cwe1jw145cjbeko9kil8g9bxszjhyde21ob8epxuxkaon1izyqsu8wgcic: {
      alias: "basicProfile",
      commits: [
        {
          jws: {
            payload: "AXESIHQlyxvLYuiHGvjCREWnS0HxQV6z7lfPRe4mRdViHjWU",
            signatures: [
              {
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3NOWUU2V3RNWjNXTGJQd2NwOUdtN2RUN0ozRHNOUDhhdVFOblBwUUJ1MzdBI3o2TWtzTllFNld0TVozV0xiUHdjcDlHbTdkVDdKM0RzTlA4YXVRTm5QcFFCdTM3QSJ9",
                signature:
                  "619cILy5j-zkYwz0pJ2cYnPnVqmYf6YJcuqxcLoaRqvCL341HOoTm0siEOG_Jmu1alT_UUuah1dlrqubgIe1BA",
              },
            ],
            link: "bafyreiduexfrxs3c5cdrv6gcirc2os2b6fav5m7ok7hul3rgixkwehrvsq",
          },
          linkedBlock:
            "o2RkYXRho2RuYW1lbUJhc2ljIFByb2ZpbGVmc2NoZW1heEtjZXJhbWljOi8vazN5NTJsN3FidjFmcnh0NzA2Z3Fmem1xNmNicWRrcHR6azh1dWRhcnlobGtmNmx5OXZ4MjFocXU0cjZrMWpxaW9rZGVzY3JpcHRpb254I0Jhc2ljIHByb2ZpbGUgaW5mb3JtYXRpb24gZm9yIGEgRElEZmhlYWRlcqJmc2NoZW1heEtjZXJhbWljOi8vazN5NTJsN3FidjFmcnkxZnA0czBud2RhcmgwdmFodXNhcnBwb3NnZXZ5MHBlbWl5a3ltZDJvcmQ2c3d0aGFyY3drY29udHJvbGxlcnOBeDhkaWQ6a2V5Ono2TWtzTllFNld0TVozV0xiUHdjcDlHbTdkVDdKM0RzTlA4YXVRTm5QcFFCdTM3QWdkb2N0eXBlZHRpbGU=",
        },
      ],
      schema: "kjzl6cwe1jw146x1pnq7vg4t0lwea84s2a8u58tt1clfmv7mrju3l2341klxyu6",
      version:
        "k3y52l7qbv1frxi15d3n0k1w703mcwe4qnof7yjwvvsogryobz7uv3r2l33as8ydc",
    },
    kjzl6cwe1jw149z4rvwzi56mjjukafta30kojzktd9dsrgqdgz4wlnceu59f95f: {
      alias: "cryptoAccounts",
      commits: [
        {
          jws: {
            payload: "AXESIILyy1_0_U8dXhlxpyWOMxBDKion3W2mMbfS5WmuL-Xb",
            signatures: [
              {
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3NOWUU2V3RNWjNXTGJQd2NwOUdtN2RUN0ozRHNOUDhhdVFOblBwUUJ1MzdBI3o2TWtzTllFNld0TVozV0xiUHdjcDlHbTdkVDdKM0RzTlA4YXVRTm5QcFFCdTM3QSJ9",
                signature:
                  "IKbedepBBpEdE9DKx6WjCYYyFdo9mfgv422_vLlT8vusBGM-P7YiEn6t3iYHrMi-dzrnE4Lp8wY0aqhFnDuWCA",
              },
            ],
            link: "bafyreiec6lfv75h5j4ov4glru4sy4myqimvcuj65nwtddn6s4vu24l7f3m",
          },
          linkedBlock:
            "o2RkYXRho2RuYW1lb0NyeXB0byBBY2NvdW50c2ZzY2hlbWF4S2NlcmFtaWM6Ly9rM3k1Mmw3cWJ2MWZyeXB1c3NqYnVycWc0ZnlreXl5Y2Z1MHA5em5jNzVsdjJ0NWNnNHhhc2xoYWdrZDdoN21rZ2tkZXNjcmlwdGlvbngiQ3J5cHRvIGFjY291bnRzIGxpbmtlZCB0byB5b3VyIERJRGZoZWFkZXKiZnNjaGVtYXhLY2VyYW1pYzovL2szeTUybDdxYnYxZnJ5MWZwNHMwbndkYXJoMHZhaHVzYXJwcG9zZ2V2eTBwZW1peWt5bWQyb3JkNnN3dGhhcmN3a2NvbnRyb2xsZXJzgXg4ZGlkOmtleTp6Nk1rc05ZRTZXdE1aM1dMYlB3Y3A5R203ZFQ3SjNEc05QOGF1UU5uUHBRQnUzN0FnZG9jdHlwZWR0aWxl",
        },
      ],
      schema: "kjzl6cwe1jw14bie69guriwn4hsto1gdh5q1ytpwi84xkz2b9oxkw9qs7d3v3vv",
      version:
        "k3y52l7qbv1fryextyaykh0v4b15ca8g7pg32m500uaq4jazjspuvty09idf0h2io",
    },
    kjzl6cwe1jw146zfmqa10a5x1vry6au3t362p44uttz4l0k4hi88o41zplhmxnf: {
      alias: "alsoKnownAs",
      commits: [
        {
          jws: {
            payload: "AXESIOWmE0CF2MHEz0PmBVBOkCvzCVXNE5Mg-894RRaXaZJe",
            signatures: [
              {
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3NOWUU2V3RNWjNXTGJQd2NwOUdtN2RUN0ozRHNOUDhhdVFOblBwUUJ1MzdBI3o2TWtzTllFNld0TVozV0xiUHdjcDlHbTdkVDdKM0RzTlA4YXVRTm5QcFFCdTM3QSJ9",
                signature:
                  "GurUQxUEzBdidKjlPdv09NLD-aG787p47ghUMW2PA5av49soVKe3I4xntq4OzXHXm-weLzuMFUFxkURvgUDuAA",
              },
            ],
            link: "bafyreihfuyjubboyyhcm6q7gavie5ebl6mevltitsmqpxt3yiuljo2msly",
          },
          linkedBlock:
            "o2RkYXRho2RuYW1lbUFsc28gS25vd24gQXNmc2NoZW1heEtjZXJhbWljOi8vazN5NTJsN3FidjFmcnlvanQ4bjhjdzJrMDRwOXdwNjdseTU5aXdxczY1ZGVqc281NjZmaWo1d3NkcmI4NzF5aW9rZGVzY3JpcHRpb254ZEFsc28gS25vd24gQXMgaXMgYSBkYXRhIHNldCB0aGF0IHN0b3JlcyBhIGxpc3Qgb2YgYWNjb3VudHMgdGhhdCBhcmUgcHVibGljbHkgbGlua2VkIHRvIHRoZSB1c2VycyBESURmaGVhZGVyomZzY2hlbWF4S2NlcmFtaWM6Ly9rM3k1Mmw3cWJ2MWZyeTFmcDRzMG53ZGFyaDB2YWh1c2FycHBvc2dldnkwcGVtaXlreW1kMm9yZDZzd3RoYXJjd2tjb250cm9sbGVyc4F4OGRpZDprZXk6ejZNa3NOWUU2V3RNWjNXTGJQd2NwOUdtN2RUN0ozRHNOUDhhdVFOblBwUUJ1MzdBZ2RvY3R5cGVkdGlsZQ==",
        },
      ],
      schema: "kjzl6cwe1jw14bbsas0m29cxrnsyesfp0v45gz9l44p3wpw86j21kio8onil8po",
      version:
        "k3y52l7qbv1frxtnz5mvb60a31dyr0t232uj76lej855slfz3whmlngu5y0tf3aio",
    },
    kjzl6cwe1jw1491q8fzv2iy6qk20bi4y2deifkxut9njnuztq822duslj2m3wuv: {
      alias: "OldWorkCredential",
      commits: [
        {
          jws: {
            payload: "AXESICnJ_8dSganKVK5Ip-FKrX8Rsz-zqckA8VRRAW465xIh",
            signatures: [
              {
                signature:
                  "gc-xPn6q9FYeUhmU42OISvEAhM62Za9rovYz4gL7vW8dYl1YM7NTBrzfYUhopA4gOn-vT_I6f5HhcpfcpFPDAg",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreibjzh74ouubvhffjlsiu7quvll7cgzt7m5jzeapcvcrafxdvzysee",
          },
          linkedBlock:
            "omRkYXRho2RuYW1lbndvcmtDcmVkZW50aWFsZnNjaGVtYXhLY2VyYW1pYzovL2szeTUybDdxYnYxZnJ4bHFub3B3aGwydHBudzRpbmF3dDd1cG92Y3I3ZDBkcXR3czV0OXRuOTlwaWdnN2VobHZra2Rlc2NyaXB0aW9ubndvcmtDcmVkZW50aWFsZmhlYWRlcqNmc2NoZW1heEtjZXJhbWljOi8vazN5NTJsN3FidjFmcnkxZnA0czBud2RhcmgwdmFodXNhcnBwb3NnZXZ5MHBlbWl5a3ltZDJvcmQ2c3d0aGFyY3dmdW5pcXVlcFNkMTg4MHAzcWZ5TndFUGFrY29udHJvbGxlcnOBeDhkaWQ6a2V5Ono2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNw==",
        },
      ],
      schema: "kjzl6cwe1jw145vb7ew4q0yjx67dvegzlx08k5qbq0m6l2x7kffzbzoeeos1h3n",
      version:
        "k3y52l7qbv1fry8cak1r0xyr3wuma9sz68vb72swr44nftoerehaoyizd3ml7tngg",
    },
    kjzl6cwe1jw1468dfi4s2xvft87skxxlp43pz9sscd897fw1zbl1k507u6z7pqv: {
      alias: "OldWorkCredentials",
      commits: [
        {
          jws: {
            payload: "AXESIP_am1xpEcDbmPpl_r5eT0I_Do6lWlpc7VhFGdfeu7s8",
            signatures: [
              {
                signature:
                  "8lu7Em1Uy4BZ1pYfxspablLUlh9Pt7huFDbv41TZNU1YNSuGLG6Kw17sSYQg2-FLBLF_VTqbG-CjSmvJicnTAQ",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreih73knvy2irydnzr6tf727f4t2ch4hi5jk2ljoo2wcfdhl55o53hq",
          },
          linkedBlock:
            "omRkYXRho2RuYW1lb3dvcmtDcmVkZW50aWFsc2ZzY2hlbWF4S2NlcmFtaWM6Ly9rM3k1Mmw3cWJ2MWZyeWg1eXVtOHV2YnRtNGEwdDYzZnUxdHAyc2FheGx4MGQ1aWJ3ZnA3ODZ5azVoNjQ3cWo5Y2tkZXNjcmlwdGlvbm93b3JrQ3JlZGVudGlhbHNmaGVhZGVyo2ZzY2hlbWF4S2NlcmFtaWM6Ly9rM3k1Mmw3cWJ2MWZyeTFmcDRzMG53ZGFyaDB2YWh1c2FycHBvc2dldnkwcGVtaXlreW1kMm9yZDZzd3RoYXJjd2Z1bmlxdWVwVUJTWnNHaGVwaWlmaVV4aGtjb250cm9sbGVyc4F4OGRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03",
        },
      ],
      schema: "kjzl6cwe1jw14aaegoi4ca3lo85qlo3wwvql7cp5un7d3l51qyhbu88giq67u63",
      version:
        "k3y52l7qbv1frxobji8xzowvkfuff8xayal6gqtopjy2pgwzy36dn37ljqpmev30g",
    },
    kjzl6cwe1jw146kr3ku1e8bu722g16nm5klsjpypxt3ua5uc5yoen3n8cw50dux: {
      alias: "workCredential",
      commits: [
        {
          jws: {
            payload: "AXESIBTH1LFlBjuTm4rx-OqVhPJ-iCZgk7qmF4nCkSvqhs45",
            signatures: [
              {
                signature:
                  "xePhl4C5P6y-RnJo2PZ_22VNY3QYs7m8Z0KEYRoDmy5pcdR0hSnwsUQ1iKoliyqNq-EOIde_oxZj3MIdCJbXAA",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreiauy7klczighojzxcxr7dvjlbhsp2ecmyetxktbpcocsev6vbwohe",
          },
          linkedBlock:
            "omRkYXRho2RuYW1lbndvcmtDcmVkZW50aWFsZnNjaGVtYXhLY2VyYW1pYzovL2szeTUybDdxYnYxZnJ4c2ZsN3JxMTVsNDJtNDE4NDMya2duOXkwNWpqcGEwaWh0MXZrYzQ5YnRxN29lZXJ6NmRja2Rlc2NyaXB0aW9ubndvcmtDcmVkZW50aWFsZmhlYWRlcqNmc2NoZW1heEtjZXJhbWljOi8vazN5NTJsN3FidjFmcnkxZnA0czBud2RhcmgwdmFodXNhcnBwb3NnZXZ5MHBlbWl5a3ltZDJvcmQ2c3d0aGFyY3dmdW5pcXVlcEZEdEovMS8vb1JuSFh2ek1rY29udHJvbGxlcnOBeDhkaWQ6a2V5Ono2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNw==",
        },
      ],
      schema: "kjzl6cwe1jw146t6x5l3jcj4v8fx7bojr39u3ea27hpy3mnbr1pck848yd9yb4u",
      version:
        "k3y52l7qbv1frxqrkpg5lx786q6pe0fbxjmiz08mwgezbc9jqielk49x7fojmqjuo",
    },
    kjzl6cwe1jw147ypvn1qcvn3v5yjkpv8aw9tjxdhw86us81ytfom1rn6ozq3647: {
      alias: "verifiableWorkCredential",
      commits: [
        {
          jws: {
            payload: "AXESIIS2x8NoaEqCoF4QVm53JlJu-rcnIMRZYcIV0VosWTgI",
            signatures: [
              {
                signature:
                  "YJdV9qDTrLjmg5PvZm3yLFU0vS580kW0PnC7XYYsGWv5ztbBTkxx-8bJmr86AVTkttj2hsmN3FbR6CcZRLVVAg",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreieew3d4g2dijkbkaxqqkzxhojssn35lojzayrmwdqqv2fncywjyba",
          },
          linkedBlock:
            "omRkYXRho2RuYW1leBh2ZXJpZmlhYmxlV29ya0NyZWRlbnRpYWxmc2NoZW1heEtjZXJhbWljOi8vazN5NTJsN3FidjFmcnliN253dDJ1bjlqZjQ2YzNrZGNoejFrejNjMW95MG9zdGk2OXh6bGJhZm15bThnM2RxMHdrZGVzY3JpcHRpb254GHZlcmlmaWFibGVXb3JrQ3JlZGVudGlhbGZoZWFkZXKjZnNjaGVtYXhLY2VyYW1pYzovL2szeTUybDdxYnYxZnJ5MWZwNHMwbndkYXJoMHZhaHVzYXJwcG9zZ2V2eTBwZW1peWt5bWQyb3JkNnN3dGhhcmN3ZnVuaXF1ZXBKZFdjRlhVSFpYbkZIcjlha2NvbnRyb2xsZXJzgXg4ZGlkOmtleTp6Nk1rcHptenR4dlBZU0NaOHR6U0NCUWhzUFR4Rml4VWtyekNEaFNLQmJRNlN2bTc=",
        },
      ],
      schema: "kjzl6cwe1jw149g9jsu7ona1k9w2r1vkiznrfnmqkj7zjwd99ubfneknzr29h48",
      version:
        "k3y52l7qbv1fry0mw0zwbfl0bhmdn7by31hhu5pbz968qwp9zlbj0skkvlq1ijhts",
    },
    kjzl6cwe1jw1462u8nvfxik0pk7mxg3607uiy1j8i12zs4qvr7coal47k83oxqu: {
      alias: "heldWorkCredentials",
      commits: [
        {
          jws: {
            payload: "AXESIAnLDTadLxxgfNlkmruUyCxCrXy2V0moUD7NhnxrK90S",
            signatures: [
              {
                signature:
                  "SicPX4JohWDCIRskP1OHrknM0PMv6OCcU2BrrrAw455ghHiXrTSrdvdVT6HcDy9HfSulX5oSYULSoUI4wxx2Bw",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreiajzmgtnhjpdrqhzwletk5zjsbmikwxznsxjgufapwnqz6gwk65ci",
          },
          linkedBlock:
            "omRkYXRho2RuYW1lc2hlbGRXb3JrQ3JlZGVudGlhbHNmc2NoZW1heEtjZXJhbWljOi8vazN5NTJsN3FidjFmcnljcGN2NDlvY3hkbGJ0NzY2aTk0dmFqNG1wdTZ2djA5ZGNwbHdteWQ5MGdxc3J6ZHpnbjRrZGVzY3JpcHRpb25zaGVsZFdvcmtDcmVkZW50aWFsc2ZoZWFkZXKjZnNjaGVtYXhLY2VyYW1pYzovL2szeTUybDdxYnYxZnJ5MWZwNHMwbndkYXJoMHZhaHVzYXJwcG9zZ2V2eTBwZW1peWt5bWQyb3JkNnN3dGhhcmN3ZnVuaXF1ZXBvN0hSWGhTdHZBU0FacUVBa2NvbnRyb2xsZXJzgXg4ZGlkOmtleTp6Nk1rcHptenR4dlBZU0NaOHR6U0NCUWhzUFR4Rml4VWtyekNEaFNLQmJRNlN2bTc=",
        },
      ],
      schema: "kjzl6cwe1jw149ntddjczkfz281kk1fwqwf2c70b3csq2fuln5h7hkvlro6nwjs",
      version:
        "k3y52l7qbv1frxn871lrlabyd1rqb1ueipjt2q2wsg7pag1r5tga4ra5xrtm9bytc",
    },
    kjzl6cwe1jw145rb52cffnykjia416rj2a8xn9wmxrschk3b3scsfuozeskr015: {
      alias: "heldVerifiableWorkCredentials",
      commits: [
        {
          jws: {
            payload: "AXESICl2VVTSGVM3z4Jo8K1N9IFG97HWu9vMKcT3boqu1tiR",
            signatures: [
              {
                signature:
                  "WDazjdIDfDpv2QnalG3_W4baaTxT8L9S5G9FDoVlc_CO0jLNo-Hpy9DLWD8ISqCOXNSFr3m2F37fYC7HHCXSCw",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreibjozkvjuqzkm347ati6cwu35ebi333dvv33pgctrhxn2fk5vwyse",
          },
          linkedBlock:
            "omRkYXRho2RuYW1leB1oZWxkVmVyaWZpYWJsZVdvcmtDcmVkZW50aWFsc2ZzY2hlbWF4S2NlcmFtaWM6Ly9rM3k1Mmw3cWJ2MWZyeHYzM2w5eDE5eTkzdHNvMWswdXpjNnNlb2FoNjdiZmo3Z2t5YmUxZ2Q2YXF4OTU1NnE2OGtkZXNjcmlwdGlvbngdaGVsZFZlcmlmaWFibGVXb3JrQ3JlZGVudGlhbHNmaGVhZGVyo2ZzY2hlbWF4S2NlcmFtaWM6Ly9rM3k1Mmw3cWJ2MWZyeTFmcDRzMG53ZGFyaDB2YWh1c2FycHBvc2dldnkwcGVtaXlreW1kMm9yZDZzd3RoYXJjd2Z1bmlxdWVwNE5pbXRzcEVEUHZEenBqcGtjb250cm9sbGVyc4F4OGRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03",
        },
      ],
      schema: "kjzl6cwe1jw1476mfxgghpmnlmldpvmcuegdbah1fnjmdzip2q5tv3p4wsujaib",
      version:
        "k3y52l7qbv1frxky780odredu2pzwog3rk8vj9ig345lksuviyxmy8q9nt77k083k",
    },
    kjzl6cwe1jw146atvl5hmaii1dwgy5o1vqu5xepmnvzdkqd6958f6azviyrvlqk: {
      alias: "MemberShip",
      commits: [
        {
          jws: {
            payload: "AXESIGobzkzXX_6_V6t1IUt0B8SIW6MrX3fFziDqmpAidCL2",
            signatures: [
              {
                signature:
                  "YuGYzjxgQ4M3tqJeNFMwKgfC61YhY7sB5rAmBx3HeyT19C6wp0I54YhqqgKHDLqU-Y06l4p5Ra9mpv82AnUcBA",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreidkdphezv27727vpk3veffxib6erbn2gk27o7c44ihktkice5bc6y",
          },
          linkedBlock:
            "omRkYXRho2RuYW1lam1lbWJlclNoaXBmc2NoZW1heEtjZXJhbWljOi8vazN5NTJsN3FidjFmcnk5NnBxYW1pMzhqenVmdHk3b3ZzdGFxaXMwanlzMGN1dm4zenpxYndhd2JzeHdweGhleW9rZGVzY3JpcHRpb25qbWVtYmVyU2hpcGZoZWFkZXKjZnNjaGVtYXhLY2VyYW1pYzovL2szeTUybDdxYnYxZnJ5MWZwNHMwbndkYXJoMHZhaHVzYXJwcG9zZ2V2eTBwZW1peWt5bWQyb3JkNnN3dGhhcmN3ZnVuaXF1ZXBycTBoUUJBWDFSQlFsY1FMa2NvbnRyb2xsZXJzgXg4ZGlkOmtleTp6Nk1rcHptenR4dlBZU0NaOHR6U0NCUWhzUFR4Rml4VWtyekNEaFNLQmJRNlN2bTc=",
        },
      ],
      schema: "kjzl6cwe1jw149608rdaf2w287undgfpzmblrkbt2tat3boqzyn1qa65r9nw9rf",
      version:
        "k3y52l7qbv1frxot0gmf1airk9uuwiwb1dqui5km95vfkjfhoh17vwu746va8qku8",
    },
    kjzl6cwe1jw14afrtvkjgefqwmalj9l5ckmhafhaqtpoxajvgg5kg2fgvyp5wxn: {
      alias: "Organization",
      commits: [
        {
          jws: {
            payload: "AXESIP8T4qkeqguPdddTa1W8yIQOjTg1iEgJRvaVgcjQ-y-A",
            signatures: [
              {
                signature:
                  "_1lkNgbHrRn3wyyXjdj718Dp-u5ZpxjDSEFfuLf-iaPiuq8DvTcwxxrog7kKOIf6IXanjEXuETcO2xRMTI23CQ",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreih7cprkshvkbohxlv2tnnk3zseeb2gtqnmijaeun5uvqhenb6zpqa",
          },
          linkedBlock:
            "omRkYXRho2RuYW1lbG9yZ2FuaXphdGlvbmZzY2hlbWF4S2NlcmFtaWM6Ly9rM3k1Mmw3cWJ2MWZyeGxhcnF3bHh5N3VvenBvN2h5NnQzd3ljdDNjdjRpYnNjdjJzbXh4ZmhzYngybGFicGVkY2tkZXNjcmlwdGlvbmxvcmdhbml6YXRpb25maGVhZGVyo2ZzY2hlbWF4S2NlcmFtaWM6Ly9rM3k1Mmw3cWJ2MWZyeTFmcDRzMG53ZGFyaDB2YWh1c2FycHBvc2dldnkwcGVtaXlreW1kMm9yZDZzd3RoYXJjd2Z1bmlxdWVwYmM0YjdKMWF0VTN2aWhmV2tjb250cm9sbGVyc4F4OGRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03",
        },
      ],
      schema: "kjzl6cwe1jw145t2ryyl34h950spsymbyv2kxca8vkks6b4bwh59hosoc6d9irc",
      version:
        "k3y52l7qbv1fryi85wgi2cmnzbyjd506e1enuy630erap8r1boyvle9a03aqy277k",
    },
    kjzl6cwe1jw1497pei4dttpf4z62460m1rtk8r74q7lh830qby3155pt8j36euv: {
      alias: "MembershipSubject",
      commits: [
        {
          jws: {
            payload: "AXESIMH1LHBaAQefcXMHHPHy3q9RnsBLXi7wZMK1fidU5W_O",
            signatures: [
              {
                signature:
                  "TJL4eDSqaSfJ74FCaDv0Z17HJwjgSioPjK3XB-kISUzFU0O5OqNrEYC-DuziWWgeldKWtL7B1UiVGy5IpxxsBA",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreigb6uwhawqba6pxc4yhdty7fxvpkgpmas26f3ygjqvvpytvjzlpzy",
          },
          linkedBlock:
            "omRkYXRho2RuYW1lcW1lbWJlcnNoaXBTdWJqZWN0ZnNjaGVtYXhLY2VyYW1pYzovL2szeTUybDdxYnYxZnJ4b3g3MDY4aHVmOXdrbGxiNGY3MTRwcG9wM2kxdDhyZnAwZXI1aGdtbWl2NTNqNHRvbDR3a2Rlc2NyaXB0aW9ucW1lbWJlcnNoaXBTdWJqZWN0ZmhlYWRlcqNmc2NoZW1heEtjZXJhbWljOi8vazN5NTJsN3FidjFmcnkxZnA0czBud2RhcmgwdmFodXNhcnBwb3NnZXZ5MHBlbWl5a3ltZDJvcmQ2c3d0aGFyY3dmdW5pcXVlcElENnNNV1RyK0ZYSFdZeHBrY29udHJvbGxlcnOBeDhkaWQ6a2V5Ono2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNw==",
        },
      ],
      schema: "kjzl6cwe1jw146bf1pmkic9tw5ab4k4xch46aa1z4oalw7dboyinfjj05k4m69q",
      version:
        "k3y52l7qbv1fry9isn4v6c38rne331mscslu7y9epme0qhhh78ydk4onjwnqllngg",
    },
    kjzl6cwe1jw148ipsz4jom0otbh99u2tsl8rqgq29pndfgu1fyfnenwwxyvq9ck: {
      alias: "CreatedOrganizations",
      commits: [
        {
          jws: {
            payload: "AXESIHNvjh7Pys5m90TxZNegog4qAEkMh64vz-T2JLHR1n7E",
            signatures: [
              {
                signature:
                  "NPlIjPjdPhKrFuO9zOIdU9ZFLT2Tci91E0WCaYb8bnh102kZHi2mz8gyNRzKsZiRX4I0Drlx-Ukw84cliQzMDw",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreidtn6hb5t6kzztporhrmtl2biqofiaesdehvyx47zhwesy5dvt6yq",
          },
          linkedBlock:
            "omRkYXRho2RuYW1ldENyZWF0ZWRPcmdhbml6YXRpb25zZnNjaGVtYXhLY2VyYW1pYzovL2szeTUybDdxYnYxZnJ5bWc5YzlrcHJsbTF4emtuZ3F2eGNmdmZod3cxM2ltZ2R6dm9udGd4bm5ncmRtb2p0OXRza2Rlc2NyaXB0aW9udENyZWF0ZWRPcmdhbml6YXRpb25zZmhlYWRlcqNmc2NoZW1heEtjZXJhbWljOi8vazN5NTJsN3FidjFmcnkxZnA0czBud2RhcmgwdmFodXNhcnBwb3NnZXZ5MHBlbWl5a3ltZDJvcmQ2c3d0aGFyY3dmdW5pcXVlcHVBRlBuUzhod3FkSjVUK21rY29udHJvbGxlcnOBeDhkaWQ6a2V5Ono2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNw==",
        },
      ],
      schema: "kjzl6cwe1jw14b15tach4fz5wcbcasj44k8cv7fr5k216guw5lkxzdzjllr2say",
      version:
        "k3y52l7qbv1fry4l3i1sbz0kwghmpxxw3vb2d86xc52e7hzpm9gvaga229k1mqha8",
    },
    kjzl6cwe1jw145pnoeu7d2q0v8wnqchk7jynugmbzamb1rynxj8o54747n7crkh: {
      alias: "CreatedMemberships",
      commits: [
        {
          jws: {
            payload: "AXESIPm3LiOJWjqgQnq7nWCYaZsdf6t11Dodu8jVd3-Cx5mV",
            signatures: [
              {
                signature:
                  "w80CbZUUVhzi4Wqu_QTcNY3J9OZpkCm4utw0oVXa6_nUmMvw1Ladycv3qmWLJRNHGaxaKK3Dr-vIPnzqijhyBw",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreihzw4xchck2hkqee6v3tvqjq2m3dv72w5ouhio3xsgvo57yfr4zsu",
          },
          linkedBlock:
            "omRkYXRho2RuYW1lckNyZWF0ZWRNZW1iZXJzaGlwc2ZzY2hlbWF4S2NlcmFtaWM6Ly9rM3k1Mmw3cWJ2MWZyeTJsNXRsOTd4cmVsYWR0cHQ2aTZqc2JuNmN0b3JlbHVhYTkyMTVhbDlhOXV2OXBjbzB6a2tkZXNjcmlwdGlvbnJDcmVhdGVkTWVtYmVyc2hpcHNmaGVhZGVyo2ZzY2hlbWF4S2NlcmFtaWM6Ly9rM3k1Mmw3cWJ2MWZyeTFmcDRzMG53ZGFyaDB2YWh1c2FycHBvc2dldnkwcGVtaXlreW1kMm9yZDZzd3RoYXJjd2Z1bmlxdWVwWWpybTl4czYwekdYUlJKUWtjb250cm9sbGVyc4F4OGRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03",
        },
      ],
      schema: "kjzl6cwe1jw1488lmq1uxfnzm9thowz6jno4y2xfalqp2kkecjb1v499eisvldn",
      version:
        "k3y52l7qbv1frxkmgdlisczd267c8rcsvppyhkm6t6zimkmui6gtnodulyd0as1kw",
    },
    kjzl6cwe1jw148972qlwp96t99635rpmp7onqllhwe1a4p4pewfpka0wy3rvxtc: {
      alias: "CreatedMembershipSubjects",
      commits: [
        {
          jws: {
            payload: "AXESIO14tVw3kkT7zIbuK48kYr4MkoLIzCD19wEK9JkFxTLd",
            signatures: [
              {
                signature:
                  "jaP3sfq6LcG5YVNJu99O2BHhLCtJXzui_p_agOtYKQQi-WeIgr1CS5Bs19TcJiAQ8XVPdYZ1JwapVexxh3pjAg",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreihnpc2vyn4sit54zbxofohsiyv6bsjifsgmed27oaik6smqlrjs3u",
          },
          linkedBlock:
            "omRkYXRho2RuYW1leBlDcmVhdGVkTWVtYmVyc2hpcFN1YmplY3RzZnNjaGVtYXhLY2VyYW1pYzovL2szeTUybDdxYnYxZnJ4a2M1bGo5NzA2ZmNweWNjZHRvb3oybHpia3ZvZW5qdjZpemN2bjJ2cjJvdzhscDk5Zmswa2Rlc2NyaXB0aW9ueBlDcmVhdGVkTWVtYmVyc2hpcFN1YmplY3RzZmhlYWRlcqNmc2NoZW1heEtjZXJhbWljOi8vazN5NTJsN3FidjFmcnkxZnA0czBud2RhcmgwdmFodXNhcnBwb3NnZXZ5MHBlbWl5a3ltZDJvcmQ2c3d0aGFyY3dmdW5pcXVlcHdab0JMTUxLbFQwTWVjY2prY29udHJvbGxlcnOBeDhkaWQ6a2V5Ono2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNw==",
        },
      ],
      schema: "kjzl6cwe1jw145o7jc9qapnj85e3zozj9fjys2dgdb6qblslhy6lc8tdj7jv450",
      version:
        "k3y52l7qbv1fry2pebh7sjlcg1t7ah129fanct5kvabt41epgpynps7aiaiub4glc",
    },
    kjzl6cwe1jw14aahdkcchgn6kj9ob3870i5ee71vkfe6s8br9avbj8yba5myz6v: {
      alias: "VerifiableMembershipSubjectCredential",
      commits: [
        {
          jws: {
            payload: "AXESIDoz8EsbnEM3OyreVS7OfGExQYGOklXBGUa6SYUqzucK",
            signatures: [
              {
                signature:
                  "D76MmCcqxIW06drqLmN98TC9jwuHLyuaJiY72LFAVQkBiGv3auwpD5b5m9NhaFwet6GU5wXjqERzZzxPrCOvDQ",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreib2gpyewg44im3twkw6kuxm47dbgfaydduskxarsrv2jgcsvtxhbi",
          },
          linkedBlock:
            "omRkYXRho2RuYW1leCVWZXJpZmlhYmxlTWVtYmVyc2hpcFN1YmplY3RDcmVkZW50aWFsZnNjaGVtYXhLY2VyYW1pYzovL2szeTUybDdxYnYxZnJ5bWo2bnIwbXV2OXE3eXpjeTB4b3Q1cnFseHBpdHBtOHZycnNrZnRyM3E5ZGk4aXJ5cHMwa2Rlc2NyaXB0aW9ueCVWZXJpZmlhYmxlTWVtYmVyc2hpcFN1YmplY3RDcmVkZW50aWFsZmhlYWRlcqNmc2NoZW1heEtjZXJhbWljOi8vazN5NTJsN3FidjFmcnkxZnA0czBud2RhcmgwdmFodXNhcnBwb3NnZXZ5MHBlbWl5a3ltZDJvcmQ2c3d0aGFyY3dmdW5pcXVlcHdkMks5c3BKOTRoaVN0SmlrY29udHJvbGxlcnOBeDhkaWQ6a2V5Ono2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNw==",
        },
      ],
      schema: "kjzl6cwe1jw14b1kmgqiyprszzuuia98jumgogjwgjwxvgucgdh4dgmoymkn22i",
      version:
        "k3y52l7qbv1fryh6jkgnss6cuq10suuy9vl2ecy5ch9gw8r7lu5aq0vo0883cq8sg",
    },
    kjzl6cwe1jw149s0q669ewjj8oclmp27vrf88yyu3wgxuk7w4o05zyt5up5kndx: {
      alias: "HeldVerifiableMembershipSubjects",
      commits: [
        {
          jws: {
            payload: "AXESIOuyzRG0Ukvcu0YBVU48ZE9jouM7A6omew4WmuUJM2Xt",
            signatures: [
              {
                signature:
                  "ebuWQlXAXE473QBxDctPva-5OGdJyz-jSvhWW6Tl0LniOHQhPAYNbmABIbLKzdhNs47Nxusd5__DPEtNlFcaBA",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreihlwlgrdncsjpolwrqbkvhdyzcpmorogoydvithwdqwtlsqsm3f5u",
          },
          linkedBlock:
            "omRkYXRho2RuYW1leCBIZWxkVmVyaWZpYWJsZU1lbWJlcnNoaXBTdWJqZWN0c2ZzY2hlbWF4S2NlcmFtaWM6Ly9rM3k1Mmw3cWJ2MWZyeWpwaG9lOG9vZ3I3aHAzdHdudmR2aXl3azZzaWZqOHV3dHZ5aDI2Z2sxdHpmOGx0cW9sY2tkZXNjcmlwdGlvbnggSGVsZFZlcmlmaWFibGVNZW1iZXJzaGlwU3ViamVjdHNmaGVhZGVyo2ZzY2hlbWF4S2NlcmFtaWM6Ly9rM3k1Mmw3cWJ2MWZyeTFmcDRzMG53ZGFyaDB2YWh1c2FycHBvc2dldnkwcGVtaXlreW1kMm9yZDZzd3RoYXJjd2Z1bmlxdWVwN2pHV3Z0Q3QvRkZXS3QzZ2tjb250cm9sbGVyc4F4OGRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03",
        },
      ],
      schema: "kjzl6cwe1jw14an9sqr3gxutqoccn5lumzus7c7dub56lhpb19va7bia1kwbhtc",
      version:
        "k3y52l7qbv1frydj963wixzewtp5lte7s1v0ansnq3qwgpbs4h6p6nrjdmavmuayo",
    },
    kjzl6cwe1jw14af923ojjfitkcsl3chhbi8q43pmmriidwxj8d7sirjc0wk2u8r: {
      alias: "IssuedVerifiableMembershipSubjects",
      commits: [
        {
          jws: {
            payload: "AXESILrYw6DcS9OzpnEfZXI5K1ar5Kg1uRCnMtDQJ9l28Nai",
            signatures: [
              {
                signature:
                  "DzbiuL9Q5jhAJYA_zz8YjErAQHOiyj8a6CGHV5LwyF275Xh-26jW9HYOcyxQi-zwYbKokHp-SjhHZE667O-eAA",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreif23db2bxcl2oz2m4i7mvzdsk2wvpskqnnzccttfugqe7mxn4gwui",
          },
          linkedBlock:
            "omRkYXRho2RuYW1leCJJc3N1ZWRWZXJpZmlhYmxlTWVtYmVyc2hpcFN1YmplY3RzZnNjaGVtYXhLY2VyYW1pYzovL2szeTUybDdxYnYxZnJ4ejR5cm9xZzFyem5qZHdzcmhzMzR1eG04dGd2ZGJ3cDQxdmpmYXNkc2t4bnZwcXF2bnk4a2Rlc2NyaXB0aW9ueCJJc3N1ZWRWZXJpZmlhYmxlTWVtYmVyc2hpcFN1YmplY3RzZmhlYWRlcqNmc2NoZW1heEtjZXJhbWljOi8vazN5NTJsN3FidjFmcnkxZnA0czBud2RhcmgwdmFodXNhcnBwb3NnZXZ5MHBlbWl5a3ltZDJvcmQ2c3d0aGFyY3dmdW5pcXVlcHBRYUZCWDN5WGcvNkhVTGlrY29udHJvbGxlcnOBeDhkaWQ6a2V5Ono2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNw==",
        },
      ],
      schema: "kjzl6cwe1jw147r4w0nyvqzy8ww6am6rfvclov56nt8ja4rhx37d6txzf5b2nkt",
      version:
        "k3y52l7qbv1fryi4gey6iy6du8qz9zssb5tq1p6e8xvnmqy6grhzetfthifis7280",
    },
  },
  tiles: {},
};

export const devModel: EncodedManagedModel = {
  schemas: {
    kjzl6cwe1jw146x1pnq7vg4t0lwea84s2a8u58tt1clfmv7mrju3l2341klxyu6: {
      alias: "BasicProfile",
      commits: [
        {
          jws: {
            payload: "AXESIMy4lYCUWSpzFW5jKQ0mYJOQ67EQnv5Exuv3F599h-et",
            signatures: [
              {
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3NOWUU2V3RNWjNXTGJQd2NwOUdtN2RUN0ozRHNOUDhhdVFOblBwUUJ1MzdBI3o2TWtzTllFNld0TVozV0xiUHdjcDlHbTdkVDdKM0RzTlA4YXVRTm5QcFFCdTM3QSJ9",
                signature:
                  "yeEnzWKALkvTn_X7wjgL3ldLW8I8vWANs5QZmqI6PGbU5AJl12eIuWyID-mRPuGF9flovtGNX1P-qKkc6Y8JBA",
              },
            ],
            link: "bafyreigmxckybfczfjzrk3tdfegsmyetsdv3cee67zcmn27xc6px3b7hvu",
          },
          linkedBlock:
            "o2RkYXRhpWR0eXBlZm9iamVjdGV0aXRsZWxCYXNpY1Byb2ZpbGVnJHNjaGVtYXgnaHR0cDovL2pzb24tc2NoZW1hLm9yZy9kcmFmdC0wNy9zY2hlbWEjanByb3BlcnRpZXOsY3VybKJkdHlwZWZzdHJpbmdpbWF4TGVuZ3RoGPBkbmFtZaJkdHlwZWZzdHJpbmdpbWF4TGVuZ3RoGJZlZW1vammiZHR5cGVmc3RyaW5naW1heExlbmd0aAJlaW1hZ2WhZCRyZWZ4GiMvZGVmaW5pdGlvbnMvaW1hZ2VTb3VyY2VzZmdlbmRlcqJkdHlwZWZzdHJpbmdpbWF4TGVuZ3RoGCppYmlydGhEYXRlo2R0eXBlZnN0cmluZ2Zmb3JtYXRkZGF0ZWltYXhMZW5ndGgKamJhY2tncm91bmShZCRyZWZ4GiMvZGVmaW5pdGlvbnMvaW1hZ2VTb3VyY2Vza2Rlc2NyaXB0aW9uomR0eXBlZnN0cmluZ2ltYXhMZW5ndGgZAaRsYWZmaWxpYXRpb25zomR0eXBlZWFycmF5ZWl0ZW1zomR0eXBlZnN0cmluZ2ltYXhMZW5ndGgYjGxob21lTG9jYXRpb26iZHR5cGVmc3RyaW5naW1heExlbmd0aBiMbW5hdGlvbmFsaXRpZXOjZHR5cGVlYXJyYXllaXRlbXOjZHR5cGVmc3RyaW5nZ3BhdHRlcm5qXltBLVpdezJ9JGhtYXhJdGVtcwVobWluSXRlbXMBcHJlc2lkZW5jZUNvdW50cnmjZHR5cGVmc3RyaW5nZ3BhdHRlcm5qXltBLVpdezJ9JGltYXhMZW5ndGgCa2RlZmluaXRpb25zpGdJUEZTVXJso2R0eXBlZnN0cmluZ2dwYXR0ZXJual5pcGZzOi8vLitpbWF4TGVuZ3RoGJZsaW1hZ2VTb3VyY2Vzo2R0eXBlZm9iamVjdGhyZXF1aXJlZIFob3JpZ2luYWxqcHJvcGVydGllc6Job3JpZ2luYWyhZCRyZWZ4GyMvZGVmaW5pdGlvbnMvaW1hZ2VNZXRhZGF0YWxhbHRlcm5hdGl2ZXOiZHR5cGVlYXJyYXllaXRlbXOhZCRyZWZ4GyMvZGVmaW5pdGlvbnMvaW1hZ2VNZXRhZGF0YW1pbWFnZU1ldGFkYXRho2R0eXBlZm9iamVjdGhyZXF1aXJlZIRjc3JjaG1pbWVUeXBlZXdpZHRoZmhlaWdodGpwcm9wZXJ0aWVzpWNzcmOhZCRyZWZ1Iy9kZWZpbml0aW9ucy9JUEZTVXJsZHNpemWhZCRyZWZ4HSMvZGVmaW5pdGlvbnMvcG9zaXRpdmVJbnRlZ2VyZXdpZHRooWQkcmVmeB0jL2RlZmluaXRpb25zL3Bvc2l0aXZlSW50ZWdlcmZoZWlnaHShZCRyZWZ4HSMvZGVmaW5pdGlvbnMvcG9zaXRpdmVJbnRlZ2VyaG1pbWVUeXBlomR0eXBlZnN0cmluZ2ltYXhMZW5ndGgYMm9wb3NpdGl2ZUludGVnZXKiZHR5cGVnaW50ZWdlcmdtaW5pbXVtAWZoZWFkZXKiZnNjaGVtYfdrY29udHJvbGxlcnOBeDhkaWQ6a2V5Ono2TWtzTllFNld0TVozV0xiUHdjcDlHbTdkVDdKM0RzTlA4YXVRTm5QcFFCdTM3QWdkb2N0eXBlZHRpbGU=",
        },
      ],
      dependencies: {},
      version:
        "k3y52l7qbv1frxt706gqfzmq6cbqdkptzk8uudaryhlkf6ly9vx21hqu4r6k1jqio",
    },
    kjzl6cwe1jw14bie69guriwn4hsto1gdh5q1ytpwi84xkz2b9oxkw9qs7d3v3vv: {
      alias: "CryptoAccounts",
      commits: [
        {
          jws: {
            payload: "AXESIF-4Olz6gzTYrKPZj_7buHaUsueU-P0K67cq6kHlJphd",
            signatures: [
              {
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3NOWUU2V3RNWjNXTGJQd2NwOUdtN2RUN0ozRHNOUDhhdVFOblBwUUJ1MzdBI3o2TWtzTllFNld0TVozV0xiUHdjcDlHbTdkVDdKM0RzTlA4YXVRTm5QcFFCdTM3QSJ9",
                signature:
                  "WMNOLmFwYUcYg-dhzg_zkFYit2j7hdYY4_NvcRy_4q_CJmfj8WOxTeHRQ1HqdXkXVycg_Q4JmtqUG992Cdf2CA",
              },
            ],
            link: "bafyreic7xa5fz6udgtmkzi6zr77nxodwsszopfhy7ufoxnzk5ja6kjuylu",
          },
          linkedBlock:
            "o2RkYXRhpmR0eXBlZm9iamVjdGV0aXRsZXJDcnlwdG9BY2NvdW50TGlua3NnJHNjaGVtYXgnaHR0cDovL2pzb24tc2NoZW1hLm9yZy9kcmFmdC0wNy9zY2hlbWEjbXByb3BlcnR5TmFtZXOhaW1heExlbmd0aBkEAHFwYXR0ZXJuUHJvcGVydGllc6F4OF5bYS16QS1aMC05XXsxLDYzfUBbLWEtekEtWjAtOV17MywxNn06Wy1hLXpBLVowLTldezEsNDd9o2R0eXBlZnN0cmluZ2dwYXR0ZXJubV5jZXJhbWljOi8vLitpbWF4TGVuZ3RoGQQAdGFkZGl0aW9uYWxQcm9wZXJ0aWVz9GZoZWFkZXKiZnNjaGVtYfdrY29udHJvbGxlcnOBeDhkaWQ6a2V5Ono2TWtzTllFNld0TVozV0xiUHdjcDlHbTdkVDdKM0RzTlA4YXVRTm5QcFFCdTM3QWdkb2N0eXBlZHRpbGU=",
        },
      ],
      dependencies: {},
      version:
        "k3y52l7qbv1frypussjburqg4fykyyycfu0p9znc75lv2t5cg4xaslhagkd7h7mkg",
    },
    kjzl6cwe1jw14bbsas0m29cxrnsyesfp0v45gz9l44p3wpw86j21kio8onil8po: {
      alias: "AlsoKnownAs",
      commits: [
        {
          jws: {
            payload: "AXESIALdl9Z9fNLBS6NfkZ2JRIClBQFb0cIi2rVwS1Kie2k1",
            signatures: [
              {
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3NOWUU2V3RNWjNXTGJQd2NwOUdtN2RUN0ozRHNOUDhhdVFOblBwUUJ1MzdBI3o2TWtzTllFNld0TVozV0xiUHdjcDlHbTdkVDdKM0RzTlA4YXVRTm5QcFFCdTM3QSJ9",
                signature:
                  "bg4CcLmHGYPYsRvl_EObk2HgtOjijDNBJrOzupI2NMT-n_3Wj4GaUn83wA2IqTtql5uZRpgBYqxOjGdH4GB6CA",
              },
            ],
            link: "bafyreiac3wl5m7l42lauxi27sgoysreauucqcw6ryirnvnlqjnjke63jgu",
          },
          linkedBlock:
            "o2RkYXRhp2R0eXBlZm9iamVjdGV0aXRsZWtBbHNvS25vd25Bc2ckc2NoZW1heCdodHRwOi8vanNvbi1zY2hlbWEub3JnL2RyYWZ0LTA3L3NjaGVtYSNocmVxdWlyZWSBaGFjY291bnRzanByb3BlcnRpZXOhaGFjY291bnRzomR0eXBlZWFycmF5ZWl0ZW1zoWQkcmVmdSMvZGVmaW5pdGlvbnMvQWNjb3VudGtkZWZpbml0aW9uc6JnQWNjb3VudKNkdHlwZWZvYmplY3RocmVxdWlyZWSCaHByb3RvY29sYmlkanByb3BlcnRpZXOlYmlkomR0eXBlZnN0cmluZ2ltYXhMZW5ndGgZAcJkaG9zdKJkdHlwZWZzdHJpbmdpbWF4TGVuZ3RoGJZlY2xhaW2iZHR5cGVmc3RyaW5naW1heExlbmd0aBkBwmhwcm90b2NvbKJkdHlwZWZzdHJpbmdpbWF4TGVuZ3RoGDJsYXR0ZXN0YXRpb25zomR0eXBlZWFycmF5ZWl0ZW1zoWQkcmVmeBkjL2RlZmluaXRpb25zL0F0dGVzdGF0aW9ua0F0dGVzdGF0aW9uomR0eXBlZm9iamVjdGpwcm9wZXJ0aWVzomdkaWQtand0omR0eXBlZnN0cmluZ2ltYXhMZW5ndGgZA+hqZGlkLWp3dC12Y6JkdHlwZWZzdHJpbmdpbWF4TGVuZ3RoGQPodGFkZGl0aW9uYWxQcm9wZXJ0aWVz9GZoZWFkZXKiZnNjaGVtYfdrY29udHJvbGxlcnOBeDhkaWQ6a2V5Ono2TWtzTllFNld0TVozV0xiUHdjcDlHbTdkVDdKM0RzTlA4YXVRTm5QcFFCdTM3QWdkb2N0eXBlZHRpbGU=",
        },
      ],
      dependencies: {},
      version:
        "k3y52l7qbv1fryojt8n8cw2k04p9wp67ly59iwqs65dejso566fij5wsdrb871yio",
    },
    kjzl6cwe1jw145vb7ew4q0yjx67dvegzlx08k5qbq0m6l2x7kffzbzoeeos1h3n: {
      alias: "OldWorkCredential",
      commits: [
        {
          jws: {
            payload: "AXESIKokSC75KdCcuy2PXVT1uOy1QpNLkcFxxpXIRJhnmp_1",
            signatures: [
              {
                signature:
                  "WqznxgijtJlXYGEBR8DOtLz7oyGuf_UtpKi3lH4DqFwJeelohoCxfN7jgfwrdslFo0gGubLoyU9Z604ZSF8jBw",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreifkerec56jj2colwlmplvkplohmwvbjgs4ryfy4nfoiismgpgu76u",
          },
          linkedBlock:
            "omRkYXRhpmR0eXBlZm9iamVjdGV0aXRsZW5Xb3JrQ3JlZGVudGlhbGckc2NoZW1heCdodHRwOi8vanNvbi1zY2hlbWEub3JnL2RyYWZ0LTA3L3NjaGVtYSNocmVxdWlyZWSHYnRvZGZyb21nc3VtbWFyeWV2YWx1ZWt0b2tlblN5bWJvbGluZXR3b3JrSWRvaXNzdWVkVGltZXN0YW1wanByb3BlcnRpZXO4HmJ0b6NkdHlwZWZzdHJpbmdldGl0bGVidG9rZGVzY3JpcHRpb25tcGF5ZWUgYWRkcmVzc2Rmcm9to2R0eXBlZnN0cmluZ2V0aXRsZWRmcm9ta2Rlc2NyaXB0aW9ubXBheWVyIGFkZHJlc3NkdGFnc6VkdHlwZWVhcnJheWVpdGVtc6FkdHlwZWZzdHJpbmdldGl0bGVkdGFnc2tkZXNjcmlwdGlvbml3b3JrIHRhZ3NrdW5pcXVlSXRlbXP1ZWdlbnJlo2R0eXBlZnN0cmluZ2V0aXRsZWVnZW5yZWtkZXNjcmlwdGlvbngfd29yayBnZW5yZSBlLmcsIERldiwgRGVzaWduIGV0Y2V0b1NpZ6NkdHlwZWZzdHJpbmdldGl0bGVldG9TaWdrZGVzY3JpcHRpb25yc2lnbmF0dXJlIG9mIHBleWVlZXZhbHVlo2R0eXBlZnN0cmluZ2V0aXRsZWV2YWx1ZWtkZXNjcmlwdGlvbmpwYWlkIHZhbHVlZmRldGFpbKNkdHlwZWZzdHJpbmdldGl0bGVmZGV0YWlsa2Rlc2NyaXB0aW9ua3dvcmsgZGV0YWlsZnR4SGFzaKNkdHlwZWZzdHJpbmdldGl0bGVmdHhIYXNoa2Rlc2NyaXB0aW9ud2hhc2ggb2YgdGhlIHRyYW5zYWN0aW9uZ2Zyb21TaWejZHR5cGVmc3RyaW5nZXRpdGxlZ2Zyb21TaWdrZGVzY3JpcHRpb25yc2lnbmF0dXJlIG9mIHBleWVyZ2lzUGF5ZXKjZHR5cGVnYm9vbGVhbmV0aXRsZWdpc1BheWVya2Rlc2NyaXB0aW9ueBt3aGV0aGVyIG9yIG5vdCBESUQgaXMgcGF5ZXJnam9iVHlwZaNkdHlwZWZzdHJpbmdldGl0bGVnam9iVHlwZWtkZXNjcmlwdGlvbngxY3VycmVudGx5IHN1cHBvcnQgZnVsbHRpbWUsIHBhcnR0aW1lLCBhbmQgb25ldGltZWdzdW1tYXJ5o2R0eXBlZnN0cmluZ2V0aXRsZWdzdW1tYXJ5a2Rlc2NyaXB0aW9ubHdvcmsgc3VtbWFyeWhwbGF0Zm9ybaNkdHlwZWZzdHJpbmdldGl0bGVocGxhdGZvcm1rZGVzY3JpcHRpb254LWEgdHJhbnNhY3Rpb24gcGxhdGZvcm0gaWYgZXhpc3RzIGUuZywgZ2l0Y29pbmhzdWJ0YXNrc6RkdHlwZWVhcnJheWVpdGVtc6NkdHlwZWZvYmplY3RldGl0bGVnc3VidGFza2pwcm9wZXJ0aWVzomVnZW5yZaNkdHlwZWZzdHJpbmdldGl0bGVlZ2VucmVrZGVzY3JpcHRpb254H3dvcmsgZ2VucmUgZS5nLCBEZXYsIERlc2lnbiBldGNmZGV0YWlso2R0eXBlZnN0cmluZ2V0aXRsZWZkZXRhaWxrZGVzY3JpcHRpb25rd29yayBkZXRhaWxldGl0bGVoc3VidGFza3NrZGVzY3JpcHRpb25oc3VidGFza3NodG9TaWduZXKjZHR5cGVmc3RyaW5nZXRpdGxlaHRvU2lnbmVya2Rlc2NyaXB0aW9ueCJBZGRyZXNzIG9mIHBlcnNvbiBzaWduaW5nIGFzIHBheWVlaWNyZWF0ZWRBdKJkdHlwZWZzdHJpbmdldGl0bGVpY3JlYXRlZEF0aWZpYXRWYWx1ZaNkdHlwZWZzdHJpbmdldGl0bGVldmFsdWVrZGVzY3JpcHRpb254KWZpYXQgcHJpY2UgYXQgdGhlIHRpbWUgb2YgdGhlIHRyYW5zYWN0aW9uaW5ldHdvcmtJZKNkdHlwZWZudW1iZXJldGl0bGVpbmV0d29ya0lka2Rlc2NyaXB0aW9ueB1uZXR3b3JrIGlkIG9mIHRoZSB0cmFuc2FjdGlvbml1cGRhdGVkQXSiZHR5cGVmc3RyaW5nZXRpdGxlaXVwZGF0ZWRBdGpmaWF0U3ltYm9so2R0eXBlZnN0cmluZ2V0aXRsZWpmaWF0U3ltYm9sa2Rlc2NyaXB0aW9ueBpjdXJyZW50bHkgb25seSBzdXBwb3J0IFVTRGpmcm9tU2lnbmVyo2R0eXBlZnN0cmluZ2V0aXRsZWpmcm9tU2lnbmVya2Rlc2NyaXB0aW9ueCJBZGRyZXNzIG9mIHBlcnNvbiBzaWduaW5nIGFzIHBheWVya3Rva2VuU3ltYm9so2R0eXBlZnN0cmluZ2V0aXRsZWt0b2tlblN5bWJvbGtkZXNjcmlwdGlvbnFwYWlkIHRva2VuIHN5bWJvbGxkZWxpdmVyYWJsZXOkZHR5cGVlYXJyYXllaXRlbXOjZHR5cGVmb2JqZWN0ZXRpdGxlb2RlbGl2ZXJhYmxlSXRlbWpwcm9wZXJ0aWVzomV2YWx1ZaNkdHlwZWZzdHJpbmdldGl0bGVldmFsdWVrZGVzY3JpcHRpb254H3dvcmsgZGVsaXZlcmFibGUgdmFsdWUodXJsL2NpZClmZm9ybWF0o2R0eXBlZnN0cmluZ2V0aXRsZWZmb3JtYXRrZGVzY3JpcHRpb254HmN1cnJlbnQgZm9ybWF0cyBhcmUgdXJsIG9yIGNpZGV0aXRsZWxkZWxpdmVyYWJsZXNrZGVzY3JpcHRpb25xd29yayBkZWxpdmVyYWJsZXNsZW5kVGltZXN0YW1wo2R0eXBlZnN0cmluZ2V0aXRsZWxlbmRUaW1lc3RhbXBrZGVzY3JpcHRpb254GFRpbWUgc3RhbXAgb2Ygd29yayBlbmRlZGx0b2tlbkRlY2ltYWyjZHR5cGVmbnVtYmVyZXRpdGxlbHRva2VuRGVjaW1hbGtkZXNjcmlwdGlvbnJwYWlkIHRva2VuIGRlY2ltYWxuc3RhcnRUaW1lc3RhbXCjZHR5cGVmc3RyaW5nZXRpdGxlbnN0YXJ0VGltZXN0YW1wa2Rlc2NyaXB0aW9ueBpUaW1lIHN0YW1wIG9mIHdvcmsgc3RhcnRlZG9kZWxpdmVyYWJsZUhhc2ijZHR5cGVmc3RyaW5nZXRpdGxlb2RlbGl2ZXJhYmxlSGFzaGtkZXNjcmlwdGlvbnhCaGFzaCB2YWx1ZSBvZiBhbGwgd29yayBkZXNjcmlwdGlvbnMoc3VtbWFyeSwgZGV0YWlsLCBkZWxpdmVyYWJsZXMpb2lzc3VlZFRpbWVzdGFtcKNkdHlwZWZzdHJpbmdldGl0bGVvaXNzdWVkVGltZXN0YW1wa2Rlc2NyaXB0aW9ueCRUaW1lIHN0YW1wIG9mIHRyYW5zYWN0aW9uIG9jY3VycmVuY2VvcmVsYXRlZFR4SGFzaGVzpGR0eXBlZWFycmF5ZWl0ZW1zoWR0eXBlZnN0cmluZ2V0aXRsZW9yZWxhdGVkVHhIYXNoZXNrdW5pcXVlSXRlbXP1cHJlbGF0ZWRBZGRyZXNzZXOkZHR5cGVlYXJyYXllaXRlbXOhZHR5cGVmc3RyaW5nZXRpdGxlbnJlbGF0ZWRBZGRyZXNza3VuaXF1ZUl0ZW1z9XRhZGRpdGlvbmFsUHJvcGVydGllc/RmaGVhZGVyomZ1bmlxdWVwc3hzMnlJZ3RCR1p2Qms4QWtjb250cm9sbGVyc4F4OGRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03",
        },
      ],
      dependencies: {},
      version:
        "k3y52l7qbv1frxlqnopwhl2tpnw4inawt7upovcr7d0dqtws5t9tn99pigg7ehlvk",
    },
    kjzl6cwe1jw14aaegoi4ca3lo85qlo3wwvql7cp5un7d3l51qyhbu88giq67u63: {
      alias: "OldWorkCredentials",
      commits: [
        {
          jws: {
            payload: "AXESIE23FD-iKeiIWH-EUqhiuPdK3z_0FkRStYF-RMa1v3Zw",
            signatures: [
              {
                signature:
                  "OLPqgx2UsmnozmfQOElYjTOeWcuHEWMc5oxJlaJM0TowX-kfNFlGqz8sP4Wh4CtEFbzcW4PNEkLukR_OVCVXCg",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreicnw4kd7irj5cefq74ekkugfohxjlpt75awirjllal6itdllp3woa",
          },
          linkedBlock:
            "omRkYXRhpWR0eXBlZm9iamVjdGV0aXRsZW9Xb3JrQ3JlZGVudGlhbHNnJHNjaGVtYXgnaHR0cDovL2pzb24tc2NoZW1hLm9yZy9kcmFmdC0wNy9zY2hlbWEjanByb3BlcnRpZXOhb1dvcmtDcmVkZW50aWFsc6NkdHlwZWVhcnJheWVpdGVtc6RkdHlwZWZvYmplY3RldGl0bGVyV29ya0NyZWRlbnRpYWxJdGVtanByb3BlcnRpZXOrYmlkpGR0eXBlZnN0cmluZ2dwYXR0ZXJueBxeY2VyYW1pYzovLy4rKFw/dmVyc2lvbj0uKyk/aCRjb21tZW50eFVjaXA4ODpyZWY6Y2VyYW1pYzovL2szeTUybDdxYnYxZnJ4bHFub3B3aGwydHBudzRpbmF3dDd1cG92Y3I3ZDBkcXR3czV0OXRuOTlwaWdnN2VobHZraW1heExlbmd0aBjIZWdlbnJlo2R0eXBlZnN0cmluZ2V0aXRsZWVnZW5yZWtkZXNjcmlwdGlvbngfd29yayBnZW5yZSBlLmcsIERldiwgRGVzaWduIGV0Y2Z0eEhhc2ijZHR5cGVmc3RyaW5nZXRpdGxlZnR4SGFzaGtkZXNjcmlwdGlvbndoYXNoIG9mIHRoZSB0cmFuc2FjdGlvbmdpc1BheWVyo2R0eXBlZ2Jvb2xlYW5ldGl0bGVnaXNQYXllcmtkZXNjcmlwdGlvbngbd2hldGhlciBvciBub3QgRElEIGlzIHBheWVyZ3N1bW1hcnmjZHR5cGVmc3RyaW5nZXRpdGxlZ3N1bW1hcnlrZGVzY3JpcHRpb25sd29yayBzdW1tYXJ5aHBsYXRmb3Jto2R0eXBlZnN0cmluZ2V0aXRsZWhwbGF0Zm9ybWtkZXNjcmlwdGlvbngtYSB0cmFuc2FjdGlvbiBwbGF0Zm9ybSBpZiBleGlzdHMgZS5nLCBnaXRjb2luaWZpYXRWYWx1ZaNkdHlwZWZzdHJpbmdldGl0bGVldmFsdWVrZGVzY3JpcHRpb254KWZpYXQgcHJpY2UgYXQgdGhlIHRpbWUgb2YgdGhlIHRyYW5zYWN0aW9uamlzVmVyaWZpZWSjZHR5cGVnYm9vbGVhbmV0aXRsZWppc1ZlcmlmaWVka2Rlc2NyaXB0aW9ueD9FaXRoZXIgYm90aCBzaWduYXR1cmVzIGV4aXN0IG9yIHRoZSB0cmFuc2FjdGlvbiBpcyB2aWEgcGxhdGZvcm1sZGVsaXZlcmFibGVzpGR0eXBlZWFycmF5ZWl0ZW1zo2R0eXBlZm9iamVjdGV0aXRsZW9kZWxpdmVyYWJsZUl0ZW1qcHJvcGVydGllc6JldmFsdWWjZHR5cGVmc3RyaW5nZXRpdGxlZXZhbHVla2Rlc2NyaXB0aW9ueB93b3JrIGRlbGl2ZXJhYmxlIHZhbHVlKHVybC9jaWQpZmZvcm1hdKNkdHlwZWZzdHJpbmdldGl0bGVmZm9ybWF0a2Rlc2NyaXB0aW9ueB5jdXJyZW50IGZvcm1hdHMgYXJlIHVybCBvciBjaWRldGl0bGVsZGVsaXZlcmFibGVza2Rlc2NyaXB0aW9ucXdvcmsgZGVsaXZlcmFibGVzb2RlbGl2ZXJhYmxlSGFzaKNkdHlwZWZzdHJpbmdldGl0bGVvZGVsaXZlcmFibGVIYXNoa2Rlc2NyaXB0aW9ueEJoYXNoIHZhbHVlIG9mIGFsbCB3b3JrIGRlc2NyaXB0aW9ucyhzdW1tYXJ5LCBkZXRhaWwsIGRlbGl2ZXJhYmxlcylvaXNzdWVkVGltZXN0YW1wo2R0eXBlZnN0cmluZ2V0aXRsZW9pc3N1ZWRUaW1lc3RhbXBrZGVzY3JpcHRpb254JFRpbWUgc3RhbXAgb2YgdHJhbnNhY3Rpb24gb2NjdXJyZW5jZWtkZXNjcmlwdGlvbnJ3b3JrIGNyZWRlbnRpYWwgaWRldGl0bGVvV29ya0NyZWRlbnRpYWxzdGFkZGl0aW9uYWxQcm9wZXJ0aWVz9GZoZWFkZXKiZnVuaXF1ZXAzTDR4bUwvTDFvT1dJb0s2a2NvbnRyb2xsZXJzgXg4ZGlkOmtleTp6Nk1rcHptenR4dlBZU0NaOHR6U0NCUWhzUFR4Rml4VWtyekNEaFNLQmJRNlN2bTc=",
        },
      ],
      dependencies: {
        "WorkCredentials.id": [
          "kjzl6cwe1jw145vb7ew4q0yjx67dvegzlx08k5qbq0m6l2x7kffzbzoeeos1h3n",
        ],
      },
      version:
        "k3y52l7qbv1fryh5yum8uvbtm4a0t63fu1tp2saaxlx0d5ibwfp786yk5h647qj9c",
    },
    kjzl6cwe1jw149186zrc44qhcykaaga3ofgbx0swz876di9oqgdxucj1had1hri: {
      alias: "WorkCredential",
      commits: [
        {
          jws: {
            payload: "AXESIKRPSAkBMA2qMYk0qA5O9YeRpnqAWG_QrmCHxH2cNlH1",
            signatures: [
              {
                signature:
                  "UX8DrVvw4baUJVqnXQOj0QzFWGY33_32626Q6kSQ0vrbMQiOOUVdzipTnbmTTBQPcPSets4ugtrGid26iMQqDQ",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreifej5easajqbwvddcjuvahe55mhsgthvacyn7ik4yehyr6zynsr6u",
          },
          linkedBlock:
            "omRkYXRhpmR0eXBlZm9iamVjdGV0aXRsZW5Xb3JrQ3JlZGVudGlhbGckc2NoZW1heCdodHRwOi8vanNvbi1zY2hlbWEub3JnL2RyYWZ0LTA3L3NjaGVtYSNocmVxdWlyZWSCYmlkZ3N1YmplY3RqcHJvcGVydGllc6ViaWSiZHR5cGVmc3RyaW5naW1heExlbmd0aBjwZ3N1YmplY3SjZHR5cGVmb2JqZWN0ZXRpdGxla1dvcmtTdWJqZWN0anByb3BlcnRpZXOkYnR4pWR0eXBlZm9iamVjdGV0aXRsZWtUcmFuc2FjdGlvbmhyZXF1aXJlZIFmdHhIYXNoanByb3BlcnRpZXOtYnRvo2R0eXBlZnN0cmluZ2V0aXRsZWJ0b2tkZXNjcmlwdGlvbm1wYXllZSBhZGRyZXNzZGZyb22jZHR5cGVmc3RyaW5nZXRpdGxlZGZyb21rZGVzY3JpcHRpb25tcGF5ZXIgYWRkcmVzc2V2YWx1ZaNkdHlwZWZzdHJpbmdldGl0bGVldmFsdWVrZGVzY3JpcHRpb25qcGFpZCB2YWx1ZWZ0eEhhc2ijZHR5cGVmc3RyaW5nZXRpdGxlZnR4SGFzaGtkZXNjcmlwdGlvbndoYXNoIG9mIHRoZSB0cmFuc2FjdGlvbmdpc1BheWVyo2R0eXBlZ2Jvb2xlYW5ldGl0bGVnaXNQYXllcmtkZXNjcmlwdGlvbngbd2hldGhlciBvciBub3QgRElEIGlzIHBheWVyaWZpYXRWYWx1ZaNkdHlwZWZzdHJpbmdldGl0bGVldmFsdWVrZGVzY3JpcHRpb254KWZpYXQgcHJpY2UgYXQgdGhlIHRpbWUgb2YgdGhlIHRyYW5zYWN0aW9uaW5ldHdvcmtJZKNkdHlwZWZudW1iZXJldGl0bGVpbmV0d29ya0lka2Rlc2NyaXB0aW9ueB1uZXR3b3JrIGlkIG9mIHRoZSB0cmFuc2FjdGlvbmpmaWF0U3ltYm9so2R0eXBlZnN0cmluZ2V0aXRsZWpmaWF0U3ltYm9sa2Rlc2NyaXB0aW9ueBpjdXJyZW50bHkgb25seSBzdXBwb3J0IFVTRGt0b2tlblN5bWJvbKNkdHlwZWZzdHJpbmdldGl0bGVrdG9rZW5TeW1ib2xrZGVzY3JpcHRpb25xcGFpZCB0b2tlbiBzeW1ib2xsdG9rZW5EZWNpbWFso2R0eXBlZm51bWJlcmV0aXRsZWx0b2tlbkRlY2ltYWxrZGVzY3JpcHRpb25ycGFpZCB0b2tlbiBkZWNpbWFsb2lzc3VlZFRpbWVzdGFtcKNkdHlwZWZzdHJpbmdldGl0bGVvaXNzdWVkVGltZXN0YW1wa2Rlc2NyaXB0aW9ueCRUaW1lIHN0YW1wIG9mIHRyYW5zYWN0aW9uIG9jY3VycmVuY2VvcmVsYXRlZFR4SGFzaGVzpGR0eXBlZWFycmF5ZWl0ZW1zoWR0eXBlZnN0cmluZ2V0aXRsZW9yZWxhdGVkVHhIYXNoZXNrdW5pcXVlSXRlbXP1cHJlbGF0ZWRBZGRyZXNzZXOkZHR5cGVlYXJyYXllaXRlbXOhZHR5cGVmc3RyaW5nZXRpdGxlbnJlbGF0ZWRBZGRyZXNza3VuaXF1ZUl0ZW1z9XRhZGRpdGlvbmFsUHJvcGVydGllc/Rkd29ya6VkdHlwZWZvYmplY3RldGl0bGVkV29ya2hyZXF1aXJlZINiaWRnc3VtbWFyeWhpc3N1ZWRBdGpwcm9wZXJ0aWVzrmJpZKJkdHlwZWZzdHJpbmdpbWF4TGVuZ3RoGPBjdGF4o2R0eXBlZnN0cmluZ2V0aXRsZWV2YWx1ZWtkZXNjcmlwdGlvbmpwYWlkIHZhbHVlZHRhZ3OlZHR5cGVlYXJyYXllaXRlbXOhZHR5cGVmc3RyaW5nZXRpdGxlZHRhZ3NrZGVzY3JpcHRpb25pd29yayB0YWdza3VuaXF1ZUl0ZW1z9WVnZW5yZaNkdHlwZWZzdHJpbmdldGl0bGVlZ2VucmVrZGVzY3JpcHRpb254H3dvcmsgZ2VucmUgZS5nLCBEZXYsIERlc2lnbiBldGNldmFsdWWjZHR5cGVmc3RyaW5nZXRpdGxlZXZhbHVla2Rlc2NyaXB0aW9uanBhaWQgdmFsdWVmZGV0YWlso2R0eXBlZnN0cmluZ2V0aXRsZWZkZXRhaWxrZGVzY3JpcHRpb25rd29yayBkZXRhaWxnam9iVHlwZaNkdHlwZWZzdHJpbmdldGl0bGVnam9iVHlwZWtkZXNjcmlwdGlvbngxY3VycmVudGx5IHN1cHBvcnQgZnVsbHRpbWUsIHBhcnR0aW1lLCBhbmQgb25ldGltZWdzdW1tYXJ5o2R0eXBlZnN0cmluZ2V0aXRsZWdzdW1tYXJ5a2Rlc2NyaXB0aW9ubHdvcmsgc3VtbWFyeWhpc3N1ZWRBdKNkdHlwZWZzdHJpbmdldGl0bGVoaXNzdWVkQXRrZGVzY3JpcHRpb25vQ1JETCBpc3N1ZSBkYXRlaHBsYXRmb3Jto2R0eXBlZnN0cmluZ2V0aXRsZWhwbGF0Zm9ybWtkZXNjcmlwdGlvbngtYSB0cmFuc2FjdGlvbiBwbGF0Zm9ybSBpZiBleGlzdHMgZS5nLCBnaXRjb2lubGVuZFRpbWVzdGFtcKNkdHlwZWZzdHJpbmdldGl0bGVsZW5kVGltZXN0YW1wa2Rlc2NyaXB0aW9ueBhUaW1lIHN0YW1wIG9mIHdvcmsgZW5kZWRsb3JnYW5pemF0aW9uo2R0eXBlZnN0cmluZ2V0aXRsZWxvcmdhbml6YXRpb25rZGVzY3JpcHRpb254GG9yZ2FuaXphdGlvbiBJZCBpZiBleGlzdG5zdGFydFRpbWVzdGFtcKNkdHlwZWZzdHJpbmdldGl0bGVuc3RhcnRUaW1lc3RhbXBrZGVzY3JpcHRpb254GlRpbWUgc3RhbXAgb2Ygd29yayBzdGFydGVkb2RlbGl2ZXJhYmxlSGFzaKNkdHlwZWZzdHJpbmdldGl0bGVvZGVsaXZlcmFibGVIYXNoa2Rlc2NyaXB0aW9ueEJoYXNoIHZhbHVlIG9mIGFsbCB3b3JrIGRlc2NyaXB0aW9ucyhzdW1tYXJ5LCBkZXRhaWwsIGRlbGl2ZXJhYmxlcyl0YWRkaXRpb25hbFByb3BlcnRpZXP1ZmNsaWVudKNkdHlwZWZvYmplY3RldGl0bGVmY2xpZW50anByb3BlcnRpZXOiZXZhbHVlo2R0eXBlZnN0cmluZ2V0aXRsZWV2YWx1ZWtkZXNjcmlwdGlvbmtDbGllbnQgSW5mb2Zmb3JtYXSjZHR5cGVmc3RyaW5nZXRpdGxlZmZvcm1hdGtkZXNjcmlwdGlvbmtuYW1lIG9yIERJRGxkZWxpdmVyYWJsZXOjZHR5cGVlYXJyYXllaXRlbXOkZHR5cGVmb2JqZWN0ZXRpdGxlb2RlbGl2ZXJhYmxlSXRlbWpwcm9wZXJ0aWVzomV2YWx1ZaNkdHlwZWZzdHJpbmdldGl0bGVldmFsdWVrZGVzY3JpcHRpb254H3dvcmsgZGVsaXZlcmFibGUgdmFsdWUodXJsL2NpZClmZm9ybWF0o2R0eXBlZnN0cmluZ2V0aXRsZWZmb3JtYXRrZGVzY3JpcHRpb254HmN1cnJlbnQgZm9ybWF0cyBhcmUgdXJsIG9yIGNpZHRhZGRpdGlvbmFsUHJvcGVydGllc/RldGl0bGVsZGVsaXZlcmFibGVzaWNyZWF0ZWRBdKJkdHlwZWZzdHJpbmdldGl0bGVpY3JlYXRlZEF0aXNpZ25hdHVyZaRkdHlwZWZvYmplY3RldGl0bGVqc2lnbmF0dXJlc2pwcm9wZXJ0aWVzpWhhZ2VudFNpZ6NkdHlwZWZzdHJpbmdldGl0bGVoYWdlbnRTaWdrZGVzY3JpcHRpb25yc2lnbmF0dXJlIG9mIGFnZW50aWhvbGRlclNpZ6NkdHlwZWZzdHJpbmdldGl0bGVpaG9sZGVyU2lna2Rlc2NyaXB0aW9uc3NpZ25hdHVyZSBvZiBob2xkZXJqcGFydG5lclNpZ6NkdHlwZWZzdHJpbmdldGl0bGVqcGFydG5lclNpZ2tkZXNjcmlwdGlvbnRzaWduYXR1cmUgb2YgcGFydG5lcmthZ2VudFNpZ25lcqNkdHlwZWZzdHJpbmdldGl0bGVrYWdlbnRTaWduZXJrZGVzY3JpcHRpb25sRElEIG9mIGFnZW50bXBhcnRuZXJTaWduZXKjZHR5cGVmc3RyaW5nZXRpdGxlbXBhcnRuZXJTaWduZXJrZGVzY3JpcHRpb25sRElEIG9mIGFnZW50dGFkZGl0aW9uYWxQcm9wZXJ0aWVz9Gl1cGRhdGVkQXSiZHR5cGVmc3RyaW5nZXRpdGxlaXVwZGF0ZWRBdHRhZGRpdGlvbmFsUHJvcGVydGllc/RmaGVhZGVyomZ1bmlxdWVwZ0VJV0hZTGw5eUtkWU1Ebmtjb250cm9sbGVyc4F4OGRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03",
        },
      ],
      dependencies: {},
      version:
        "k3y52l7qbv1fry88q9qae5dobg5s96bru5pw4qtpmiib1c1wvw4j4nt3eixoqmbk0",
    },
    kjzl6cwe1jw14689zjvn5y2wlxe8w5b0d5zncri6hhhl5pcurd2ee8joqhssn11: {
      alias: "VerifiableWorkCredential",
      commits: [
        {
          jws: {
            payload: "AXESIDMsgHQIOocNXGGjTHeYf65odJ_II1qlwpfpBgFj9NaR",
            signatures: [
              {
                signature:
                  "9oOURuOVSiKENL1uVB4NIAroQUOUV7NZ8WktsFE7W8MBahFAZjv6SHt7rcYQqDhpbBgev95NVWiyr_mASTIMCA",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreibtfsahicb2q4gvyyndjr3zq75onb2j7sbdlks4ff7jayawh5gwse",
          },
          linkedBlock:
            "omRkYXRhpmR0eXBlZm9iamVjdGV0aXRsZXgYVmVyaWZpYWJsZVdvcmtDcmVkZW50aWFsZyRzY2hlbWF4J2h0dHA6Ly9qc29uLXNjaGVtYS5vcmcvZHJhZnQtMDcvc2NoZW1hI2hyZXF1aXJlZIdoQGNvbnRleHRkdHlwZWJpZGZpc3N1ZXJxY3JlZGVudGlhbFN1YmplY3RwY3JlZGVudGlhbFNjaGVtYWxpc3N1YW5jZURhdGVqcHJvcGVydGllc6xiaWSiZHR5cGVmc3RyaW5naW1heExlbmd0aBjwZHR5cGWiZHR5cGVlYXJyYXllaXRlbXOhZHR5cGVmc3RyaW5nZXByb29mo2R0eXBlZm9iamVjdGhyZXF1aXJlZIFkdHlwZWpwcm9wZXJ0aWVzp2R0eXBloWR0eXBlZnN0cmluZ2ZlaXA3MTKkZHR5cGVmb2JqZWN0aHJlcXVpcmVkg2Zkb21haW5ldHlwZXNrcHJpbWFyeVR5cGVqcHJvcGVydGllc6NldHlwZXOhZHR5cGVmb2JqZWN0ZmRvbWFpbqRkdHlwZWZvYmplY3RocmVxdWlyZWSDZ2NoYWluSWRkbmFtZWd2ZXJzaW9uanByb3BlcnRpZXOkZG5hbWWhZHR5cGVmc3RyaW5nZ2NoYWluSWShZHR5cGVnaW50ZWdlcmd2ZXJzaW9uoWR0eXBlZnN0cmluZ3F2ZXJpZnlpbmdDb250cmFjdKFkdHlwZWZzdHJpbmd0YWRkaXRpb25hbFByb3BlcnRpZXP0a3ByaW1hcnlUeXBloWR0eXBlZnN0cmluZ3RhZGRpdGlvbmFsUHJvcGVydGllc/RnY3JlYXRlZKFkdHlwZWZzdHJpbmdqcHJvb2ZWYWx1ZaFkdHlwZWZzdHJpbmdscHJvb2ZQdXJwb3NloWR0eXBlZnN0cmluZ29ldGhlcmV1bUFkZHJlc3OhZHR5cGVmc3RyaW5ncnZlcmlmaWNhdGlvbk1ldGhvZKFkdHlwZWZzdHJpbmdmaXNzdWVyo2R0eXBlZm9iamVjdGhyZXF1aXJlZIFiaWRqcHJvcGVydGllc6JiaWShZHR5cGVmc3RyaW5nb2V0aGVyZXVtQWRkcmVzc6FkdHlwZWZzdHJpbmdoQGNvbnRleHSiZHR5cGVlYXJyYXllaXRlbXOhZHR5cGVmc3RyaW5naGV2aWRlbmNlo2R0eXBlZWFycmF5ZWl0ZW1zpWR0eXBlZm9iamVjdGV0aXRsZWhFdmlkZW5jZWhyZXF1aXJlZIJiaWRkdHlwZWpwcm9wZXJ0aWVzp2JpZKFkdHlwZWZzdHJpbmdkaXRlbaFlb25lT2aDpWR0eXBlZm9iamVjdGV0aXRsZWtUcmFuc2FjdGlvbmhyZXF1aXJlZIFmdHhIYXNoanByb3BlcnRpZXOtYnRvo2R0eXBlZnN0cmluZ2V0aXRsZWJ0b2tkZXNjcmlwdGlvbm1wYXllZSBhZGRyZXNzZGZyb22jZHR5cGVmc3RyaW5nZXRpdGxlZGZyb21rZGVzY3JpcHRpb25tcGF5ZXIgYWRkcmVzc2V2YWx1ZaNkdHlwZWZzdHJpbmdldGl0bGVldmFsdWVrZGVzY3JpcHRpb25qcGFpZCB2YWx1ZWZ0eEhhc2ijZHR5cGVmc3RyaW5nZXRpdGxlZnR4SGFzaGtkZXNjcmlwdGlvbndoYXNoIG9mIHRoZSB0cmFuc2FjdGlvbmdpc1BheWVyo2R0eXBlZ2Jvb2xlYW5ldGl0bGVnaXNQYXllcmtkZXNjcmlwdGlvbngbd2hldGhlciBvciBub3QgRElEIGlzIHBheWVyaWZpYXRWYWx1ZaNkdHlwZWZzdHJpbmdldGl0bGVldmFsdWVrZGVzY3JpcHRpb254KWZpYXQgcHJpY2UgYXQgdGhlIHRpbWUgb2YgdGhlIHRyYW5zYWN0aW9uaW5ldHdvcmtJZKNkdHlwZWZudW1iZXJldGl0bGVpbmV0d29ya0lka2Rlc2NyaXB0aW9ueB1uZXR3b3JrIGlkIG9mIHRoZSB0cmFuc2FjdGlvbmpmaWF0U3ltYm9so2R0eXBlZnN0cmluZ2V0aXRsZWpmaWF0U3ltYm9sa2Rlc2NyaXB0aW9ueBpjdXJyZW50bHkgb25seSBzdXBwb3J0IFVTRGt0b2tlblN5bWJvbKNkdHlwZWZzdHJpbmdldGl0bGVrdG9rZW5TeW1ib2xrZGVzY3JpcHRpb25xcGFpZCB0b2tlbiBzeW1ib2xsdG9rZW5EZWNpbWFso2R0eXBlZm51bWJlcmV0aXRsZWx0b2tlbkRlY2ltYWxrZGVzY3JpcHRpb25ycGFpZCB0b2tlbiBkZWNpbWFsb2lzc3VlZFRpbWVzdGFtcKNkdHlwZWZzdHJpbmdldGl0bGVvaXNzdWVkVGltZXN0YW1wa2Rlc2NyaXB0aW9ueCRUaW1lIHN0YW1wIG9mIHRyYW5zYWN0aW9uIG9jY3VycmVuY2VvcmVsYXRlZFR4SGFzaGVzpGR0eXBlZWFycmF5ZWl0ZW1zoWR0eXBlZnN0cmluZ2V0aXRsZW9yZWxhdGVkVHhIYXNoZXNrdW5pcXVlSXRlbXP1cHJlbGF0ZWRBZGRyZXNzZXOkZHR5cGVlYXJyYXllaXRlbXOhZHR5cGVmc3RyaW5nZXRpdGxlbnJlbGF0ZWRBZGRyZXNza3VuaXF1ZUl0ZW1z9XRhZGRpdGlvbmFsUHJvcGVydGllc/SjZHR5cGVlYXJyYXllaXRlbXOkZHR5cGVmb2JqZWN0ZXRpdGxlb2RlbGl2ZXJhYmxlSXRlbWpwcm9wZXJ0aWVzomV2YWx1ZaNkdHlwZWZzdHJpbmdldGl0bGVldmFsdWVrZGVzY3JpcHRpb254H3dvcmsgZGVsaXZlcmFibGUgdmFsdWUodXJsL2NpZClmZm9ybWF0o2R0eXBlZnN0cmluZ2V0aXRsZWZmb3JtYXRrZGVzY3JpcHRpb254HmN1cnJlbnQgZm9ybWF0cyBhcmUgdXJsIG9yIGNpZHRhZGRpdGlvbmFsUHJvcGVydGllc/RldGl0bGVsZGVsaXZlcmFibGVzpGR0eXBlZm9iamVjdGV0aXRsZWpzaWduYXR1cmVzanByb3BlcnRpZXOlaGFnZW50U2lno2R0eXBlZnN0cmluZ2V0aXRsZWhhZ2VudFNpZ2tkZXNjcmlwdGlvbnJzaWduYXR1cmUgb2YgYWdlbnRpaG9sZGVyU2lno2R0eXBlZnN0cmluZ2V0aXRsZWlob2xkZXJTaWdrZGVzY3JpcHRpb25zc2lnbmF0dXJlIG9mIGhvbGRlcmpwYXJ0bmVyU2lno2R0eXBlZnN0cmluZ2V0aXRsZWpwYXJ0bmVyU2lna2Rlc2NyaXB0aW9udHNpZ25hdHVyZSBvZiBwYXJ0bmVya2FnZW50U2lnbmVyo2R0eXBlZnN0cmluZ2V0aXRsZWthZ2VudFNpZ25lcmtkZXNjcmlwdGlvbmxESUQgb2YgYWdlbnRtcGFydG5lclNpZ25lcqNkdHlwZWZzdHJpbmdldGl0bGVtcGFydG5lclNpZ25lcmtkZXNjcmlwdGlvbmxESUQgb2YgYWdlbnR0YWRkaXRpb25hbFByb3BlcnRpZXP0ZHR5cGWiZHR5cGVlYXJyYXllaXRlbXOhZHR5cGVmc3RyaW5naHZlcmlmaWVyoWR0eXBlZnN0cmluZ29zdWJqZWN0UHJlc2VuY2WhZHR5cGVmc3RyaW5ncGRvY3VtZW50UHJlc2VuY2WhZHR5cGVmc3RyaW5ncGV2aWRlbmNlRG9jdW1lbnShZHR5cGVmc3RyaW5ndGFkZGl0aW9uYWxQcm9wZXJ0aWVz9WV0aXRsZWlFdmlkZW5jZXNpdXBkYXRlZEF0omR0eXBlZnN0cmluZ2V0aXRsZWl1cGRhdGVkQXRsaXNzdWFuY2VEYXRloWR0eXBlZnN0cmluZ25leHBpcmF0aW9uRGF0ZaFkdHlwZWZzdHJpbmdwY3JlZGVudGlhbFNjaGVtYaRkdHlwZWZvYmplY3RocmVxdWlyZWSCYmlkZHR5cGVqcHJvcGVydGllc6JiaWShZHR5cGVmc3RyaW5nZHR5cGWhZHR5cGVmc3RyaW5ndGFkZGl0aW9uYWxQcm9wZXJ0aWVz9HBjcmVkZW50aWFsU3RhdHVzpGR0eXBlZm9iamVjdGhyZXF1aXJlZIJiaWRkdHlwZWpwcm9wZXJ0aWVzomJpZKFkdHlwZWZzdHJpbmdkdHlwZaFkdHlwZWZzdHJpbmd0YWRkaXRpb25hbFByb3BlcnRpZXP0cWNyZWRlbnRpYWxTdWJqZWN0pGR0eXBlZm9iamVjdGhyZXF1aXJlZIFiaWRqcHJvcGVydGllc6FiaWSiZHR5cGVmc3RyaW5naW1heExlbmd0aBjwdGFkZGl0aW9uYWxQcm9wZXJ0aWVz9XRhZGRpdGlvbmFsUHJvcGVydGllc/RmaGVhZGVyomZ1bmlxdWVwT0N2Wk82RVk5djY4d2lqbmtjb250cm9sbGVyc4F4OGRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03",
        },
      ],
      dependencies: {},
      version:
        "k3y52l7qbv1frxoav0td0qacnvxhb8lqalmli2rla4cd2gkbeqkx2d8rzwekrnrb4",
    },
    kjzl6cwe1jw1498dutckdgtk8zwkiwxlcmlca1k221zgjprv4afjltmt6t42gaw: {
      alias: "HeldWorkCredentials",
      commits: [
        {
          jws: {
            payload: "AXESIF_n3GeaIHV4Zgr9BZSsnzzegS4Q0pcKkBgzqy1kdoAT",
            signatures: [
              {
                signature:
                  "hCDu7o955GDLmHlQT0aBpOth3xu05zguG0lyw7_99CeyF9GUWqMeYfiV3WCEehhOTv04Fca1T8H2i6cN-eAQBA",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreic747ogpgraov4gmcx5awkkzhz432as4egss4fjagbtvmwwi5uacm",
          },
          linkedBlock:
            "omRkYXRhpGR0eXBlZm9iamVjdGV0aXRsZXNIZWxkV29ya0NyZWRlbnRpYWxzZyRzY2hlbWF4J2h0dHA6Ly9qc29uLXNjaGVtYS5vcmcvZHJhZnQtMDcvc2NoZW1hI2pwcm9wZXJ0aWVzoWRoZWxkpGR0eXBlZWFycmF5ZWl0ZW1zpGR0eXBlZnN0cmluZ2dwYXR0ZXJueBxeY2VyYW1pYzovLy4rKFw/dmVyc2lvbj0uKyk/aCRjb21tZW50eFVjaXA4ODpyZWY6Y2VyYW1pYzovL2szeTUybDdxYnYxZnJ5ODhxOXFhZTVkb2JnNXM5NmJydTVwdzRxdHBtaWliMWMxd3Z3NGo0bnQzZWl4b3FtYmswaW1heExlbmd0aBjIZ2RlZmF1bHSAdGFkZGl0aW9uYWxQcm9wZXJ0aWVz9GZoZWFkZXKiZnVuaXF1ZXBickwwdjBVUnBRRWp0aU5va2NvbnRyb2xsZXJzgXg4ZGlkOmtleTp6Nk1rcHptenR4dlBZU0NaOHR6U0NCUWhzUFR4Rml4VWtyekNEaFNLQmJRNlN2bTc=",
        },
      ],
      dependencies: {
        held: [
          "kjzl6cwe1jw149186zrc44qhcykaaga3ofgbx0swz876di9oqgdxucj1had1hri",
        ],
      },
      version:
        "k3y52l7qbv1fry9nmj4pcvrm7zzblyi6vtsnrbf2mmm45o7a5ai6jf6q7kf0xfxfk",
    },
    kjzl6cwe1jw14ap0caa4xeav6psx9vmlpbe4nlv9o7pvzjy27bic2nbkrn9h2jt: {
      alias: "HeldVerifiableWorkCredentials",
      commits: [
        {
          jws: {
            payload: "AXESIPstXghOizr9vg-X1zzR2QKxWguIV02EZh9uUFyoNfp3",
            signatures: [
              {
                signature:
                  "xv4Wr9fuDA2r87HQ9oexKLrSf5JP2nW6WHo3UMBZpebqTFPKejO4eudZnVIo8hB5aQjrYaKcxZKhVz2qvLESBA",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreih3fvpaqtulhl634d4x246ndwicwfnaxccxjwcgmh3okbokqnp2o4",
          },
          linkedBlock:
            "omRkYXRhpGR0eXBlZm9iamVjdGV0aXRsZXgdSGVsZFZlcmlmaWFibGVXb3JrQ3JlZGVudGlhbHNnJHNjaGVtYXgnaHR0cDovL2pzb24tc2NoZW1hLm9yZy9kcmFmdC0wNy9zY2hlbWEjanByb3BlcnRpZXOhZGhlbGSkZHR5cGVlYXJyYXllaXRlbXOkZHR5cGVmc3RyaW5nZ3BhdHRlcm54HF5jZXJhbWljOi8vLisoXD92ZXJzaW9uPS4rKT9oJGNvbW1lbnR4VWNpcDg4OnJlZjpjZXJhbWljOi8vazN5NTJsN3FidjFmcnhvYXYwdGQwcWFjbnZ4aGI4bHFhbG1saTJybGE0Y2QyZ2tiZXFreDJkOHJ6d2Vrcm5yYjRpbWF4TGVuZ3RoGMhnZGVmYXVsdIB0YWRkaXRpb25hbFByb3BlcnRpZXP0ZmhlYWRlcqJmdW5pcXVlcFpxK0k3aUxQdWpBa1Y1RkNrY29udHJvbGxlcnOBeDhkaWQ6a2V5Ono2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNw==",
        },
      ],
      dependencies: {
        held: [
          "kjzl6cwe1jw14689zjvn5y2wlxe8w5b0d5zncri6hhhl5pcurd2ee8joqhssn11",
        ],
      },
      version:
        "k3y52l7qbv1fryk1ufd431hp9rrhom8wqc10h3vics6w3gtu7o1udutubolfde4u8",
    },
    kjzl6cwe1jw149f2jawys4owro5do0pjqlb3yzdrmzllqehw2lagh8g72cvyexb: {
      alias: "Organization",
      commits: [
        {
          jws: {
            payload: "AXESINJy6wvRMxQy53OFDc5QxQNqTIcAVVsII0VAzO0Ysxa1",
            signatures: [
              {
                signature:
                  "xYL98YsriphvxPBT3zx9jNGbI5adpbZob5hRZb8gMjilel8YxES0xjQx2tO-nAqvIXfzkJc_3C8FmgCvrE1uBg",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreigsolvqxujtcqzoo44fbxhfbridnjgioacvlmecgrkaztwrrmywwu",
          },
          linkedBlock:
            "omRkYXRhpmR0eXBlZm9iamVjdGV0aXRsZWxPcmdhbml6YXRpb25nJHNjaGVtYXgnaHR0cDovL2pzb24tc2NoZW1hLm9yZy9kcmFmdC0wNy9zY2hlbWEjaHJlcXVpcmVkgmVhZG1pbmRuYW1lanByb3BlcnRpZXOmZGRlc2OiZHR5cGVmc3RyaW5nZXRpdGxlZGRlc2NkaWNvbqJkdHlwZWZzdHJpbmdldGl0bGVkaWNvbmRuYW1lo2R0eXBlZnN0cmluZ2V0aXRsZWRuYW1laW1heExlbmd0aBjwZWFkbWluo2R0eXBlZnN0cmluZ2V0aXRsZWVhZG1pbmltYXhMZW5ndGgY8GljcmVhdGVkQXSiZHR5cGVmc3RyaW5nZXRpdGxlaWNyZWF0ZWRBdHJvcmJpc1NvY2lhbEdyb3VwSWSiZHR5cGVmc3RyaW5nZXRpdGxlcm9yYmlzU29jaWFsR3JvdXBJZHRhZGRpdGlvbmFsUHJvcGVydGllc/VmaGVhZGVyomZ1bmlxdWVwODQvenB0dmpTVHZ5ekpMT2tjb250cm9sbGVyc4F4OGRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03",
        },
      ],
      dependencies: {},
      version:
        "k3y52l7qbv1fryaz619mfc1d50rq96t1od3j08rlwjh5mjr382fed6k368rn8q4u8",
    },
    kjzl6cwe1jw1480w5onypdmxpisnhyjy547v92vcbmv2rnk4qhduop65ec58tiw: {
      alias: "MemberShip",
      commits: [
        {
          jws: {
            payload: "AXESIJEVRV2J9Vtz7TiTCJ06wWCKyDAvcNkBZwcDMyVXKbpq",
            signatures: [
              {
                signature:
                  "JpeWKCu4yjSpuJFhvQYNCrHBFlbqhz3hovpquHnACDZZtFSHDNbB-GvfQ1bxnW1Zqqa2bch7iAbVLHOcO8G2Dw",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreiercvcv3cpvlnz62oetbcotvqlarledal3q3eawobydgmsvokn2ni",
          },
          linkedBlock:
            "omRkYXRhpmR0eXBlZm9iamVjdGV0aXRsZWpNZW1iZXJzaGlwZyRzY2hlbWF4J2h0dHA6Ly9qc29uLXNjaGVtYS5vcmcvZHJhZnQtMDcvc2NoZW1hI2hyZXF1aXJlZIJub3JnYW5pemF0aW9uSWRkbmFtZWpwcm9wZXJ0aWVzpWRkZXNjomR0eXBlZnN0cmluZ2V0aXRsZWRkZXNjZGljb26iZHR5cGVmc3RyaW5nZXRpdGxlZGljb25kbmFtZaNkdHlwZWZzdHJpbmdldGl0bGVkbmFtZWltYXhMZW5ndGgY8GljcmVhdGVkQXSiZHR5cGVmc3RyaW5nZXRpdGxlaWNyZWF0ZWRBdG5vcmdhbml6YXRpb25JZKNkdHlwZWZzdHJpbmdldGl0bGVub3JnYW5pemF0aW9uSWRpbWF4TGVuZ3RoGPB0YWRkaXRpb25hbFByb3BlcnRpZXP1ZmhlYWRlcqJmdW5pcXVlcEZmc3JuMVZ4Z1JKRS9RejlrY29udHJvbGxlcnOBeDhkaWQ6a2V5Ono2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNw==",
        },
      ],
      dependencies: {},
      version:
        "k3y52l7qbv1fry12cofeesgz3phnr3ppusdzy8kevmqkzonj5obmi7mzqdydapybk",
    },
    kjzl6cwe1jw148b8v5ecscj1qi39wljx64bjh0xym7l105wd2u06jhxwrg83y7u: {
      alias: "MembershipSubject",
      commits: [
        {
          jws: {
            payload: "AXESIGHj7B4RBP2qktpCXE8w5kVqg-EwwlbZIe9DDkO9ByJS",
            signatures: [
              {
                signature:
                  "HwyDEeYetmPIQhjU_bfDKM6eQGYXfPy7SlsXkA5_MLdK3eq-V7sismpQ0A9VNOAkyhbIGfaJ1ocU4z8H4zmhBQ",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreidb4pwb4eie7wvjfwsclrhtbzsfnkb6cmgck3msd32dbzb32bzcki",
          },
          linkedBlock:
            "omRkYXRhpmR0eXBlZm9iamVjdGV0aXRsZXFNZW1iZXJzaGlwU3ViamVjdGckc2NoZW1heCdodHRwOi8vanNvbi1zY2hlbWEub3JnL2RyYWZ0LTA3L3NjaGVtYSNocmVxdWlyZWSDYmlkbm9yZ2FuaXphdGlvbklkbG1lbWJlcnNoaXBJZGpwcm9wZXJ0aWVzo2JpZKNkdHlwZWZzdHJpbmdldGl0bGViaWRpbWF4TGVuZ3RoGPBsbWVtYmVyc2hpcElko2R0eXBlZnN0cmluZ2V0aXRsZWxtZW1iZXJzaGlwSWRpbWF4TGVuZ3RoGPBub3JnYW5pemF0aW9uSWSjZHR5cGVmc3RyaW5nZXRpdGxlbm9yZ2FuaXphdGlvbklkaW1heExlbmd0aBjwdGFkZGl0aW9uYWxQcm9wZXJ0aWVz9WZoZWFkZXKiZnVuaXF1ZXBRREs5MWhWYXREUFk3REExa2NvbnRyb2xsZXJzgXg4ZGlkOmtleTp6Nk1rcHptenR4dlBZU0NaOHR6U0NCUWhzUFR4Rml4VWtyekNEaFNLQmJRNlN2bTc=",
        },
      ],
      dependencies: {},
      version:
        "k3y52l7qbv1fry33z1ie2xl3gcgnaft9nviq2h2pi5xxj55y505dainl4z7do3bpc",
    },
    kjzl6cwe1jw14aba0fn1d87bmieoeaich2ooa3654o4uz9kvij4f5ukhel3yx2z: {
      alias: "VerifiableMembershipSubjectCredential",
      commits: [
        {
          jws: {
            payload: "AXESIKWm_5id4OADJRf-vGPp2DSXSBKCGEbfcweWCeku7hOs",
            signatures: [
              {
                signature:
                  "XrbniP5zI5GOq5iCHIXeO8-clr-wy4IRUiUs8eJMLnxun_bjvpqSyL-V8vWPXKqu378mMMulCj9NqyMFYVaoAA",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreiffu37zrhpa4abskf76xrr6twbus5ebfaqyi3pxgb4wbhus53qtvq",
          },
          linkedBlock:
            "omRkYXRhpmR0eXBlZm9iamVjdGV0aXRsZXglVmVyaWZpYWJsZU1lbWJlcnNoaXBTdWJqZWN0Q3JlZGVudGlhbGckc2NoZW1heCdodHRwOi8vanNvbi1zY2hlbWEub3JnL2RyYWZ0LTA3L3NjaGVtYSNocmVxdWlyZWSHaEBjb250ZXh0ZHR5cGViaWRmaXNzdWVycWNyZWRlbnRpYWxTdWJqZWN0cGNyZWRlbnRpYWxTY2hlbWFsaXNzdWFuY2VEYXRlanByb3BlcnRpZXOsYmlkomR0eXBlZnN0cmluZ2ltYXhMZW5ndGgY8GR0eXBlomR0eXBlZWFycmF5ZWl0ZW1zoWR0eXBlZnN0cmluZ2Vwcm9vZqNkdHlwZWZvYmplY3RocmVxdWlyZWSBZHR5cGVqcHJvcGVydGllc6dkdHlwZaFkdHlwZWZzdHJpbmdmZWlwNzEypGR0eXBlZm9iamVjdGhyZXF1aXJlZINmZG9tYWluZXR5cGVza3ByaW1hcnlUeXBlanByb3BlcnRpZXOjZXR5cGVzoWR0eXBlZm9iamVjdGZkb21haW6kZHR5cGVmb2JqZWN0aHJlcXVpcmVkg2djaGFpbklkZG5hbWVndmVyc2lvbmpwcm9wZXJ0aWVzpGRuYW1loWR0eXBlZnN0cmluZ2djaGFpbklkoWR0eXBlZ2ludGVnZXJndmVyc2lvbqFkdHlwZWZzdHJpbmdxdmVyaWZ5aW5nQ29udHJhY3ShZHR5cGVmc3RyaW5ndGFkZGl0aW9uYWxQcm9wZXJ0aWVz9GtwcmltYXJ5VHlwZaFkdHlwZWZzdHJpbmd0YWRkaXRpb25hbFByb3BlcnRpZXP0Z2NyZWF0ZWShZHR5cGVmc3RyaW5nanByb29mVmFsdWWhZHR5cGVmc3RyaW5nbHByb29mUHVycG9zZaFkdHlwZWZzdHJpbmdvZXRoZXJldW1BZGRyZXNzoWR0eXBlZnN0cmluZ3J2ZXJpZmljYXRpb25NZXRob2ShZHR5cGVmc3RyaW5nZmlzc3VlcqNkdHlwZWZvYmplY3RocmVxdWlyZWSBYmlkanByb3BlcnRpZXOiYmlkoWR0eXBlZnN0cmluZ29ldGhlcmV1bUFkZHJlc3OhZHR5cGVmc3RyaW5naEBjb250ZXh0omR0eXBlZWFycmF5ZWl0ZW1zoWR0eXBlZnN0cmluZ2hldmlkZW5jZaNkdHlwZWVhcnJheWVpdGVtc6VkdHlwZWZvYmplY3RldGl0bGVtQmFzaWNFdmlkZW5jZWhyZXF1aXJlZIJiaWRkdHlwZWpwcm9wZXJ0aWVzp2JpZKFkdHlwZWZzdHJpbmdkaXRlbaFkdHlwZWZvYmplY3RkdHlwZaJkdHlwZWVhcnJheWVpdGVtc6FkdHlwZWZzdHJpbmdodmVyaWZpZXKhZHR5cGVmc3RyaW5nb3N1YmplY3RQcmVzZW5jZaFkdHlwZWZzdHJpbmdwZG9jdW1lbnRQcmVzZW5jZaFkdHlwZWZzdHJpbmdwZXZpZGVuY2VEb2N1bWVudKFkdHlwZWZzdHJpbmd0YWRkaXRpb25hbFByb3BlcnRpZXP1ZXRpdGxlbkJhc2ljRXZpZGVuY2VzaXVwZGF0ZWRBdKJkdHlwZWZzdHJpbmdldGl0bGVpdXBkYXRlZEF0bGlzc3VhbmNlRGF0ZaFkdHlwZWZzdHJpbmduZXhwaXJhdGlvbkRhdGWhZHR5cGVmc3RyaW5ncGNyZWRlbnRpYWxTY2hlbWGkZHR5cGVmb2JqZWN0aHJlcXVpcmVkgmJpZGR0eXBlanByb3BlcnRpZXOiYmlkoWR0eXBlZnN0cmluZ2R0eXBloWR0eXBlZnN0cmluZ3RhZGRpdGlvbmFsUHJvcGVydGllc/RwY3JlZGVudGlhbFN0YXR1c6RkdHlwZWZvYmplY3RocmVxdWlyZWSCYmlkZHR5cGVqcHJvcGVydGllc6JiaWShZHR5cGVmc3RyaW5nZHR5cGWhZHR5cGVmc3RyaW5ndGFkZGl0aW9uYWxQcm9wZXJ0aWVz9HFjcmVkZW50aWFsU3ViamVjdKVkdHlwZWZvYmplY3RldGl0bGV4G1ZlcmlmaWFibGVNZW1iZXJzaGlwU3ViamVjdGhyZXF1aXJlZINiaWRwb3JnYW5pemF0aW9uTmFtZW5tZW1iZXJzaGlwTmFtZWpwcm9wZXJ0aWVzp2JpZKJkdHlwZWZzdHJpbmdpbWF4TGVuZ3RoGPBsbWVtYmVyc2hpcElko2R0eXBlZnN0cmluZ2V0aXRsZWxtZW1iZXJzaGlwSWRpbWF4TGVuZ3RoGPBubWVtYmVyc2hpcEljb26iZHR5cGVmc3RyaW5nZXRpdGxlZGljb25ubWVtYmVyc2hpcE5hbWWjZHR5cGVmc3RyaW5nZXRpdGxlbm1lbWJlcnNoaXBOYW1laW1heExlbmd0aBjwbm9yZ2FuaXphdGlvbklko2R0eXBlZnN0cmluZ2V0aXRsZW5vcmdhbml6YXRpb25JZGltYXhMZW5ndGgY8HBvcmdhbml6YXRpb25JY29uomR0eXBlZnN0cmluZ2V0aXRsZWRpY29ucG9yZ2FuaXphdGlvbk5hbWWjZHR5cGVmc3RyaW5nZXRpdGxlcG9yZ2FuaXphdGlvbk5hbWVpbWF4TGVuZ3RoGPB0YWRkaXRpb25hbFByb3BlcnRpZXP1dGFkZGl0aW9uYWxQcm9wZXJ0aWVz9GZoZWFkZXKiZnVuaXF1ZXByZ0M0M3JhR1ltTG02OUsza2NvbnRyb2xsZXJzgXg4ZGlkOmtleTp6Nk1rcHptenR4dlBZU0NaOHR6U0NCUWhzUFR4Rml4VWtyekNEaFNLQmJRNlN2bTc=",
        },
      ],
      dependencies: {},
      version:
        "k3y52l7qbv1fryhc7737tq2c2o2wdhmqgpf3gnqjoh7mkas4g3rzftldnrq48b94w",
    },
    kjzl6cwe1jw149vojsmk1318knt785su1vhcyruwg8kv4lj2e0jpdsr5m0hypfa: {
      alias: "CreatedOrganizations",
      commits: [
        {
          jws: {
            payload: "AXESIGka5ILt7rd_q1PboQ3Vs82gubfscbkx2iDdh2EHUctS",
            signatures: [
              {
                signature:
                  "a6RRHM0KtGGkqJNUUPQeySBJocf7q2g9xW9e4GF80qUkRWnTaXQAVttBrh3jQgKQ6hQoxvR6ihs7svCXaUinAg",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreidjdlsif3pow572wu63ueg5lm6nuc43p3drxey5uig5q5qqouolki",
          },
          linkedBlock:
            "omRkYXRhpGR0eXBlZm9iamVjdGV0aXRsZXRDcmVhdGVkT3JnYW5pemF0aW9uc2ckc2NoZW1heCdodHRwOi8vanNvbi1zY2hlbWEub3JnL2RyYWZ0LTA3L3NjaGVtYSNqcHJvcGVydGllc6FnY3JlYXRlZKRkdHlwZWVhcnJheWVpdGVtc6RkdHlwZWZzdHJpbmdncGF0dGVybngcXmNlcmFtaWM6Ly8uKyhcP3ZlcnNpb249LispP2gkY29tbWVudHhVY2lwODg6cmVmOmNlcmFtaWM6Ly9rM3k1Mmw3cWJ2MWZyeWF6NjE5bWZjMWQ1MHJxOTZ0MW9kM2owOHJsd2poNW1qcjM4MmZlZDZrMzY4cm44cTR1OGltYXhMZW5ndGgYyGdkZWZhdWx0gHRhZGRpdGlvbmFsUHJvcGVydGllc/RmaGVhZGVyomZ1bmlxdWVweVRjSk5RTmtjdldOYlVORGtjb250cm9sbGVyc4F4OGRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03",
        },
      ],
      dependencies: {
        created: [
          "kjzl6cwe1jw149f2jawys4owro5do0pjqlb3yzdrmzllqehw2lagh8g72cvyexb",
        ],
      },
      version:
        "k3y52l7qbv1frye9akrkefpksyxbne191pbvg7a3qrh0dcp3kznw4i4h3wjjqssn4",
    },
    kjzl6cwe1jw145v6teow5he0slc8uhn88c72yuba2bb39mj1jwusevl5h2cqj6r: {
      alias: "CreatedMemberships",
      commits: [
        {
          jws: {
            payload: "AXESIAK6NA0vaWYx95NLLkUqW0ckMA9JbBn2U8N7vTrPcwfE",
            signatures: [
              {
                signature:
                  "m8kmeK9o5gnCd-K0HdwWCwaDEP1UChLi9T06WPnAcKvc8r4AoqLqT8qkzf8p2Yk4z_P2W6ZhyKf9Lxw6zFY-Bg",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreiacxi2a2l3jmyy7pe2lfzcsuw2heqya6slmdh3fhq33xu5m64yhyq",
          },
          linkedBlock:
            "omRkYXRhpGR0eXBlZm9iamVjdGV0aXRsZXJDcmVhdGVkTWVtYmVyc2hpcHNnJHNjaGVtYXgnaHR0cDovL2pzb24tc2NoZW1hLm9yZy9kcmFmdC0wNy9zY2hlbWEjanByb3BlcnRpZXOhZ2NyZWF0ZWSkZHR5cGVlYXJyYXllaXRlbXOkZHR5cGVmc3RyaW5nZ3BhdHRlcm54HF5jZXJhbWljOi8vLisoXD92ZXJzaW9uPS4rKT9oJGNvbW1lbnR4VWNpcDg4OnJlZjpjZXJhbWljOi8vazN5NTJsN3FidjFmcnkxMmNvZmVlc2d6M3BobnIzcHB1c2R6eThrZXZtcWt6b25qNW9ibWk3bXpxZHlkYXB5YmtpbWF4TGVuZ3RoGMhnZGVmYXVsdIB0YWRkaXRpb25hbFByb3BlcnRpZXP0ZmhlYWRlcqJmdW5pcXVlcFBiUnYwZmw3MkVBSUUzSWRrY29udHJvbGxlcnOBeDhkaWQ6a2V5Ono2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNw==",
        },
      ],
      dependencies: {
        created: [
          "kjzl6cwe1jw1480w5onypdmxpisnhyjy547v92vcbmv2rnk4qhduop65ec58tiw",
        ],
      },
      version:
        "k3y52l7qbv1frxlpsh4h0mznpnbr2wth6jaqd3rk7kgev8g7f1lmy1smexcqkog00",
    },
    kjzl6cwe1jw14a5ln3mav0w0rashbvfiz26ejlr53sd6kpfpibscok09tptqcg5: {
      alias: "CreatedMembershipSubjects",
      commits: [
        {
          jws: {
            payload: "AXESIKxVIwwdcXyDo-1bn8ge0nq8VDMZGZ3IJsMpGb2xcdhh",
            signatures: [
              {
                signature:
                  "9vgzn0kTtCZlN1ZbwtCWFwvBtYB-aOBJsQH5ENe4Mt7pq2hTkZhoqS8CuD6usPzLDNiTaq0DG8k2qfw76vAsCw",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreifmkurqyhlrpsb2h3k3t7eb5ut2xrkdggiztxecnqzjdg63c4oyme",
          },
          linkedBlock:
            "omRkYXRhpGR0eXBlZm9iamVjdGV0aXRsZXgZQ3JlYXRlZE1lbWJlcnNoaXBTdWJqZWN0c2ckc2NoZW1heCdodHRwOi8vanNvbi1zY2hlbWEub3JnL2RyYWZ0LTA3L3NjaGVtYSNqcHJvcGVydGllc6FnY3JlYXRlZKRkdHlwZWVhcnJheWVpdGVtc6RkdHlwZWZzdHJpbmdncGF0dGVybngcXmNlcmFtaWM6Ly8uKyhcP3ZlcnNpb249LispP2gkY29tbWVudHhVY2lwODg6cmVmOmNlcmFtaWM6Ly9rM3k1Mmw3cWJ2MWZyeTMzejFpZTJ4bDNnY2duYWZ0OW52aXEyaDJwaTV4eGo1NXk1MDVkYWlubDR6N2RvM2JwY2ltYXhMZW5ndGgYyGdkZWZhdWx0gHRhZGRpdGlvbmFsUHJvcGVydGllc/RmaGVhZGVyomZ1bmlxdWVwZ3R1b2d0QnhCWUJ3Rm1vaWtjb250cm9sbGVyc4F4OGRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03",
        },
      ],
      dependencies: {
        created: [
          "kjzl6cwe1jw148b8v5ecscj1qi39wljx64bjh0xym7l105wd2u06jhxwrg83y7u",
        ],
      },
      version:
        "k3y52l7qbv1fryg7tw9ql8mbpe4qj8fiexbhjfep0axpqr8vpebtm6m9xvbnfcirk",
    },
    kjzl6cwe1jw148pgha8c89hqfs1i45zn9uvtse76xop9mwv3j5udknyvz0ansdb: {
      alias: "IssuedVerifiableMembershipSubjects",
      commits: [
        {
          jws: {
            payload: "AXESIMklvT6p76gqwX-J4a5kKdyd_Qh49rS7tfdB8DUimzJD",
            signatures: [
              {
                signature:
                  "6S72YKH5OEwh_g9_Fbm8dAO-Yoc-duRBa1holoI3uBewV4zrVt7cQDEbSTr0H0inUPWz7yq_l04Q3VdUqDMICQ",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreigjew6t5kppvavmc74j4gxgiko4tx6qq6hwws53l52b6a2sfgzsim",
          },
          linkedBlock:
            "omRkYXRhpGR0eXBlZm9iamVjdGV0aXRsZXgiSXNzdWVkVmVyaWZpYWJsZU1lbWJlcnNoaXBTdWJqZWN0c2ckc2NoZW1heCdodHRwOi8vanNvbi1zY2hlbWEub3JnL2RyYWZ0LTA3L3NjaGVtYSNqcHJvcGVydGllc6FmaXNzdWVkpGR0eXBlZWFycmF5ZWl0ZW1zpGR0eXBlZnN0cmluZ2dwYXR0ZXJueBxeY2VyYW1pYzovLy4rKFw/dmVyc2lvbj0uKyk/aCRjb21tZW50eFVjaXA4ODpyZWY6Y2VyYW1pYzovL2szeTUybDdxYnYxZnJ5aGM3NzM3dHEyYzJvMndkaG1xZ3BmM2ducWpvaDdta2FzNGczcnpmdGxkbnJxNDhiOTR3aW1heExlbmd0aBjIZ2RlZmF1bHSAdGFkZGl0aW9uYWxQcm9wZXJ0aWVz9GZoZWFkZXKiZnVuaXF1ZXBxL05wMHViUG8xcktHRjJta2NvbnRyb2xsZXJzgXg4ZGlkOmtleTp6Nk1rcHptenR4dlBZU0NaOHR6U0NCUWhzUFR4Rml4VWtyekNEaFNLQmJRNlN2bTc=",
        },
      ],
      dependencies: {
        issued: [
          "kjzl6cwe1jw14aba0fn1d87bmieoeaich2ooa3654o4uz9kvij4f5ukhel3yx2z",
        ],
      },
      version:
        "k3y52l7qbv1fry5x16wrayri407eotmlhi3mbtwz5bjnoixp549k0iyg3cy3t5qm8",
    },
    kjzl6cwe1jw1497wtiqux9gkrwy1gc9nkbt0gu18bd6hvddttzbpkhltdg7q0or: {
      alias: "HeldVerifiableMembershipSubjects",
      commits: [
        {
          jws: {
            payload: "AXESIP-vfkPgjFAf9qYHyYg40waRYROHZWvJWqz-BHelSl-Y",
            signatures: [
              {
                signature:
                  "xFK_RyMSxRXXEzJpdcpiqYfyqBifzFPrLJsTqOcCbQC-IIga70HvaGfPLqiE5e_iSYaovSHhnqgH6dOjQ7YpAA",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreih7v57ehyemkap7njqhzgedruygsfqrhb3fnpevvlh6ar32kss7ta",
          },
          linkedBlock:
            "omRkYXRhpGR0eXBlZm9iamVjdGV0aXRsZXggSGVsZFZlcmlmaWFibGVNZW1iZXJzaGlwU3ViamVjdHNnJHNjaGVtYXgnaHR0cDovL2pzb24tc2NoZW1hLm9yZy9kcmFmdC0wNy9zY2hlbWEjanByb3BlcnRpZXOhZGhlbGSkZHR5cGVlYXJyYXllaXRlbXOkZHR5cGVmc3RyaW5nZ3BhdHRlcm54HF5jZXJhbWljOi8vLisoXD92ZXJzaW9uPS4rKT9oJGNvbW1lbnR4VWNpcDg4OnJlZjpjZXJhbWljOi8vazN5NTJsN3FidjFmcnloYzc3Mzd0cTJjMm8yd2RobXFncGYzZ25xam9oN21rYXM0ZzNyemZ0bGRucnE0OGI5NHdpbWF4TGVuZ3RoGMhnZGVmYXVsdIB0YWRkaXRpb25hbFByb3BlcnRpZXP0ZmhlYWRlcqJmdW5pcXVlcEwwdTdUeFpXVzRIcGVicEtrY29udHJvbGxlcnOBeDhkaWQ6a2V5Ono2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNw==",
        },
      ],
      dependencies: {
        held: [
          "kjzl6cwe1jw14aba0fn1d87bmieoeaich2ooa3654o4uz9kvij4f5ukhel3yx2z",
        ],
      },
      version:
        "k3y52l7qbv1fry9k9dxazwj9vqia2c78nkjybbpkr4tq7336c5779tp74vnax0w00",
    },
  },
  definitions: {
    kjzl6cwe1jw145cjbeko9kil8g9bxszjhyde21ob8epxuxkaon1izyqsu8wgcic: {
      alias: "basicProfile",
      commits: [
        {
          jws: {
            payload: "AXESIHQlyxvLYuiHGvjCREWnS0HxQV6z7lfPRe4mRdViHjWU",
            signatures: [
              {
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3NOWUU2V3RNWjNXTGJQd2NwOUdtN2RUN0ozRHNOUDhhdVFOblBwUUJ1MzdBI3o2TWtzTllFNld0TVozV0xiUHdjcDlHbTdkVDdKM0RzTlA4YXVRTm5QcFFCdTM3QSJ9",
                signature:
                  "619cILy5j-zkYwz0pJ2cYnPnVqmYf6YJcuqxcLoaRqvCL341HOoTm0siEOG_Jmu1alT_UUuah1dlrqubgIe1BA",
              },
            ],
            link: "bafyreiduexfrxs3c5cdrv6gcirc2os2b6fav5m7ok7hul3rgixkwehrvsq",
          },
          linkedBlock:
            "o2RkYXRho2RuYW1lbUJhc2ljIFByb2ZpbGVmc2NoZW1heEtjZXJhbWljOi8vazN5NTJsN3FidjFmcnh0NzA2Z3Fmem1xNmNicWRrcHR6azh1dWRhcnlobGtmNmx5OXZ4MjFocXU0cjZrMWpxaW9rZGVzY3JpcHRpb254I0Jhc2ljIHByb2ZpbGUgaW5mb3JtYXRpb24gZm9yIGEgRElEZmhlYWRlcqJmc2NoZW1heEtjZXJhbWljOi8vazN5NTJsN3FidjFmcnkxZnA0czBud2RhcmgwdmFodXNhcnBwb3NnZXZ5MHBlbWl5a3ltZDJvcmQ2c3d0aGFyY3drY29udHJvbGxlcnOBeDhkaWQ6a2V5Ono2TWtzTllFNld0TVozV0xiUHdjcDlHbTdkVDdKM0RzTlA4YXVRTm5QcFFCdTM3QWdkb2N0eXBlZHRpbGU=",
        },
      ],
      schema: "kjzl6cwe1jw146x1pnq7vg4t0lwea84s2a8u58tt1clfmv7mrju3l2341klxyu6",
      version:
        "k3y52l7qbv1frxi15d3n0k1w703mcwe4qnof7yjwvvsogryobz7uv3r2l33as8ydc",
    },
    kjzl6cwe1jw149z4rvwzi56mjjukafta30kojzktd9dsrgqdgz4wlnceu59f95f: {
      alias: "cryptoAccounts",
      commits: [
        {
          jws: {
            payload: "AXESIILyy1_0_U8dXhlxpyWOMxBDKion3W2mMbfS5WmuL-Xb",
            signatures: [
              {
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3NOWUU2V3RNWjNXTGJQd2NwOUdtN2RUN0ozRHNOUDhhdVFOblBwUUJ1MzdBI3o2TWtzTllFNld0TVozV0xiUHdjcDlHbTdkVDdKM0RzTlA4YXVRTm5QcFFCdTM3QSJ9",
                signature:
                  "IKbedepBBpEdE9DKx6WjCYYyFdo9mfgv422_vLlT8vusBGM-P7YiEn6t3iYHrMi-dzrnE4Lp8wY0aqhFnDuWCA",
              },
            ],
            link: "bafyreiec6lfv75h5j4ov4glru4sy4myqimvcuj65nwtddn6s4vu24l7f3m",
          },
          linkedBlock:
            "o2RkYXRho2RuYW1lb0NyeXB0byBBY2NvdW50c2ZzY2hlbWF4S2NlcmFtaWM6Ly9rM3k1Mmw3cWJ2MWZyeXB1c3NqYnVycWc0ZnlreXl5Y2Z1MHA5em5jNzVsdjJ0NWNnNHhhc2xoYWdrZDdoN21rZ2tkZXNjcmlwdGlvbngiQ3J5cHRvIGFjY291bnRzIGxpbmtlZCB0byB5b3VyIERJRGZoZWFkZXKiZnNjaGVtYXhLY2VyYW1pYzovL2szeTUybDdxYnYxZnJ5MWZwNHMwbndkYXJoMHZhaHVzYXJwcG9zZ2V2eTBwZW1peWt5bWQyb3JkNnN3dGhhcmN3a2NvbnRyb2xsZXJzgXg4ZGlkOmtleTp6Nk1rc05ZRTZXdE1aM1dMYlB3Y3A5R203ZFQ3SjNEc05QOGF1UU5uUHBRQnUzN0FnZG9jdHlwZWR0aWxl",
        },
      ],
      schema: "kjzl6cwe1jw14bie69guriwn4hsto1gdh5q1ytpwi84xkz2b9oxkw9qs7d3v3vv",
      version:
        "k3y52l7qbv1fryextyaykh0v4b15ca8g7pg32m500uaq4jazjspuvty09idf0h2io",
    },
    kjzl6cwe1jw146zfmqa10a5x1vry6au3t362p44uttz4l0k4hi88o41zplhmxnf: {
      alias: "alsoKnownAs",
      commits: [
        {
          jws: {
            payload: "AXESIOWmE0CF2MHEz0PmBVBOkCvzCVXNE5Mg-894RRaXaZJe",
            signatures: [
              {
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3NOWUU2V3RNWjNXTGJQd2NwOUdtN2RUN0ozRHNOUDhhdVFOblBwUUJ1MzdBI3o2TWtzTllFNld0TVozV0xiUHdjcDlHbTdkVDdKM0RzTlA4YXVRTm5QcFFCdTM3QSJ9",
                signature:
                  "GurUQxUEzBdidKjlPdv09NLD-aG787p47ghUMW2PA5av49soVKe3I4xntq4OzXHXm-weLzuMFUFxkURvgUDuAA",
              },
            ],
            link: "bafyreihfuyjubboyyhcm6q7gavie5ebl6mevltitsmqpxt3yiuljo2msly",
          },
          linkedBlock:
            "o2RkYXRho2RuYW1lbUFsc28gS25vd24gQXNmc2NoZW1heEtjZXJhbWljOi8vazN5NTJsN3FidjFmcnlvanQ4bjhjdzJrMDRwOXdwNjdseTU5aXdxczY1ZGVqc281NjZmaWo1d3NkcmI4NzF5aW9rZGVzY3JpcHRpb254ZEFsc28gS25vd24gQXMgaXMgYSBkYXRhIHNldCB0aGF0IHN0b3JlcyBhIGxpc3Qgb2YgYWNjb3VudHMgdGhhdCBhcmUgcHVibGljbHkgbGlua2VkIHRvIHRoZSB1c2VycyBESURmaGVhZGVyomZzY2hlbWF4S2NlcmFtaWM6Ly9rM3k1Mmw3cWJ2MWZyeTFmcDRzMG53ZGFyaDB2YWh1c2FycHBvc2dldnkwcGVtaXlreW1kMm9yZDZzd3RoYXJjd2tjb250cm9sbGVyc4F4OGRpZDprZXk6ejZNa3NOWUU2V3RNWjNXTGJQd2NwOUdtN2RUN0ozRHNOUDhhdVFOblBwUUJ1MzdBZ2RvY3R5cGVkdGlsZQ==",
        },
      ],
      schema: "kjzl6cwe1jw14bbsas0m29cxrnsyesfp0v45gz9l44p3wpw86j21kio8onil8po",
      version:
        "k3y52l7qbv1frxtnz5mvb60a31dyr0t232uj76lej855slfz3whmlngu5y0tf3aio",
    },
    kjzl6cwe1jw1491q8fzv2iy6qk20bi4y2deifkxut9njnuztq822duslj2m3wuv: {
      alias: "OldWorkCredential",
      commits: [
        {
          jws: {
            payload: "AXESICnJ_8dSganKVK5Ip-FKrX8Rsz-zqckA8VRRAW465xIh",
            signatures: [
              {
                signature:
                  "gc-xPn6q9FYeUhmU42OISvEAhM62Za9rovYz4gL7vW8dYl1YM7NTBrzfYUhopA4gOn-vT_I6f5HhcpfcpFPDAg",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreibjzh74ouubvhffjlsiu7quvll7cgzt7m5jzeapcvcrafxdvzysee",
          },
          linkedBlock:
            "omRkYXRho2RuYW1lbndvcmtDcmVkZW50aWFsZnNjaGVtYXhLY2VyYW1pYzovL2szeTUybDdxYnYxZnJ4bHFub3B3aGwydHBudzRpbmF3dDd1cG92Y3I3ZDBkcXR3czV0OXRuOTlwaWdnN2VobHZra2Rlc2NyaXB0aW9ubndvcmtDcmVkZW50aWFsZmhlYWRlcqNmc2NoZW1heEtjZXJhbWljOi8vazN5NTJsN3FidjFmcnkxZnA0czBud2RhcmgwdmFodXNhcnBwb3NnZXZ5MHBlbWl5a3ltZDJvcmQ2c3d0aGFyY3dmdW5pcXVlcFNkMTg4MHAzcWZ5TndFUGFrY29udHJvbGxlcnOBeDhkaWQ6a2V5Ono2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNw==",
        },
      ],
      schema: "kjzl6cwe1jw145vb7ew4q0yjx67dvegzlx08k5qbq0m6l2x7kffzbzoeeos1h3n",
      version:
        "k3y52l7qbv1fry8cak1r0xyr3wuma9sz68vb72swr44nftoerehaoyizd3ml7tngg",
    },
    kjzl6cwe1jw1468dfi4s2xvft87skxxlp43pz9sscd897fw1zbl1k507u6z7pqv: {
      alias: "OldWorkCredentials",
      commits: [
        {
          jws: {
            payload: "AXESIP_am1xpEcDbmPpl_r5eT0I_Do6lWlpc7VhFGdfeu7s8",
            signatures: [
              {
                signature:
                  "8lu7Em1Uy4BZ1pYfxspablLUlh9Pt7huFDbv41TZNU1YNSuGLG6Kw17sSYQg2-FLBLF_VTqbG-CjSmvJicnTAQ",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreih73knvy2irydnzr6tf727f4t2ch4hi5jk2ljoo2wcfdhl55o53hq",
          },
          linkedBlock:
            "omRkYXRho2RuYW1lb3dvcmtDcmVkZW50aWFsc2ZzY2hlbWF4S2NlcmFtaWM6Ly9rM3k1Mmw3cWJ2MWZyeWg1eXVtOHV2YnRtNGEwdDYzZnUxdHAyc2FheGx4MGQ1aWJ3ZnA3ODZ5azVoNjQ3cWo5Y2tkZXNjcmlwdGlvbm93b3JrQ3JlZGVudGlhbHNmaGVhZGVyo2ZzY2hlbWF4S2NlcmFtaWM6Ly9rM3k1Mmw3cWJ2MWZyeTFmcDRzMG53ZGFyaDB2YWh1c2FycHBvc2dldnkwcGVtaXlreW1kMm9yZDZzd3RoYXJjd2Z1bmlxdWVwVUJTWnNHaGVwaWlmaVV4aGtjb250cm9sbGVyc4F4OGRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03",
        },
      ],
      schema: "kjzl6cwe1jw14aaegoi4ca3lo85qlo3wwvql7cp5un7d3l51qyhbu88giq67u63",
      version:
        "k3y52l7qbv1frxobji8xzowvkfuff8xayal6gqtopjy2pgwzy36dn37ljqpmev30g",
    },
    kjzl6cwe1jw146377rldghygh6zfm3xvcyelwvp168fz8xrixin13nlv3gbsqxn: {
      alias: "workCredential",
      commits: [
        {
          jws: {
            payload: "AXESIFY33IMr8DJ9_OPinw0al0FIt97qhmOyRsUMEiaJ1uG_",
            signatures: [
              {
                signature:
                  "bQLo0EBcIT8U5_GuMduN9O9uDuGN-dTnhelgtNzUObyaV4d7g1d-8--adAfmtFjyaH0-a1J-awOVeDrTnSC0Bw",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreicwg7oigk7qgj67zy7ct4grvf2bjc3552ugmozenrimcititvxbx4",
          },
          linkedBlock:
            "omRkYXRho2RuYW1lbndvcmtDcmVkZW50aWFsZnNjaGVtYXhLY2VyYW1pYzovL2szeTUybDdxYnYxZnJ5ODhxOXFhZTVkb2JnNXM5NmJydTVwdzRxdHBtaWliMWMxd3Z3NGo0bnQzZWl4b3FtYmswa2Rlc2NyaXB0aW9ubndvcmtDcmVkZW50aWFsZmhlYWRlcqNmc2NoZW1heEtjZXJhbWljOi8vazN5NTJsN3FidjFmcnkxZnA0czBud2RhcmgwdmFodXNhcnBwb3NnZXZ5MHBlbWl5a3ltZDJvcmQ2c3d0aGFyY3dmdW5pcXVlcEp4YmFOUlFjSlNDMjJSSmZrY29udHJvbGxlcnOBeDhkaWQ6a2V5Ono2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNw==",
        },
      ],
      schema: "kjzl6cwe1jw149186zrc44qhcykaaga3ofgbx0swz876di9oqgdxucj1had1hri",
      version:
        "k3y52l7qbv1frxnarb87zpbp169nz180v04nvtte0cc1mnk3qmcjrtzvh4k3wfj7k",
    },
    kjzl6cwe1jw147fn4dc76zgt24lhk604iso4y4re6bqeanjgw01y63vi11r3giy: {
      alias: "verifiableWorkCredential",
      commits: [
        {
          jws: {
            payload: "AXESICCbNYdtHgi_c3RpDcs6dtw_hsP0KaDbiH0cMU5L94GX",
            signatures: [
              {
                signature:
                  "0NJeXV52tX3p0ncqiVjC543POMCeM-Ye2UKJwm9qyyOU31a8nXJb-RsyyIdAI_vLMmRfz0tWBRggGUgYbG3pDg",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreibatm2yo3i6bc7xg5djbxftu5w4h6dmh5bjudnyq7i4gfhex54bs4",
          },
          linkedBlock:
            "omRkYXRho2RuYW1leBh2ZXJpZmlhYmxlV29ya0NyZWRlbnRpYWxmc2NoZW1heEtjZXJhbWljOi8vazN5NTJsN3FidjFmcnhvYXYwdGQwcWFjbnZ4aGI4bHFhbG1saTJybGE0Y2QyZ2tiZXFreDJkOHJ6d2Vrcm5yYjRrZGVzY3JpcHRpb254GHZlcmlmaWFibGVXb3JrQ3JlZGVudGlhbGZoZWFkZXKjZnNjaGVtYXhLY2VyYW1pYzovL2szeTUybDdxYnYxZnJ5MWZwNHMwbndkYXJoMHZhaHVzYXJwcG9zZ2V2eTBwZW1peWt5bWQyb3JkNnN3dGhhcmN3ZnVuaXF1ZXBwbDdrZG5QOEFUU1BTcjJUa2NvbnRyb2xsZXJzgXg4ZGlkOmtleTp6Nk1rcHptenR4dlBZU0NaOHR6U0NCUWhzUFR4Rml4VWtyekNEaFNLQmJRNlN2bTc=",
        },
      ],
      schema: "kjzl6cwe1jw14689zjvn5y2wlxe8w5b0d5zncri6hhhl5pcurd2ee8joqhssn11",
      version:
        "k3y52l7qbv1frxwv8f2ur5o7in4osveow5nvn6pusszfpnreg3kduzfk07ggolips",
    },
    kjzl6cwe1jw148j7rhydrzziz2oa54q84dpg5047k3meq8nfbasaipafyy812b2: {
      alias: "heldWorkCredentials",
      commits: [
        {
          jws: {
            payload: "AXESIGDLuKddP48vUBnCmMeeHTYZWRkV3aQLqm04QMsOT9SV",
            signatures: [
              {
                signature:
                  "rSggTEJWNQo0lq-53epCiemPKsJTmZJHwhVi6aX15u5sziuzTv1f5wwRTLfKoOthdy5pJ_8NUwf00Q_tO5R6Cg",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreidazo4koxj7r4xvagoctddz4hjwdfmrsfo5uqf2u3jyidfq4t6usu",
          },
          linkedBlock:
            "omRkYXRho2RuYW1lc2hlbGRXb3JrQ3JlZGVudGlhbHNmc2NoZW1heEtjZXJhbWljOi8vazN5NTJsN3FidjFmcnk5bm1qNHBjdnJtN3p6Ymx5aTZ2dHNucmJmMm1tbTQ1bzdhNWFpNmpmNnE3a2YweGZ4ZmtrZGVzY3JpcHRpb25zaGVsZFdvcmtDcmVkZW50aWFsc2ZoZWFkZXKjZnNjaGVtYXhLY2VyYW1pYzovL2szeTUybDdxYnYxZnJ5MWZwNHMwbndkYXJoMHZhaHVzYXJwcG9zZ2V2eTBwZW1peWt5bWQyb3JkNnN3dGhhcmN3ZnVuaXF1ZXBQb2xOMjJQQmYya2RxdnRBa2NvbnRyb2xsZXJzgXg4ZGlkOmtleTp6Nk1rcHptenR4dlBZU0NaOHR6U0NCUWhzUFR4Rml4VWtyekNEaFNLQmJRNlN2bTc=",
        },
      ],
      schema: "kjzl6cwe1jw1498dutckdgtk8zwkiwxlcmlca1k221zgjprv4afjltmt6t42gaw",
      version:
        "k3y52l7qbv1fry4on7johz3wmxf0o4hmhr5gyrktxqxrcqlikwcp6szu9kjd3kem8",
    },
    kjzl6cwe1jw149gjv8icw2gk4m1ealf6k5lyrpm4it269unl02xxn0vqp0rk2g8: {
      alias: "heldVerifiableWorkCredentials",
      commits: [
        {
          jws: {
            payload: "AXESIESuGqJNrzGpPiqanHpIisyEhdn3c24QTTtFQAZaMAGR",
            signatures: [
              {
                signature:
                  "T8gLbFZRxktBAlf4B7IVA2J-1HGcP51LOhqBDiAbGssQzm-amWOciYqMBYsmz_nJTJqz_rDaQAnMHb4DEg2XBg",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreicevynketnpggut4ku2tr5ercwmqsc5t53tnyie2o2fiadfumabse",
          },
          linkedBlock:
            "omRkYXRho2RuYW1leB1oZWxkVmVyaWZpYWJsZVdvcmtDcmVkZW50aWFsc2ZzY2hlbWF4S2NlcmFtaWM6Ly9rM3k1Mmw3cWJ2MWZyeWsxdWZkNDMxaHA5cnJob204d3FjMTBoM3ZpY3M2dzNndHU3bzF1ZHV0dWJvbGZkZTR1OGtkZXNjcmlwdGlvbngdaGVsZFZlcmlmaWFibGVXb3JrQ3JlZGVudGlhbHNmaGVhZGVyo2ZzY2hlbWF4S2NlcmFtaWM6Ly9rM3k1Mmw3cWJ2MWZyeTFmcDRzMG53ZGFyaDB2YWh1c2FycHBvc2dldnkwcGVtaXlreW1kMm9yZDZzd3RoYXJjd2Z1bmlxdWVwNFNZU3NaM3pZeE4wd0NzbGtjb250cm9sbGVyc4F4OGRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03",
        },
      ],
      schema: "kjzl6cwe1jw14ap0caa4xeav6psx9vmlpbe4nlv9o7pvzjy27bic2nbkrn9h2jt",
      version:
        "k3y52l7qbv1fryb9pa4ijo1hr4spxncbynbw7925c5qngm1zpckxb7q9ptxfypfcw",
    },
    kjzl6cwe1jw146njxc67vklboyp97bd3iu2cjthaozna56ms8znb3egdrswt0mb: {
      alias: "MemberShip",
      commits: [
        {
          jws: {
            payload: "AXESIH1dTLBBl8CGDt-w71s-oPfzlhsFt6BaHnwX4uZX3Hs9",
            signatures: [
              {
                signature:
                  "0L_JdqBLQ8-qSEpoVrI3LpDGbFeMRS0vrt9DNfIYFfnb12QIHn6ByjTErjK0C_Q9G2r6Q_w6H1s6pGphRcRWDA",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreid5lvglaqmxycda5x5q55nt5ihx6olbwbnxubnb47ax4ltfpxd3hu",
          },
          linkedBlock:
            "omRkYXRho2RuYW1lam1lbWJlclNoaXBmc2NoZW1heEtjZXJhbWljOi8vazN5NTJsN3FidjFmcnkxMmNvZmVlc2d6M3BobnIzcHB1c2R6eThrZXZtcWt6b25qNW9ibWk3bXpxZHlkYXB5YmtrZGVzY3JpcHRpb25qbWVtYmVyU2hpcGZoZWFkZXKjZnNjaGVtYXhLY2VyYW1pYzovL2szeTUybDdxYnYxZnJ5MWZwNHMwbndkYXJoMHZhaHVzYXJwcG9zZ2V2eTBwZW1peWt5bWQyb3JkNnN3dGhhcmN3ZnVuaXF1ZXA5MHhGc0krZTkrbnd5WEZna2NvbnRyb2xsZXJzgXg4ZGlkOmtleTp6Nk1rcHptenR4dlBZU0NaOHR6U0NCUWhzUFR4Rml4VWtyekNEaFNLQmJRNlN2bTc=",
        },
      ],
      schema: "kjzl6cwe1jw1480w5onypdmxpisnhyjy547v92vcbmv2rnk4qhduop65ec58tiw",
      version:
        "k3y52l7qbv1frxrbhp2k80ifn5irlg0t51xsp8xn01phk4v60vxhqw6shxplacem8",
    },
    kjzl6cwe1jw14afzzqsn9sgpkcmynkhnabzx4w8e9dvd77js3iud5axoau19pz9: {
      alias: "Organization",
      commits: [
        {
          jws: {
            payload: "AXESIJu2XhTfyxVMallr6cj_UZVlmIkEjFmPGdbg5VY7yWKn",
            signatures: [
              {
                signature:
                  "FyE67bh7uWrUIVvcTczGUCa00KrQOuSNiwg-aDIUpCE9dplYQMIcuZODOJTu_L3Ed16rqsM_DhvnAwa8KsdnBQ",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreie3wzpbjx6lcvgguwll5hep6umvmwmisbemlghrtvxa4vldxslcu4",
          },
          linkedBlock:
            "omRkYXRho2RuYW1lbG9yZ2FuaXphdGlvbmZzY2hlbWF4S2NlcmFtaWM6Ly9rM3k1Mmw3cWJ2MWZyeWF6NjE5bWZjMWQ1MHJxOTZ0MW9kM2owOHJsd2poNW1qcjM4MmZlZDZrMzY4cm44cTR1OGtkZXNjcmlwdGlvbmxvcmdhbml6YXRpb25maGVhZGVyo2ZzY2hlbWF4S2NlcmFtaWM6Ly9rM3k1Mmw3cWJ2MWZyeTFmcDRzMG53ZGFyaDB2YWh1c2FycHBvc2dldnkwcGVtaXlreW1kMm9yZDZzd3RoYXJjd2Z1bmlxdWVwN2tzeDNZQkc1Y29jbmR6a2tjb250cm9sbGVyc4F4OGRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03",
        },
      ],
      schema: "kjzl6cwe1jw149f2jawys4owro5do0pjqlb3yzdrmzllqehw2lagh8g72cvyexb",
      version:
        "k3y52l7qbv1fryi9ry6jphmetspvaflphlhbfmt7peqn1v9ont1zxhprgt1l14qo0",
    },
    kjzl6cwe1jw1498bejr5d8d7zzxc9veu6r48q7fj144refbf7smsi6k4yhe5uc8: {
      alias: "MembershipSubject",
      commits: [
        {
          jws: {
            payload: "AXESINQBg8AcETXd19LRpX-zBOcxlw7CoxUy7XZ8M33d_hPT",
            signatures: [
              {
                signature:
                  "AfbLM1Gdww06KGqJdYxushg21y_r1wyhglF1NWn5FCMONIGY72cY2CjfFZlVrE5j36kFJqUdFWEtnzlXZXgACA",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreiguagb4ahargxo5puwruv73gbhhgglq5qvdcuzo25t4gn6537qt2m",
          },
          linkedBlock:
            "omRkYXRho2RuYW1lcW1lbWJlcnNoaXBTdWJqZWN0ZnNjaGVtYXhLY2VyYW1pYzovL2szeTUybDdxYnYxZnJ5MzN6MWllMnhsM2djZ25hZnQ5bnZpcTJoMnBpNXh4ajU1eTUwNWRhaW5sNHo3ZG8zYnBja2Rlc2NyaXB0aW9ucW1lbWJlcnNoaXBTdWJqZWN0ZmhlYWRlcqNmc2NoZW1heEtjZXJhbWljOi8vazN5NTJsN3FidjFmcnkxZnA0czBud2RhcmgwdmFodXNhcnBwb3NnZXZ5MHBlbWl5a3ltZDJvcmQ2c3d0aGFyY3dmdW5pcXVlcHRiVnJqSUpDMzZYdVN3bllrY29udHJvbGxlcnOBeDhkaWQ6a2V5Ono2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNw==",
        },
      ],
      schema: "kjzl6cwe1jw148b8v5ecscj1qi39wljx64bjh0xym7l105wd2u06jhxwrg83y7u",
      version:
        "k3y52l7qbv1fry9n53gh263i0vzh3a7dio0u62cufbxduukx87fm2pan797opjqww",
    },
    kjzl6cwe1jw148ysjglgqdf50e5glp9bi9u593yoif2l6p1futi8dgt4y4w1qfd: {
      alias: "CreatedOrganizations",
      commits: [
        {
          jws: {
            payload: "AXESIInTIk0aHpmsScsrMA09NAiYLGmktvAsd-aBZqsQL9us",
            signatures: [
              {
                signature:
                  "cR_tkFFd_1R7culJYxQvHxmkwyJ9NMVhqH5dnGtIGRtGenB_WReZwo7RrNxY0852Zv3jSGnrumCqlMJKlDrtDA",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreiej2mre2gq6tgwetszlgagt2naitawgtjfw6awhpzubm2vral63vq",
          },
          linkedBlock:
            "omRkYXRho2RuYW1ldENyZWF0ZWRPcmdhbml6YXRpb25zZnNjaGVtYXhLY2VyYW1pYzovL2szeTUybDdxYnYxZnJ5ZTlha3JrZWZwa3N5eGJuZTE5MXBidmc3YTNxcmgwZGNwM2t6bnc0aTRoM3dqanFzc240a2Rlc2NyaXB0aW9udENyZWF0ZWRPcmdhbml6YXRpb25zZmhlYWRlcqNmc2NoZW1heEtjZXJhbWljOi8vazN5NTJsN3FidjFmcnkxZnA0czBud2RhcmgwdmFodXNhcnBwb3NnZXZ5MHBlbWl5a3ltZDJvcmQ2c3d0aGFyY3dmdW5pcXVlcFYrYUt4Njl0emJ3WHV3OVNrY29udHJvbGxlcnOBeDhkaWQ6a2V5Ono2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNw==",
        },
      ],
      schema: "kjzl6cwe1jw149vojsmk1318knt785su1vhcyruwg8kv4lj2e0jpdsr5m0hypfa",
      version:
        "k3y52l7qbv1fry7reye0mzjfnmsmu2bm9txydcs6maz6enm28r5tnjrj76qrwbx8g",
    },
    kjzl6cwe1jw149bavyq8tk8kh14r77mzal535j8q9noqafjvuork58loa8zz876: {
      alias: "CreatedMemberships",
      commits: [
        {
          jws: {
            payload: "AXESIJTry1azIvbyAOl3y37EAZmRpPU4o77vaQMa56K4RU7L",
            signatures: [
              {
                signature:
                  "ZHURcHIZZ-7hG97ESy9X0aA3e0itHzcbmVnOHWRxANkCCYhmP-3aAoYeBy76OVCrXsgUc-MaGPMyASRADHVjBw",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreieu5pfvnmzc63zab2lxzn7miamzsgspkofdx3xwsay246rlqrkozm",
          },
          linkedBlock:
            "omRkYXRho2RuYW1lckNyZWF0ZWRNZW1iZXJzaGlwc2ZzY2hlbWF4S2NlcmFtaWM6Ly9rM3k1Mmw3cWJ2MWZyeGxwc2g0aDBtem5wbmJyMnd0aDZqYXFkM3JrN2tnZXY4ZzdmMWxteTFzbWV4Y3Frb2cwMGtkZXNjcmlwdGlvbnJDcmVhdGVkTWVtYmVyc2hpcHNmaGVhZGVyo2ZzY2hlbWF4S2NlcmFtaWM6Ly9rM3k1Mmw3cWJ2MWZyeTFmcDRzMG53ZGFyaDB2YWh1c2FycHBvc2dldnkwcGVtaXlreW1kMm9yZDZzd3RoYXJjd2Z1bmlxdWVwcGtMcWV6NnBZM3lxa2ZndGtjb250cm9sbGVyc4F4OGRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03",
        },
      ],
      schema: "kjzl6cwe1jw145v6teow5he0slc8uhn88c72yuba2bb39mj1jwusevl5h2cqj6r",
      version:
        "k3y52l7qbv1frya8dfaymq7wxl41tfabezac6fcu2sofuy6lei83z9964ovzuiayo",
    },
    kjzl6cwe1jw14bf5lrj9lszp3yldwtidw33o42ua2se9boxgtbtwlhkf0jvk7tm: {
      alias: "CreatedMembershipSubjects",
      commits: [
        {
          jws: {
            payload: "AXESICpXCTTY0AJlfqkey0GpUROxzT-Bo0XtFkEwngd5QSkx",
            signatures: [
              {
                signature:
                  "M61sFJBL0inX3XsHOeif2gtdbue8vdVoWiG_8asMGwVSWWnKrx_tLegMM46evgdnKt9nuv38JL2f-6Ub5xsRBw",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreibkk4etjwgqajsx5ki6zna2suitwhgt7andixwrmqjqtydxsqjjge",
          },
          linkedBlock:
            "omRkYXRho2RuYW1leBlDcmVhdGVkTWVtYmVyc2hpcFN1YmplY3RzZnNjaGVtYXhLY2VyYW1pYzovL2szeTUybDdxYnYxZnJ5Zzd0dzlxbDhtYnBlNHFqOGZpZXhiaGpmZXAwYXhwcXI4dnBlYnRtNm05eHZibmZjaXJra2Rlc2NyaXB0aW9ueBlDcmVhdGVkTWVtYmVyc2hpcFN1YmplY3RzZmhlYWRlcqNmc2NoZW1heEtjZXJhbWljOi8vazN5NTJsN3FidjFmcnkxZnA0czBud2RhcmgwdmFodXNhcnBwb3NnZXZ5MHBlbWl5a3ltZDJvcmQ2c3d0aGFyY3dmdW5pcXVlcE9jMTdXdXJLUjhyNTFXQWFrY29udHJvbGxlcnOBeDhkaWQ6a2V5Ono2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNw==",
        },
      ],
      schema: "kjzl6cwe1jw14a5ln3mav0w0rashbvfiz26ejlr53sd6kpfpibscok09tptqcg5",
      version:
        "k3y52l7qbv1fryp7rurt0b25uk602xduqs623h07bntxeb59zkk4nssx6rxcfrmkg",
    },
    kjzl6cwe1jw145euyob2py99meg95up8j526unx4sazq4b1r33wi20pf8eit3ub: {
      alias: "VerifiableMembershipSubjectCredential",
      commits: [
        {
          jws: {
            payload: "AXESIBlVt_n1iAD8DOznNqUsJKSV1umHlG05YcHzRVl12sso",
            signatures: [
              {
                signature:
                  "hmD74yr_YzRkCeXwmPO34_yUKcUxG9iSlkJ7INyXHy-ZUz2_GAhiUYPaeJ6uRI8A_j5mjAPEjYWbWKIPUjIjDw",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreiazkw37t5miad6az3hhg2ssyjfesxlotb4unu4wdqptivmxlwwlfa",
          },
          linkedBlock:
            "omRkYXRho2RuYW1leCVWZXJpZmlhYmxlTWVtYmVyc2hpcFN1YmplY3RDcmVkZW50aWFsZnNjaGVtYXhLY2VyYW1pYzovL2szeTUybDdxYnYxZnJ5aGM3NzM3dHEyYzJvMndkaG1xZ3BmM2ducWpvaDdta2FzNGczcnpmdGxkbnJxNDhiOTR3a2Rlc2NyaXB0aW9ueCVWZXJpZmlhYmxlTWVtYmVyc2hpcFN1YmplY3RDcmVkZW50aWFsZmhlYWRlcqNmc2NoZW1heEtjZXJhbWljOi8vazN5NTJsN3FidjFmcnkxZnA0czBud2RhcmgwdmFodXNhcnBwb3NnZXZ5MHBlbWl5a3ltZDJvcmQ2c3d0aGFyY3dmdW5pcXVlcFlsOXZkY2tBMk5qbWt0OTRrY29udHJvbGxlcnOBeDhkaWQ6a2V5Ono2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNw==",
        },
      ],
      schema: "kjzl6cwe1jw14aba0fn1d87bmieoeaich2ooa3654o4uz9kvij4f5ukhel3yx2z",
      version:
        "k3y52l7qbv1frxiho6kurcjlwfarl5mbgo3zkq23m1a61qmkgm3r4ed0sbr9qzbi8",
    },
    kjzl6cwe1jw149e27tx4egmhbqnp5uuh0lj6441tcci8gtqijpgtzvuwty20tlu: {
      alias: "HeldVerifiableMembershipSubjects",
      commits: [
        {
          jws: {
            payload: "AXESIPjdmqjt-NrXS5OuwbD33kjMcixioyzeG7GpjRt_D5rf",
            signatures: [
              {
                signature:
                  "zGMQ7KaC94OaqNaRAsRm1gbHKAnkC0ddz2mtPmSiklyLqj9hjDKsTQy7wX8x9vCG3SFgUEaXrArFQusJuq--Dg",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreihy3wnkr3py3lluxe5oygyppxsizrzcyyvdftpbxmnjrunx6d4234",
          },
          linkedBlock:
            "omRkYXRho2RuYW1leCBIZWxkVmVyaWZpYWJsZU1lbWJlcnNoaXBTdWJqZWN0c2ZzY2hlbWF4S2NlcmFtaWM6Ly9rM3k1Mmw3cWJ2MWZyeTlrOWR4YXp3ajl2cWlhMmM3OG5ranliYnBrcjR0cTczMzZjNTc3OXRwNzR2bmF4MHcwMGtkZXNjcmlwdGlvbnggSGVsZFZlcmlmaWFibGVNZW1iZXJzaGlwU3ViamVjdHNmaGVhZGVyo2ZzY2hlbWF4S2NlcmFtaWM6Ly9rM3k1Mmw3cWJ2MWZyeTFmcDRzMG53ZGFyaDB2YWh1c2FycHBvc2dldnkwcGVtaXlreW1kMm9yZDZzd3RoYXJjd2Z1bmlxdWVwSm1uU1Q4N0hwZ0NQYjgwb2tjb250cm9sbGVyc4F4OGRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03",
        },
      ],
      schema: "kjzl6cwe1jw1497wtiqux9gkrwy1gc9nkbt0gu18bd6hvddttzbpkhltdg7q0or",
      version:
        "k3y52l7qbv1fryarzrorjau7v7hkixncp094bh8swnsxo7ngjw53pb6jtgy6duj9c",
    },
    kjzl6cwe1jw146d27xgdqoj12mo2y1jk7k2uxc4mfrg5vmrz38izrzb1gskj5wa: {
      alias: "IssuedVerifiableMembershipSubjects",
      commits: [
        {
          jws: {
            payload: "AXESICQKbsHpx11isJMqORU_-eSlxjwLBPPE8s7vD4IbpQLV",
            signatures: [
              {
                signature:
                  "uy0DHYRSzBzhaFwmnl1cJticCIBAd52IRYO8vkz12PwJsUZApbO6kk0_Zu59BuRUUE-CuNQlmBz4kjrjit-tAQ",
                protected:
                  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3B6bXp0eHZQWVNDWjh0elNDQlFoc1BUeEZpeFVrcnpDRGhTS0JiUTZTdm03I3o2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNyJ9",
              },
            ],
            link: "bafyreibebjxmd2ohlvrlbezkhekt76peuxddycye6pcpftxpb6bbxjic2u",
          },
          linkedBlock:
            "omRkYXRho2RuYW1leCJJc3N1ZWRWZXJpZmlhYmxlTWVtYmVyc2hpcFN1YmplY3RzZnNjaGVtYXhLY2VyYW1pYzovL2szeTUybDdxYnYxZnJ5NXgxNndyYXlyaTQwN2VvdG1saGkzbWJ0d3o1Ympub2l4cDU0OWswaXlnM2N5M3Q1cW04a2Rlc2NyaXB0aW9ueCJJc3N1ZWRWZXJpZmlhYmxlTWVtYmVyc2hpcFN1YmplY3RzZmhlYWRlcqNmc2NoZW1heEtjZXJhbWljOi8vazN5NTJsN3FidjFmcnkxZnA0czBud2RhcmgwdmFodXNhcnBwb3NnZXZ5MHBlbWl5a3ltZDJvcmQ2c3d0aGFyY3dmdW5pcXVlcDdhaXBDR3ZIbjc3M1ZjQTRrY29udHJvbGxlcnOBeDhkaWQ6a2V5Ono2TWtwem16dHh2UFlTQ1o4dHpTQ0JRaHNQVHhGaXhVa3J6Q0RoU0tCYlE2U3ZtNw==",
        },
      ],
      schema: "kjzl6cwe1jw148pgha8c89hqfs1i45zn9uvtse76xop9mwv3j5udknyvz0ansdb",
      version:
        "k3y52l7qbv1frxp8vsdwhpqfbmp78y2z3pqsbx28vk36xsxyxj0n2ez2iff609xj4",
    },
  },
  tiles: {},
};
