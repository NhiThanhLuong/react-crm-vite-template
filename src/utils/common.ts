import { isArray, isEqual, isObject, transform } from 'lodash';

type PlainObject = Record<string, unknown>;

export function differentObject<T extends PlainObject>(
  object: T,
  base?: T
): Partial<T> {
  function changes(object: T, base?: T): Partial<T> {
    if (!base) return object;
    return transform(object, (result: Partial<T>, value: unknown, key) => {
      if (!isEqual(value, base[key])) {
        if (isArray(value))
          result[key as keyof T] = value as T[keyof T] | undefined;
        else {
          if (value || base[key])
            result[key as keyof T] =
              !(value instanceof Date) && isObject(value) && isObject(base[key])
                ? (changes(value as T, base[key] as T) as
                    | T[keyof T]
                    | undefined)
                : (value as T[keyof T] | undefined);
        }
      }
    });
  }
  return changes(object, base);
}

export const isItemInList = <Type = unknown>(item: Type, list: Type[]) =>
  new Set(list).has(item);

export const getPathImg = (imgSrc: string) =>
  `${import.meta.env.VITE_ROUTE_IMG}/${imgSrc}`;
