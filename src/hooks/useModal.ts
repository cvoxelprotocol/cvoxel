import {
  useStateGlobalLoading,
  useStateRGlobalTxHash,
  useStateRGlobalTxLoadingModal,
} from "@/recoilstate";
import { useState } from "react";

export const useModal = () => {
  const [isOpenModal, setModalStatus] = useState(false);
  const [isOpenMailRegistModal, setMailRegistModalStatus] = useState(false);
  const [isLoading, setLoading] = useStateGlobalLoading();
  const [isTxModalLoading, setTxModalLoading] = useStateRGlobalTxLoadingModal();
  const [hash, setHash] = useStateRGlobalTxHash();

  const openModal = () => {
    setLoading(false);
    setModalStatus(true);
  };

  const openMailRegistModal = () => {
    setLoading(false);
    setMailRegistModalStatus(true);
  };

  const closeModal = () => {
    setModalStatus(false);
    setMailRegistModalStatus(false);
  };

  const showLoading = () => setLoading(true);
  const closeLoading = () => setLoading(false);

  const showTxLoading = () => setTxModalLoading(true);
  const closeTxLoading = () => setTxModalLoading(false);

  return {
    isLoading,
    isOpenModal,
    isOpenMailRegistModal,
    isTxModalLoading,
    hash,
    closeModal,
    openModal,
    showLoading,
    closeLoading,
    openMailRegistModal,
    showTxLoading,
    closeTxLoading,
    setHash,
  };
};
