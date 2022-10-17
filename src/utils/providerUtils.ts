import {
  CLIENT_EIP712_TYPE,
  CREDENTIAL_SCHEMA_W3C_TYPE,
  DELIVERABLES_EIP712_TYPE,
  DOMAIN_TYPE,
  EIP712Credential,
  EIP712DomainTypedData,
  EIP712MessageTypes,
  EIP712TypedData,
  VerifiableMembershipSubjectCredential,
  EIP712WorkCredentialSubjectTypedData,
  ISSUER_EIP712_TYPE,
  MEMBERSHIP_SUBJECT_EIP712_TYPE,
  PRIMARY_SUBJECT_TYPE,
  Proof,
  SignTypedData,
  TX_EIP712_TYPE,
  VerifiableCredential,
  VERIFIABLE_CREDENTIAL_PRIMARY_TYPE,
  VERIFIABLE_CREDENTIAL_W3C_TYPE,
  VerifyTypedData,
  W3CCredential,
  W3CCredentialTypedData,
  WORK_EIP712_TYPE,
  WORK_SUBJECT_EIP712_TYPE,
} from "@/interfaces/eip712";
import { VerifiableMembershipSubject } from "@/__generated__/types/VerifiableMembershipSubjectCredential";
import { WorkSubject } from "@/__generated__/types/WorkCredential";
import { Web3Provider } from "@ethersproject/providers";
import { utils } from "ethers";
import { getPkhDIDFromAddress } from "./ceramicUtils";
import { renameType } from "./objectUtil";

export const DEFAULT_CONTEXT = "https://www.w3.org/2018/credentials/v1";
export const EIP712_CONTEXT =
  "https://raw.githubusercontent.com/w3c-ccg/ethereum-eip712-signature-2021-spec/main/contexts/v1/index.json";
export const DEFAULT_VC_TYPE = "VerifiableCredential";
export const MEMBERSHIP_VC_TYPE = "MembershipCredential";

export const getDeworkConnectSignature = async (
  nonce: string,
  provider?: Web3Provider
) => {
  if (!provider) throw "Missing provider for getSignature";

  const signer = provider.getSigner();
  const signature = await new Promise<string>((resolve, reject) => {
    const t = setTimeout(
      () => reject("Waiting for signature, timed out."),
      60000
    );
    signer
      .signMessage(`connect Dework ${nonce}`)
      .then((sig) => {
        clearTimeout(t);
        resolve(sig);
      })
      .catch((e) => {
        reject(e);
      });
  });

  return signature;
};

export const getEIP712WorkCredentialSubjectSignature = async (
  subject: WorkSubject,
  provider?: Web3Provider
): Promise<string> => {
  if (!provider) throw "Missing provider for getSignature";

  const domain: EIP712DomainTypedData = {
    name: "Work Credential",
    version: "1",
    chainId: provider.network.chainId,
    verifyingContract: "0x00000000000000000000000000000000000000000000", // WIP
  };

  const credentialTypedData = getEIP712WorkSubjectTypedData(domain, subject);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  const signature = await provider.send("eth_signTypedData_v4", [
    address,
    JSON.stringify(credentialTypedData),
  ]);
  return signature;
};

const getEIP712WorkSubjectTypedData = (
  domain: EIP712DomainTypedData,
  subject: WorkSubject
): EIP712WorkCredentialSubjectTypedData => {
  return {
    domain: domain,
    primaryType: PRIMARY_SUBJECT_TYPE,
    message: subject,
    types: {
      EIP712Domain: DOMAIN_TYPE,
      WorkCredentialSubject: WORK_SUBJECT_EIP712_TYPE,
      Work: WORK_EIP712_TYPE,
      DeliverableItem: DELIVERABLES_EIP712_TYPE,
      TX: TX_EIP712_TYPE,
      Client: CLIENT_EIP712_TYPE,
    },
  };
};

// const getEIP712WorkCredentialTypedData = (
//   domain: EIP712DomainTypedData,
//   subject: WorkCredential
// ): EIP712WorkCredentialTypedData => {
//   return {
//     domain: domain,
//     primaryType: PRIMARY_SUBJECT_TYPE,
//     message: subject,
//     types: {
//       EIP712Domain: DOMAIN_TYPE,
//       WorkCredential: WORK_CREDENTIAL_EIP712_TYPE,
//       WorkCredentialSubject: WORK_SUBJECT_EIP712_TYPE,
//       DeliverableItem: DELIVERABLES_EIP712_TYPE,
//       TX: TX_EIP712_TYPE,
//       Client: CLIENT_EIP712_TYPE,
//     },
//   };
// };

// const getEIP712VerifiableCredentialTypedData = (
//   domain: EIP712DomainTypedData,
//   credential: EIP712Credential,
//   credentialSubjectTypes: any
// ): EIP712CredentialTypedData => {
//   return {
//     domain: domain,
//     primaryType: PRIMARY_TYPE,
//     message: credential,
//     types: {
//       EIP712Domain: DOMAIN_TYPE,
//       VerifiableCredential: VERIFIABLE_CREDENTIAL_EIP712_TYPE,
//       CredentialSchema: CREDENTIAL_SCHEMA_EIP712_TYPE,
//       ...credentialSubjectTypes,
//     },
//   };
// };

