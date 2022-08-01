import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useMyCeramicAcount } from "@/hooks/useCeramicAcount";
import VisualizerPresenter from "@/components/CVoxel/visualizerPresenter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import Router from "next/router";
import { Button } from "@/components/common/button/Button";
import { ViewerConnectionState } from "@self.id/react";
import { Search, SearchData } from "@/components/common/search/Search";

const HomePage: NextPage = () => {
  const { connection, did, account, connectWalletOnly } = useMyCeramicAcount();
  const [currentState, setcurrentState] = useState<ViewerConnectionState>(connection);

  useEffect(() => {
    if (
      connection.status === "connected" &&
      did &&
      currentState.status !== "connected"
    ) {
      setcurrentState(connection);
      Router.push(`/${did}`);
    }
  }, [connection, did]);

  const onSubmit = (data: SearchData) => {
    if (!data.value) return;
    const link = data.value;
    Router.push(`/${link}`);
  };

  const connect = async () => {
    try {
      await connectWalletOnly();
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <main className="h-screen overflow-y-scroll text-black dark:text-white text-center">
      <div className="flex flex-col items-center w-full h-full pb-12 pt-24">
        <div className="flex w-full items-center justify-center h-[300px] sm:h-[450px] relative">
          <Canvas shadows>
            <VisualizerPresenter />
          </Canvas>
        </div>
        <div className="flex-none w-full max-w-[720px]">
          {!account ? (
            <button
              className="rounded-full py-1.5 px-4 font-normal text-base  text-white bg-gradient-to-r from-border_l to-border_r"
              onClick={() => connect()}
            >
              {" "}
              Connect Wallet
            </button>
          ) : (
            <div className="w-full flex justify-center pt-4">
              <Button
                text="Go To Mypage"
                href={`/${did || account}`}
                color="primary"
              />
            </div>
          )}
        </div>
        <div className="w-[320px] sm:w-[500px] mt-24">
          <Search onSubmit={onSubmit} />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
