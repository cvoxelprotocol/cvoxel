import {useStateGlobalToast} from "@/recoilstate";

export const useCVoxelToast = () => {
  const [isShow, setIsShow] = useStateGlobalToast()

  const showToast = () => setIsShow(true)
  const closeToast = () => setIsShow(false)

  return {
    isToastShow: isShow,
    showToast,
    closeToast
  }
}