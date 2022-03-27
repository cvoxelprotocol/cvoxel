import {isCAIP10string, isDIDstring} from '@self.id/framework'
import type { GetServerSideProps } from 'next'
import { isEthereumAddress } from '@/utils/ceramicUtils'
import { ETH_CHAIN_ID } from '@/constants/common'
import {getRequestState} from "../../lib/ceramic/server"
import { CeramicProps, CeramicSupport } from '@/interfaces/ceramic'
import { NextPage } from 'next';
import { useMyCeramicAcount } from '@/hooks/useCeramicAcount'
import { HomeContainer } from '@/components/containers/home'
import { ProfileContainer } from '@/components/containers/profile/ProfileContainer'
import { NoProfileContainer } from '@/components/containers/profile/NoProfileContainer'
import { core } from '@/lib/ceramic/server'

export const getServerSideProps: GetServerSideProps<CeramicProps, { did: string }> = async (ctx) => {
  const did = ctx.params?.did
  let support: CeramicSupport = 'invalid'

  if (did == null) {
    return {
      redirect: { destination: '/', permanent: true },
    }
  }

  if (isDIDstring(did)) {
    support = "supported"
    return {
      props: { did, state: await getRequestState(ctx, did), support },
    }
  } else if (isEthereumAddress(did)) {
    // If an Ethereum address is provided, redirect to CAIP-10 URL
    return {
      redirect: { destination: `/${did}${ETH_CHAIN_ID}`, permanent: false },
    }
  } else if (isCAIP10string(did)) {
    try {
      const linkedDid = await core.getAccountDID(did)
      if (linkedDid != null) {
        return {
          redirect: { destination: `/${linkedDid}`, permanent: false },
        }
      } else {
        support = "unlinked"
        return {
          props: { did, state: await getRequestState(ctx), support },
        }
      }
    } catch (err) {
      // Ignore error trying to get DID from CAIP-10
      support = "unlinked"
      return {
        props: { did, state: await getRequestState(ctx), support },
      }

    }
  }
  return {
    props: { did, state: await getRequestState(ctx), support },
  }
  
}

const  ProfilePage:NextPage<CeramicProps> = (props:CeramicProps) => {
  const { did:myDID, account } = useMyCeramicAcount();

  if(props.support === "supported") {
    return (
      <>
        {((myDID && myDID === props.did) || (account && `${account}${ETH_CHAIN_ID}` === props.did)) ? (
          <HomeContainer />
        ): (
          <ProfileContainer {...props}/>
        )}
      </>
    )
  }

  if(props.support === "unlinked") {
    return (
      <>
        {(account && `${account}${ETH_CHAIN_ID}` === props.did) ? (
          <HomeContainer />
        ): (
          <NoProfileContainer />
        )}
      </>
  );
  }

  return (
    <NoProfileContainer />
  );
}

export default ProfilePage