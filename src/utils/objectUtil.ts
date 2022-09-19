export const removeUndefined = <T extends {}>(object: T): T => {
  return Object.fromEntries(
    Object.entries(object).filter(([_, v]) => v !== undefined)
  ) as T;
};

export const shortenStr = (str?: string, length = 20): string => {
  if (!str) return "";
  const half = Math.floor(length / 2);
  const remaining = half - 3 - length;
  return str.length <= length
    ? str
    : `${str.slice(0, half)}...${str.slice(remaining)}`;
};

export const shortHash = (hash?: string, maxLength: number = 20) => {
  if (!hash) return "";
  const half = Math.floor(maxLength / 2);
  const remaining = half - maxLength;
  return hash.length <= maxLength
    ? hash
    : `${hash.slice(0, half)}...${hash.slice(remaining)}`;
};
