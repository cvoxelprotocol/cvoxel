import { useStateGlobalToast } from "@/recoilstate";
import { CVoxelThree } from "@/interfaces";
import { useCallback } from "react";

export const useCVoxelToast = () => {
  const [toast, setToast] = useStateGlobalToast();

  const showToast = useCallback(
    ({ message, voxel }: { message: string; voxel: CVoxelThree }) =>
      setToast({ isShow: true, message: message, voxel: voxel }),
    [setToast]
  );

  const closeToast = useCallback(
    () => setToast({ isShow: false, message: "", voxel: undefined }),
    [setToast]
  );

  return {
    toast,
    showToast,
    closeToast,
  };
};
