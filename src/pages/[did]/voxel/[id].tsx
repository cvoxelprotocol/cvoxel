import type { RequestState } from '@self.id/framework'
import { Box, Button, Form, FormField, Heading, Paragraph, Text, TextArea } from 'grommet'
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

  const { getRequestState } = await import('../../../server')
  return {
    props: { did, id, state: await getRequestState(ctx, did) },
  }
}

export default function CVoxelPage({ did, id }: Props) {
  const cVoxel = useCVoxel(did, id)

  let contents = null
  if (cVoxel.content != null) {
    const titleButton = cVoxel.isEditing ? (
      <Button disabled={cVoxel.isMutating} label="Cancel" onClick={() => cVoxel.toggleEditing(false)} />
    ) : cVoxel.isEditable ? (
      <Button label="Edit" onClick={() => cVoxel.toggleEditing(true)} />
    ) : null

    const text = cVoxel.isEditing ? (
      <Form
        value={{ ...cVoxel }}
        onChange={(content) => {
          cVoxel.setCVoxel(content.content)
        }}
        onReset={() => cVoxel.resetEditingText()}
        onSubmit={() => cVoxel.update()}>
        <FormField name="summary" htmlFor="text-input-text">
          <TextArea autoFocus id="text-input-text" name="summary" />
        </FormField>
        <Box direction="row" gap="medium">
          <Button
            disabled={!cVoxel.isValid || cVoxel.isMutating}
            type="submit"
            primary
            style={{ color: 'white' }}
            label={cVoxel.isMutating ? 'Updating...' : 'Update note'}
          />
          <Button disabled={cVoxel.isMutating} type="reset" label="Reset" />
        </Box>
      </Form>
    ) : (
      <>
        <Box>
        <div className="break-words">
          <p className="w-full flex-wrap" >{JSON.stringify(cVoxel.content)}</p>
        </div>
      </Box>
      </>
    )

    contents = (
      <>
        <Box direction="row">
          <Box flex>
            <Heading level={2} margin={{ top: 'none' }}>
              {cVoxel.content.summary}
            </Heading>
          </Box>
          <Box>{titleButton}</Box>
        </Box>
        {text}
      </>
    )
  } else if (cVoxel.isLoading) {
    contents = <Paragraph>Loading...</Paragraph>
  } else if (cVoxel.isError) {
    contents = <Paragraph>Error loading note</Paragraph>
  }

  return (
    
      <Box direction="row" fill="vertical" flex>
        <Box direction="column" flex pad="medium">
          <div className="break-words">
            {contents}
          </div>
        </Box>
      </Box>
  )
}
