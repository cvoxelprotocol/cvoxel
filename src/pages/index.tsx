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
    <main className="h-auto overflow-y-scroll text-black dark:text-white text-center">
      <div className="flex flex-col items-center w-full h-full pb-12">
        <div className="w-[320px] sm:w-[500px] mt-24">
          <Search onSubmit={onSubmit} />
        </div>
        <div className="flex w-full items-center justify-center h-[300px] sm-h-[450px] relative">
          <Canvas shadows>
            <VisualizerPresenter />
          </Canvas>
        </div>
        <div className="flex-none w-full max-w-[720px]">
          {!account ? (
            <>
              <button
                className="rounded-full py-1.5 px-4 font-normal text-base  text-white bg-gradient-to-r from-border_l to-border_r"
                onClick={() => connect()}
              >
                {" "}
                Connect Wallet
              </button>
              <div className="pt-2 font-medium text-xs text-gray-500 flex items-center justify-center">
                <FontAwesomeIcon
                  className="w-5 h-5 mr-2"
                  icon={faCircleExclamation}
                  color={"#EFA9E0"}
                />
                <div>
                  <p className="w-full max-w-[450px] break-words">
                    Current Version is Alpha and Supports Only
                    <br />
                    <span className="font-bold px-1">
                      Ethereum Mainnet for Wallet(Metamask)
                    </span>
                    and
                    <span className="font-bold px-1">
                      Testnet of Ceramic Network
                    </span>
                  </p>
                </div>
              </div>
            </>
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
      </div>
    </main>
  );
};

export default HomePage;
