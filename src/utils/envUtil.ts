export const getEnv = (key: string) => {
  const value = process.env[key];
  if (!value) throw new Error(`env ${key} is req`);
  return value;
};
