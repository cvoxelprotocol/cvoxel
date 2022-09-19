// import {
//   CLIENT_EIP712_TYPE,
//   CREDENTIAL_SCHEMA_EIP712_TYPE,
//   DELIVERABLES_EIP712_TYPE,
//   DOMAIN_TYPE,
//   EIP712Credential,
//   EIP712CredentialTypedData,
//   EIP712DomainTypedData,
//   EIP712WorkCredentialSubjectTypedData,
//   EIP712WorkCredentialTypedData,
//   PRIMARY_SUBJECT_TYPE,
//   PRIMARY_TYPE,
//   TX_EIP712_TYPE,
//   VERIFIABLE_CREDENTIAL_EIP712_TYPE,
//   WORK_CREDENTIAL_EIP712_TYPE,
//   WORK_EIP712_TYPE,
//   WORK_SUBJECT_EIP712_TYPE,
// } from "@/interfaces/eip712";
import {
  CLIENT_EIP712_TYPE,
  DELIVERABLES_EIP712_TYPE,
  DOMAIN_TYPE,
  EIP712DomainTypedData,
  EIP712WorkCredentialSubjectTypedData,
  PRIMARY_SUBJECT_TYPE,
  TX_EIP712_TYPE,
  WORK_EIP712_TYPE,
  WORK_SUBJECT_EIP712_TYPE,
} from "@/interfaces/eip712";
import { WorkSubject } from "@/__generated__/types/WorkCredential";
import { Web3Provider } from "@ethersproject/providers";

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
  console.log({ signature });
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
