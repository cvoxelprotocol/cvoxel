// utilities to write type-safer code

// like object entries, but better typed
export function entries<O>(o: O) {
  return Object.entries(o) as [keyof O, O[keyof O]][];
}

// type guard for filtering out null objects
export const isNotNull = <T>(x: T | null): x is T => {
  return x !== null;
};

export const is = (type: string, obj: object): boolean => {
  const clas = Object.prototype.toString.call(obj).slice(8, -1);
  return obj !== undefined && obj !== null && clas === type;
};

export function isDate(
  arg: Date | [Date | null, Date | null] | null
): arg is Date {
  if (!arg) return false;
  return !Array.isArray(arg);
}
