import { useStateGlobalToast } from "@/recoilstate";
import { CVoxelThree } from "@/interfaces";
import { useCallback } from "react";

export const useCVoxelToast = () => {
  const [toast, setToast] = useStateGlobalToast();
  const sleep = (second: number) =>
    new Promise((resolve) => setTimeout(resolve, second * 1000));

  const closeToast = useCallback(
    () => setToast({ isShow: false, message: "", voxel: undefined }),
    [setToast]
  );

  const showToast = useCallback(
    async ({
      message,
      voxel,
      duration,
    }: {
      message: string;
      voxel: CVoxelThree;
      duration?: number;
    }) => {
      setToast({ isShow: true, message: message, voxel: voxel });
      if (!!duration) {
        await sleep(duration);
        closeToast();
      }
    },
    [closeToast, setToast]
  );

  return {
    toast,
    showToast,
    closeToast,
  };
};
