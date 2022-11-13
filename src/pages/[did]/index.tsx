import type { GetServerSideProps } from "next";
import { CeramicProps, CeramicSupport } from "@/interfaces/ceramic";
import { NextPage } from "next";
import { HomeContainer } from "@/components/containers/home";
import { ProfileContainer } from "@/components/containers/profile/ProfileContainer";
import { NoProfileContainer } from "@/components/containers/profile/NoProfileContainer";
import { useContext } from "react";
import { DIDContext } from "@/context/DIDContext";
import { getPkhDIDFromAddress, isDIDstring, isEthereumAddress } from "vess-sdk";

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
      props: { did, support },
    };
  } else if (isEthereumAddress(did)) {
    // If an Ethereum address is provided, redirect to CAIP-10 URL
    return {
      redirect: { destination: `/${getPkhDIDFromAddress(did)}`, permanent: false },
    };
  } 
  return {
    props: { did, support },
  };
};

const ProfilePage: NextPage<CeramicProps> = (props: CeramicProps) => {
  const {did: myDID, account} = useContext(DIDContext)

  if (props.support === "supported") {
    return (
      <>
        {(myDID && myDID === props.did) ||
        (account && `${getPkhDIDFromAddress(account)}` === props.did) ? (
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
        {account && `${getPkhDIDFromAddress(account)}` === props.did ? (
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