// const verifyEIP712Credential = async(
//   issuer: string,
//   credential: EIP712Credential,
//   credentialSubjectTypes: any,
//   proofValue: string,
//   verifyTypedData: VerifyTypedData<EIP712MessageTypes>
// ): Promise<boolean> => {
//   let data: EIP712CredentialTypedData = this.getEIP712CredentialTypedData(credential, credentialSubjectTypes)
//   const recoveredAddress = await verifyTypedData(data, proofValue)

//   return getAddress(issuer) === getAddress(recoveredAddress)
// }

export const createVerifiableMembershipSubjectCredential = async (
  membershipSubject: VerifiableMembershipSubject,
  provider?: Web3Provider
): Promise<VerifiableMembershipSubjectCredential> => {
  if (!provider) throw "Missing provider for getSignature";

  let issuanceDate = Date.now();
  let expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 100);

  const credentialId = `${membershipSubject.organizationId}-${membershipSubject.membershipId}-${membershipSubject.id}`;
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  const issuerDID = getPkhDIDFromAddress(address);

  let credential: W3CCredential = {
    "@context": [DEFAULT_CONTEXT, EIP712_CONTEXT],
    type: [DEFAULT_VC_TYPE, MEMBERSHIP_VC_TYPE],
    id: credentialId,
    issuer: {
      id: issuerDID,
      ethereumAddress: address,
    },
    credentialSubject: membershipSubject,
    credentialSchema: {
      id: "https://example.com/schemas/v1",
      type: "Eip712SchemaValidator2021",
    },
    issuanceDate: new Date(issuanceDate).toISOString(),
    expirationDate: new Date(expirationDate).toISOString(),
  };

  const domain: EIP712DomainTypedData = {
    name: "Verifiable Member Subject",
    version: "1",
    chainId: provider.network.chainId,
    verifyingContract: "0x00000000000000000000000000000000000000000000", // WIP
  };

  const vc: VerifiableCredential = await createEIP712VerifiableCredential(
    domain,
    credential,
    { CredentialSubject: MEMBERSHIP_SUBJECT_EIP712_TYPE },
    async (data: EIP712TypedData<EIP712MessageTypes>) => {
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const sig: string = await provider.send("eth_signTypedData_v4", [
        address,
        JSON.stringify(data),
      ]);
      return sig;
    }
  );
  return vc as VerifiableMembershipSubjectCredential;
};

export const createEIP712VerifiableCredential = async (
  domain: EIP712DomainTypedData,
  credential: W3CCredential,
  credentialSubjectTypes: any,
  signTypedData: SignTypedData<EIP712MessageTypes>
): Promise<VerifiableCredential> => {
  const credentialTypedData = getW3CCredentialTypedData(
    domain,
    credential,
    credentialSubjectTypes
  );

  let signature = await signTypedData(credentialTypedData);

  let proof: Proof = {
    verificationMethod:
      credentialTypedData.message.issuer.id + "#ethereumAddress",
    ethereumAddress: credentialTypedData.message.issuer.ethereumAddress,
    created: new Date(Date.now()).toISOString(),
    proofPurpose: "assertionMethod",
    type: "EthereumEip712Signature2021",
    ...credentialTypedData.message.proof,
    proofValue: signature,
    eip712: {
      domain: { ...credentialTypedData.domain },
      types: { ...credentialTypedData.types },
      primaryType: credentialTypedData.primaryType,
    },
  };

  let verifiableCredential = {
    ...credential,
    proof,
  };

  return verifiableCredential;
};

const getW3CCredentialTypedData = (
  domain: EIP712DomainTypedData,
  credential: W3CCredential,
  credentialSubjectTypes: any
): W3CCredentialTypedData => {
  return {
    domain: getDomainTypedData(domain),
    primaryType: VERIFIABLE_CREDENTIAL_PRIMARY_TYPE,
    message: credential,
    types: {
      EIP712Domain: DOMAIN_TYPE,
      VerifiableCredential: VERIFIABLE_CREDENTIAL_W3C_TYPE,
      CredentialSchema: CREDENTIAL_SCHEMA_W3C_TYPE,
      Issuer: ISSUER_EIP712_TYPE,
      ...credentialSubjectTypes,
    },
  };
};

const getDomainTypedData = (
  domain: EIP712DomainTypedData
): EIP712DomainTypedData => {
  return {
    name: domain.name,
    version: domain.version,
    chainId: domain.chainId,
    verifyingContract: domain.verifyingContract,
  };
};

export const verifyEIP712Credential = async (
  domain: EIP712DomainTypedData,
  issuer: string,
  credential: W3CCredential,
  credentialSubjectTypes: any,
  proofValue: string,
  verifyTypedData: VerifyTypedData<EIP712MessageTypes>
): Promise<boolean> => {
  let data: W3CCredentialTypedData = getW3CCredentialTypedData(
    domain,
    credential,
    credentialSubjectTypes
  );
  const recoveredAddress = await verifyTypedData(data, proofValue);

  return utils.getAddress(issuer) === utils.getAddress(recoveredAddress);
};

export const getEIP712Credential = (
  credential: W3CCredential
): EIP712Credential => {
  return {
    _context: JSON.stringify(credential["@context"]),
    _type: JSON.stringify(credential.type),
    id: credential.id,
    issuer: credential.issuer,
    credentialSubject: renameType(credential.credentialSubject),
    credentialSchema: renameType(credential.credentialSchema),
    issuanceDate: credential.issuanceDate,
    expirationDate: credential.expirationDate,
  };
};
