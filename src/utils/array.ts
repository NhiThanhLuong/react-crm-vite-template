export const findObjInArrByKey = <T extends Record<string, unknown>>(
  arr: T[],
  value: unknown,
  key: keyof T = 'value'
): T | undefined => {
  return arr.find((item) => item[key] === value);
};
