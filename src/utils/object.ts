export const removeUndefinedObject = (obj: { [key: string]: unknown }) =>
  Object.keys(obj).forEach((key) => obj[key] === undefined && delete obj[key]);
