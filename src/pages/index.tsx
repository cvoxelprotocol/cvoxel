import { NextPage } from "next";
import dynamic from "next/dynamic";

const ProfileContainer = dynamic(
  () => import("@/components/containers/profile/ProfileContainer"),
  {
    ssr: false,
  }
);

const HomePage: NextPage = () => {
  return <ProfileContainer did="" />;
};

export default HomePage;
