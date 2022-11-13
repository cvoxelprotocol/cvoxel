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
