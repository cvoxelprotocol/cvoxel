import OneCVoxel from "@/components/CVoxel/OneCVoxel";
import { NextPage } from "next";

const NFTTest: NextPage = () => {
  return (
    <>
      <div className="w-[90px] h-[90px] border-2">
        <OneCVoxel color="hsl(330, 70%, 50%)" opacity={1} lattice />
      </div>
      <div className="btn btn-primary rounded-full">aaaa</div>
    </>
  );
};

export default NFTTest;
