import { isDIDstring } from "@self.id/framework";
import type { GetServerSideProps } from "next";
import { isEthereumAddress } from "@/utils/ceramicUtils";
import { ETH_CHAIN_ID } from "@/constants/common";
import { getRequestState } from "@/lib/ceramic/server";
import { CeramicProps, CeramicSupport } from "@/interfaces/ceramic";
import { NextPage } from "next";
import { HomeContainer } from "@/components/containers/home";
import { ProfileContainer } from "@/components/containers/profile/ProfileContainer";
import { NoProfileContainer } from "@/components/containers/profile/NoProfileContainer";
import { useContext } from "react";
import { DIDContext } from "@/context/DIDContext";

export const getServerSideProps: GetServerSideProps<
  CeramicProps,
  { did: string }
> = async (ctx) => {
  const did = ctx.params?.did;
  let support: CeramicSupport = "invalid";

  if (did == null) {
    return {
      redirect: { destination: "/", permanent: true },
    };
  }

  if (isDIDstring(did)) {
    support = "supported";
    return {
      props: { did, state: await getRequestState(ctx, did), support },
    };
  } else if (isEthereumAddress(did)) {
    // If an Ethereum address is provided, redirect to CAIP-10 URL
    return {
      redirect: { destination: `/did:pkh:${ETH_CHAIN_ID}${did}`, permanent: false },
    };
  } 
  return {
    props: { did, state: await getRequestState(ctx), support },
  };
};

const ProfilePage: NextPage<CeramicProps> = (props: CeramicProps) => {
  const {did: myDID, account} = useContext(DIDContext)

  if (props.support === "supported") {
    return (
      <>
        {(myDID && myDID === props.did) ||
        (account && `/did:pkh:${ETH_CHAIN_ID}${account}` === props.did) ? (
          <HomeContainer />
        ) : (
          <ProfileContainer {...props} />
        )}
      </>
    );
  }

  if (props.support === "unlinked") {
    return (
      <>
        {account && `${account}${ETH_CHAIN_ID}` === props.did ? (
          <HomeContainer />
        ) : (
          <NoProfileContainer />
        )}
      </>
    );
  }

  return <NoProfileContainer />;
};

export default ProfilePage;
