import { shortHash } from "./tools";
import { is } from "./typeUtils";
import superjson from "superjson";

export const removeUndefined = <T>(object: T): T => {
  return Object.fromEntries(
    Object.entries(object).filter(([_, v]) => v !== undefined)
  ) as T;
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
