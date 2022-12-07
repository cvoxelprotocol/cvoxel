import { FC } from "react";
import RefreshIcon from "@/components/common/button/refresh.svg";
import { Button } from "@/components/common/button/Button";
import CloseIcon from "@/components/common/button/close.svg";
import { useDevProtocol } from "@/hooks/useDevProtocol";
import { DevProtocolTokenItem } from "@/components/DevProtocol/DevProtocolTokenItem";
import { CommonSpinner } from "@/components/common/CommonSpinner";
import { useModal } from "@/hooks/useModal";
import { useToast } from "@/hooks/useToast";
import { CVOXEL_CREATION_SUCCEED } from "@/constants/toastMessage";

export const DevProtocolTokenList: FC = () => {
  const {
    issuedData,
    unissuedData,
    onChainData,
    reFetchData,
    issueCRDL,
    setIsDevProtocolOpen,
  } = useDevProtocol();
  const { showLoading, closeLoading } = useModal();
  const { lancInfo, lancError } = useToast();

  const onUpload = async () => {
    try {
      showLoading();
      await issueCRDL(unissuedData?.map((item) => item.tokenHash) ?? []);
      setIsDevProtocolOpen(false);
      closeLoading();
      lancInfo(CVOXEL_CREATION_SUCCEED);
    } catch (error) {
      closeLoading();
      console.log(error);
      lancError(JSON.stringify(error));
    }
  };

  const reFetch = async () => {
    try {
      showLoading();
      await reFetchData();
      closeLoading();
    } catch (error) {
      closeLoading();
      console.log(error);
      lancError(JSON.stringify(error));
    }
  };

  return (
    <div className="w-full sm:w-3/4 h-2/3 relative p-4 bg-gray-100 dark:bg-card">
      <div className="w-full h-full overflow-auto">
        <div className="p-4 sm:flex items-center justify-between absolute top-0 right-0 left-0 z-50 bg-gray-100 dark:bg-card">
          <div className="flex space-x-3 items-center">
            <div className="text-light-on-primary-container dark:text-dark-on-primary-container text-3xl font-bold py-2">
              Your Tokens from Dev Protocol
            </div>
          </div>
          <div className="flex space-x-4 items-center justify-end text-xs sm:text-lg text-light-on-primary-container dark:text-dark-on-error-container">
            <button
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-gray-300"
              onClick={reFetch}
            >
              <RefreshIcon className="w-4 h-4 sm:w-5 sm:h-5 text-light-on-primary-container" />
            </button>

            <div>
              <Button
                text="Issue Credential"
                color={unissuedData?.length === 0 ? "gray" : "primary"}
                buttonType="button"
                onClick={onUpload}
                disabled={
                  unissuedData?.length === 0 || unissuedData == undefined
                }
              />
            </div>
            <div>
              <button onClick={() => setIsDevProtocolOpen(false)}>
                <CloseIcon className="w-5 h-5 text-light-on-surface-variant dark:text-dark-on-surface-variant" />
              </button>
            </div>
          </div>
        </div>

        {!!unissuedData ? (
          onChainData?.length ?? 0 > 0 ? (
            <>
              <div className="w-full relative top-32 sm:top-16">
                <div className="w-full relative pt-2 space-y-1 border-light-on-primary-container dark:border-dark-on-primary-container overflow-y-scroll hidden-scrollbar bg-light-surface-1 dark:bg-dark-surface-1">
                  {unissuedData.map((item) => {
                    return (
                      <DevProtocolTokenItem key={item.tokenHash} item={item} />
                    );
                  })}

                  {issuedData &&
                    issuedData.map((item) => {
                      return (
                        <DevProtocolTokenItem
                          key={item.tokenHash}
                          item={item}
                          issued={true}
                        />
                      );
                    })}
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex justify-center items-center">
              <div className="text-light-on-primary-container dark:text-dark-on-primary-container text-2xl">
                No tokens available for issue
              </div>
            </div>
          )
        ) : (
          <div className="h-full flex justify-center items-center">
            <CommonSpinner />
          </div>
        )}
      </div>
    </div>
  );
};
