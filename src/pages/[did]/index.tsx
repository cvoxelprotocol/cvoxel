import type { GetStaticProps } from "next";
import { CeramicProps, CeramicSupport } from "@/interfaces/ceramic";
import { NextPage } from "next";
import { HomeContainer } from "@/components/containers/home";
import { NoProfileContainer } from "@/components/containers/profile/NoProfileContainer";
import { useDIDAccount } from "@/hooks/useDIDAccount";
import { getPkhDIDFromAddress, getVESS, isDIDstring, isEthereumAddress, MembershipSubjectWithId, WorkCredentialWithId } from "vess-sdk";
import dynamic from "next/dynamic";
import { CERAMIC_NETWORK } from "@/constants/common";
import { dehydrate, QueryClient } from "@tanstack/react-query";

const ProfileContainer = dynamic(
  () => import("@/components/containers/profile/ProfileContainer"),
  {
    ssr: false,
  }
);

const queryClient = new QueryClient()

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps:GetStaticProps<CeramicProps,{ did: string }> = async ({params}) => {
  const did = params?.did;
  let support: CeramicSupport = "invalid";

  if (did == null) {
    return {
      redirect: { destination: "/", permanent: true },
    };
  }

  if (isDIDstring(did)) {
    support = "supported";
    const vess = getVESS(CERAMIC_NETWORK !== "mainnet");
    const heldWorkCredentials = queryClient.prefetchQuery<WorkCredentialWithId[]>(["heldWorkCredentials", did], () => vess.getHeldWorkCredentials(did),{
      staleTime: Infinity,
      cacheTime: 1000000,
    })
    const HeldMembershipSubjects = queryClient.prefetchQuery<MembershipSubjectWithId[]>(["HeldMembershipSubjects", did], () => vess.getHeldMembershipSubjects(did),{
      staleTime: Infinity,
      cacheTime: 1000000,
    })
    await Promise.all([heldWorkCredentials,HeldMembershipSubjects])
    return {
      props: { did: did.toLowerCase(), support,dehydratedState: dehydrate(queryClient) },
      revalidate: 60,
    };
  } else if (isEthereumAddress(did)) {
    // If an Ethereum address is provided, redirect to CAIP-10 URL
    return {
      redirect: { destination: `/${getPkhDIDFromAddress(did)}`, permanent: false },
    };
  } 
  return {
    props: { did, support,dehydratedState: dehydrate(queryClient) },
    revalidate: 60,
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

  return <NoProfileContainer />;
};

export default ProfilePage;
