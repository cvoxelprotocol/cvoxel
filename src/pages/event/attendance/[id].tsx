import { EventAttendanceDetailContainer } from "@/components/containers/event/EventAttendanceDetailContainer";
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

export default function EventAttendanceDetail({ id }: Props) {
  return <EventAttendanceDetailContainer attendanceId={id} />
}
