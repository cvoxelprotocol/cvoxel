import { useQuery, useQueryClient } from "@tanstack/react-query";
import { WorkSubjectFromERC721 } from "@/interfaces";
import { getDevProtocolTokenListFromFB } from "@/lib/firebase/store/devProtocol";
import {
  getDevProtocolTokens,
  issueCRDLFromDevProtocol,
} from "@/lib/firebase/functions/devprotocol";
import { useEffect, useMemo, useRef, useState } from "react";
import { useStateDevProtocolListModal } from "@/recoilstate";
import { useDIDAccount } from "@/hooks/useDIDAccount";
import { getVESS } from "vess-sdk";
import { CERAMIC_NETWORK } from "@/constants/common";

const ETHEREUM_MAINNET_CHAIN_ID = 1;
const POLYGON_MAINNET_CHAIN_ID = 137;

export const useDevProtocol = (lazy?: boolean) => {
  const [isDevProtocolOpen, setIsDevProtocolOpen] =
    useStateDevProtocolListModal();

  const { account } = useDIDAccount();
  const vess = getVESS(CERAMIC_NETWORK !== "mainnet");

  const queryClient = useQueryClient();

  const { data, refetch } = useQuery<WorkSubjectFromERC721[]>(
    ["getDevProtocolTokenListFromFB", account],
    () => getDevProtocolTokenListFromFB(account),
    {
      enabled: !!account,
      staleTime: Infinity,
      cacheTime: 3000000,
    }
  );

  useEffect(() => {
    if (!isDevProtocolOpen || !data) {
      return;
    }

    (async () => {
      await refetch();
    })();
  }, [isDevProtocolOpen]);

  const [onChainData, setOnChainData] = useState<WorkSubjectFromERC721[]>();
  const fetched = useRef<boolean>(false);
  useEffect(() => {
    if (!account || fetched.current || lazy) {
      return;
    }
    (async () => {
      fetched.current = true;
      const result: WorkSubjectFromERC721[] = [];
      // NOTE: Please send it without converting it to lower case, because the devprotocol side uses an address that includes a checksum.
      let res = await getDevProtocolTokens(
        account ?? "",
        ETHEREUM_MAINNET_CHAIN_ID
      );
      if (!!res) {
        result.push(...res);
      }

      res = await getDevProtocolTokens(account ?? "", POLYGON_MAINNET_CHAIN_ID);
      if (!!res) {
        result.push(...res);
      }

      if (!!result) {
        setOnChainData(result);
      }
    })();
  }, [account]);

  const reFetchData = async () => {
    // from fb
    await refetch();

    // on-chain data
    const result: WorkSubjectFromERC721[] = [];
    // NOTE: Please send it without converting it to lower case, because the devprotocol side uses an address that includes a checksum.
    let res = await getDevProtocolTokens(
      account ?? "",
      ETHEREUM_MAINNET_CHAIN_ID
    );
    if (!!res) {
      result.push(...res);
    }

    res = await getDevProtocolTokens(account ?? "", POLYGON_MAINNET_CHAIN_ID);
    if (!!res) {
      result.push(...res);
    }

    if (!!result) {
      setOnChainData(result);
    }
  };

  const unissuedData = useMemo<WorkSubjectFromERC721[] | undefined>(() => {
    if (!data || !onChainData) {
      return undefined;
    }
    return onChainData?.filter(
      (od) => !data.find((d) => od.tokenHash == d.tokenHash)
    );
  }, [data, onChainData]);

  const issueCRDL = async (hashes: string[]) => {
    if (hashes.length == 0 || !account) {
      return;
    }
    try {
      const streamIds = await issueCRDLFromDevProtocol(account, hashes, false);
      if (streamIds && streamIds.length > 0) {
        await vess.setHeldWorkCredentials(streamIds);
      }
      await queryClient.invalidateQueries(["heldWorkCredentials"]);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isDevProtocolOpen,
    setIsDevProtocolOpen,
    issuedData: data,
    unissuedData,
    onChainData,
    reFetchData,
    issueCRDL,
  };
};
