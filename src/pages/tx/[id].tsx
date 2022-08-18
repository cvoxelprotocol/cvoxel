import { SigRequestContainer } from "@/components/containers/sigRequest/SigRequestContainer";
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
    props: { id },
  };
};

export default function CVoxelPage({ id }: Props) {
  return <SigRequestContainer txId={id} />
}
