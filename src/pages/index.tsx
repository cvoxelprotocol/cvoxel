import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useMyCeramicAcount } from "@/hooks/useCeramicAcount";
import { useForm } from "react-hook-form";
import VisualizerPresenter from "@/components/CVoxel/visualizerPresenter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Router from "next/router";
import { Button } from "@/components/common/button/Button";

const HomePage: NextPage = () => {
  const { connection, did, account, connectWalletOnly } = useMyCeramicAcount();
  const [currentStatus, setCurrentStatus] = useState<
    "disconnected" | "connecting" | "failed" | "connected"
  >(connection.status);

  useEffect(() => {
    if (
      connection.status === "connected" &&
      did &&
      currentStatus !== "connected"
    ) {
      setCurrentStatus(connection.status);
      Router.push(`/${did}`);
    }
  }, [connection, did]);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    if (!data.address) return;
    const link = data.address;
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
          <form
            className="w-full flex justify-center items-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="w-full my-1 py-2 px-6 border rounded-full shadow-xl text-xs md:text-sm hover:outline-secondary focus:outline-secondary"
              placeholder={"Search DID or ethereum address.."}
              {...register("address", {
                required: "Please enter DID or ethereum address",
              })}
            />
            <button className="flex items-center justify-center" type="submit">
              <FontAwesomeIcon
                className="w-4 h-4 ml-2"
                icon={faSearch}
                color={"#EFA9E0"}
              />
            </button>
          </form>
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
                color="grad-blue"
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
