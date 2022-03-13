import type { RequestState } from '@self.id/framework'
import type { GetServerSideProps } from 'next'
import { useCVoxelsRecord } from '../../hooks/useCVoxel'
import { ProfileContainer } from '@/components/containers/profile/ProfileContainer'

// import { dehydrate, QueryClient, useQuery } from 'react-query';
 
type Props = {
  did: string
  state: RequestState
}

// export async function getStaticProps() {
//   const queryClient = new QueryClient()

//   await queryClient.prefetchQuery('posts', getPosts)

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   }
// }

export const getServerSideProps: GetServerSideProps<Props, { did: string }> = async (ctx) => {
  const did = ctx.params?.did
  if (did == null) {
    return {
      redirect: { destination: '/', permanent: true },
    }
  }

  const { getRequestState } = await import('../../server')
  return {
    props: { did, state: await getRequestState(ctx, did) },
  }
}

export default function ProfilePage(props:Props) {
  return (
    <ProfileContainer {...props}/>
  )
}
