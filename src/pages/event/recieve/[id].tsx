import { RecieveEventAttendanceContainer } from "@/components/containers/event/RecieveEventAttendanceContainer";
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

export default function EventRecievePage({ id }: Props) {
  return <RecieveEventAttendanceContainer eventId={id} />
}
