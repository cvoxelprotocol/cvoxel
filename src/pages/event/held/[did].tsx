import { GetServerSideProps, NextPage } from "next";
import { HeldEventContainer } from "@/components/containers/event/held";

type Props = {
    did?: string;
  };

export const getServerSideProps: GetServerSideProps<
  Props,
  { did: string }
> = async (ctx) => {
  
  const did = ctx.params?.did;
  return {
    props: { did },
  };
};
const EventHeldPage: NextPage = ({did}: Props) => {

  return <HeldEventContainer did={did || ""}/>
};

export default EventHeldPage;
