import { core } from "@/services/ceramic/CeramicService";
import { isEthAddress } from "@ceramicnetwork/blockchain-utils-linking/lib/ethereum";
import {
  useConnection,
  isCAIP10string,
  useViewerID,
  useViewerRecord,
  usePublicRecord,
} from "@self.id/framework";
import { useEffect, useState } from "react";
import { getProfileInfo } from "@/utils/ceramicUtils";
import { useWalletAccount } from "./useWalletAccount";
import { Caip10Link } from "@ceramicnetwork/stream-caip10-link";
import { ModelTypes } from "@/interfaces";
import { useStateSelfID } from "@/recoilstate/ceramic";

export const useMyCeramicAcount = () => {
  const [connection, connect, disconnect] = useConnection<ModelTypes>();
  const { connectWallet, disconnectWallet, account, chainId } =
    useWalletAccount();
  const viewerID = useViewerID<ModelTypes>();
  const profileRecord = useViewerRecord("basicProfile");
  const accountRecord = useViewerRecord("cryptoAccounts");
  const [name, setName] = useState("");
  const [avator, setAvator] = useState<string | undefined>("");
  const [description, setDescription] = useState("");
  const [did, setDid] = useState("");
  const [selfID, setSelfID] = useStateSelfID();

  useEffect(() => {
    async function initialize() {
      if (viewerID) {
        setDid(viewerID.id);
        connectWallet();
      }
    }
    initialize();
  }, [viewerID]);

  useEffect(() => {
    if (viewerID) {
      const { avatarSrc, displayName, bio } = getProfileInfo(
        viewerID.id,
        profileRecord.content
      );
      setName(displayName);
      setAvator(avatarSrc);
      setDescription(bio);
      setDid(viewerID.id);
    }
  }, [profileRecord.content]);

  useEffect(() => {
    async function getTempDIDProfile() {
      if (account && !did) {
        const accountLink = await Caip10Link.fromAccount(
          core.ceramic,
          `${account}@eip155:${chainId}`
        );
        const linkedDid = accountLink.did;
        if (linkedDid) {
          const { avatarSrc, displayName, bio } = getProfileInfo(
            linkedDid,
            profileRecord.content
          );
          setName(displayName);
          setAvator(avatarSrc);
          setDescription(bio);
          setDid(linkedDid);
        }
      }
    }

    getTempDIDProfile();
  }, [account, did]);

  const connectCeramic = async () => {
    const id = await connect();
    console.log("setSelfID", id);
    setSelfID(id);
    await connectWallet();
  };
  const connectWalletOnly = async () => {
    await connectWallet();
  };
  const disconnectCeramic = () => {
    disconnect();
    disconnectWallet();
  };

  return {
    connectCeramic,
    disconnectCeramic,
    connection,
    viewerID,
    selfID,
    did,
    account,
    profileRecord,
    name,
    avator,
    description,
    connectWalletOnly,
  };
};

export const useUserCeramicAcount = (did: string) => {
  const profileRecord = usePublicRecord("basicProfile", did);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [avator, setAvator] = useState<string | undefined>("");

  useEffect(() => {
    if (did) {
      const { avatarSrc, displayName, bio } = getProfileInfo(
        did,
        profileRecord.content
      );
      setName(displayName);
      setAvator(avatarSrc);
      setDescription(bio);
    }
  }, [did]);

  return {
    profileRecord,
    name,
    avator,
    description,
  };
};
