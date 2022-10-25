import { WorkspaceDetailContainer } from "@/components/containers/workspace/WorkspaceDetailContainer";
import type { GetServerSideProps } from "next";

type Props = {
  id?: string;
};

export const getServerSideProps: GetServerSideProps<
  Props,
  { id: string }
> = async (ctx) => {
  
  const id = ctx.params?.id;
  return {
    props: { id: `ceramic://${id}` },
  };
};

export default function WorkspacePage({ id }: Props) {
  return <WorkspaceDetailContainer orgId={id} />
}
