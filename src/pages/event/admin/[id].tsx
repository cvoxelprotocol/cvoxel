import { AdminEventDetailContainer } from "@/components/containers/event/AdminEventDetailContainer";
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

export default function AdminEventDetail({ id }: Props) {
  return <AdminEventDetailContainer eventId={id} />
}
