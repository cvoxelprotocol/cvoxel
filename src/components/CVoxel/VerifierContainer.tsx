import { FC } from "react";
import { CommonSpinner } from "../common/CommonSpinner";
import { useENS } from "@/hooks/useENS";

type VerifierContainerProps = {
  isPayer: boolean;
  address: string;
};
export const VerifierContainer: FC<VerifierContainerProps> = ({
  isPayer,
  address,
}) => {
  const { ens, ensLoading } = useENS(address);

  return (
    <>
      {ensLoading ? (
        <CommonSpinner size="sm" />
      ) : (
        <p className="text-primary text-xs">
          {isPayer ? `TO: ` : `FROM: `}
          {ens}
        </p>
      )}
    </>
  );
};
