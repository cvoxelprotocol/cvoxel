import type { RequestState } from '@self.id/framework'
import type { GetServerSideProps } from 'next'

import { useCVoxel } from '../../../hooks/useCVoxel'

type Props = {
  did: string
  id: string
  state: RequestState
}

export const getServerSideProps: GetServerSideProps<Props, { did: string; id: string }> = async (
  ctx
) => {
  const did = ctx.params?.did
  if (did == null) {
    return {
      redirect: { destination: '/', permanent: true },
    }
  }

  const id = ctx.params?.id
  if (id == null) {
    return {
      redirect: { destination: `/${did}`, permanent: false },
    }
  }

  const { getRequestState } = await import('../../../lib/ceramic/server')
  return {
    props: { did, id, state: await getRequestState(ctx, did) },
  }
}

export default function CVoxelPage({ did, id }: Props) {
  const cVoxel = useCVoxel(did, id)

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <p>{cVoxel.content?.summary}</p>
    </div>
  )
}
