import { formatUnits } from "@ethersproject/units";
import { BigNumberish, utils } from "ethers";

export const getAddressFromStr = (addressStr: string): string => {
  return utils.getAddress(addressStr);
};

export const formatBigNumber = (
  value: BigNumberish,
  precision = 2,
  decimals: string = "18"
): string => Number(formatUnits(value, decimals)).toFixed(precision);

export const formatBigNumberWithoutPrecision = (
  value: BigNumberish,
  decimals: string = "18"
): string => formatUnits(value, decimals);
