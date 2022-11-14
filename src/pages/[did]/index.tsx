import type { GetServerSideProps } from "next";
import { CeramicProps, CeramicSupport } from "@/interfaces/ceramic";
import { NextPage } from "next";
import { HomeContainer } from "@/components/containers/home";
import { NoProfileContainer } from "@/components/containers/profile/NoProfileContainer";
import { useDIDAccount } from "@/hooks/useDIDAccount";
import { getPkhDIDFromAddress, isDIDstring, isEthereumAddress } from "vess-sdk";
import dynamic from "next/dynamic";

const ProfileContainer = dynamic(
  () => import("@/components/containers/profile/ProfileContainer"),
  {
    ssr: false,
  }
);

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
      props: { did: did.toLowerCase(), support },
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
  const {did: myDID, account} = useDIDAccount()

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
