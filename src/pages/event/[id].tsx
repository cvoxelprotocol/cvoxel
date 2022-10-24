import { EventDetailContainer } from "@/components/containers/event/EventDetailContainer";
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

export default function EventDetail({ id }: Props) {
  return <EventDetailContainer eventId={id} />
}
