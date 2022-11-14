import {
  useAccount,
  useChainId,
  useConnectionStatus,
  useMyDid,
} from "@/recoilstate/account";

export const useDIDAccount = () => {
  const did = useMyDid();
  const account = useAccount();
  const originalAddress = useAccount();
  const chainId = useChainId();
  const connection = useConnectionStatus();

  return {
    did,
    account,
    originalAddress,
    connection,
    chainId,
  };
};
