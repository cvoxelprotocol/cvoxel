import { is } from "./typeUtils";
import superjson from "superjson";

export const removeUndefined = <T>(object: T): T => {
  return Object.fromEntries(
    Object.entries(object).filter(([_, v]) => v !== undefined)
  ) as T;
};

export const removeUndefinedFromArray = <T>(array: T[]): T[] => {
  return array.filter((a) => a !== undefined);
};

export const formatFromSuperjson = <T>(object: any): T => {
  if (isString(object)) {
    return superjson.parse<{ json: T }>(object).json;
  }
  return object;
};

export const shortenStr = (str?: string, length = 20): string => {
  if (!str) return "";
  if (length < 20) {
    length = 20;
  }
  const half = Math.floor(length / 2);
  const remaining = half - 3 - length;
  return str.length <= length
    ? str
    : `${str.slice(0, half)}...${str.slice(remaining)}`;
};

const isString = (obj: any): obj is string => {
  return is("String", obj);
};
