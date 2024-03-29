import Lottie from "react-lottie-player";
import loadingJson from "./VESS_loading.json";

type Props = {
  text?: string;
};
export default function LoadingModal(props:Props) {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-white bg-opacity-50 flex flex-col items-center justify-center">
      <div className="flex justify-center items-center">
        <Lottie
          loop
          animationData={loadingJson}
          play
          style={{ width: 200, height: 200 }}
        />
      </div>
      <p className="text-black font-bold text-xl md:text-2xl">{props.text || ""}</p>
    </div>
  );
};
