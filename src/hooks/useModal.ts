import { useStateGlobalLoading } from "@/recoilstate";

export const useModal = () => {
  const [isLoading, setLoading] = useStateGlobalLoading();

  const showLoading = () => setLoading(true);
  const closeLoading = () => setLoading(false);

  return {
    isLoading,
    showLoading,
    closeLoading,
  };
};
