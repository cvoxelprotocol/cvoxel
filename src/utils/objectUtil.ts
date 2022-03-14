import { shortHash } from "./tools";
import { is } from "./typeUtils";
import superjson from "superjson";

export const removeUndefined = <T>(object: T): T => {
  return Object.fromEntries(
    Object.entries(object).filter(([_, v]) => v !== undefined)
  ) as T;
};

export const setDisplayName = (
  address: string,
  name?: string,
  count: number = 10
): string => {
  if (address === name) return `LanC.User[${shortHash(address, count)}]`;
  return name
    ? `${name}[${shortHash(address, count)}]`
    : `LanC.User[${shortHash(address, count)}]`;
};

export const formatFromSuperjson = <T>(object: any): T => {
  if (isString(object)) {
    return superjson.parse<{ json: T }>(object).json;
  }
  return object;
};

const isString = (obj: any): obj is string => {
  return is("String", obj);
};
