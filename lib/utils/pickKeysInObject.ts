export const pickKeysInObject = <
  T extends Record<any, any>,
  K extends (keyof T)[],
>(
  o: T,
  keys: K,
): Pick<T, K[number]> => {
  const result = {} as Pick<T, K[number]>;

  for (const key of keys) {
    result[key] = o[key];
  }

  return result;
};
