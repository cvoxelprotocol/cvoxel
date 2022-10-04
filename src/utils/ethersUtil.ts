import { formatUnits } from "@ethersproject/units";
import { BigNumberish } from "ethers";

export const formatBigNumber = (
  value: BigNumberish = "0",
  precision = 2,
  decimals: string = "18"
): string =>
  Number(formatUnits(value, decimals)).toLocaleString(undefined, {
    maximumFractionDigits: precision,
  });
