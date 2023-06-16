import { cloneDeep, isEmpty } from 'lodash';
import { useCallback, useEffect, useMemo } from 'react';

import { DEFAULT_PAGINATION } from '@/data/constant';
import { PageParams, TFilterSchema } from '@/ts/types';
import { findObjInArrByKey } from '@/utils';
import { TablePaginationConfig } from 'antd';
import dayjs from 'dayjs';
import { URLSearchParamsInit } from 'react-router-dom';
import { useCustomSearchParams } from './use-custom-search-params';

export const useFilter = <T extends PageParams>(
  filterSchema: TFilterSchema<T>[]
) => {
  const { paramsRouter, setParamsRouter } = useCustomSearchParams();

  const schemaList = useMemo(
    () => filterSchema.filter(({ element }) => !!element),
    [filterSchema]
  );

  const defaultValues = useMemo(
    () =>
      filterSchema
        .filter(({ defaultValue }) => !!defaultValue)
        .reduce(
          (obj, { name, defaultValue }) => ({
            ...obj,
            [name]: defaultValue,
          }),
          {}
        ),
    [filterSchema]
  );

  useEffect(() => {
    if (!isEmpty(defaultValues)) setParamsRouter(defaultValues);
  }, [defaultValues, setParamsRouter]);

  const filter = useMemo(() => {
    const result = {} as { [key: string]: K };

    for (const keyParam in paramsRouter) {
      const filterItem = findObjInArrByKey(filterSchema, keyParam, 'name');

      if (!filterItem) continue;

      result[keyParam] = formatValueWithType(
        filterItem,
        paramsRouter[keyParam]
      );
    }

    return result;
  }, [filterSchema, paramsRouter]);

  const apiFilter = useMemo(() => {
    return formatFilterBeforeSyncURL(filter);
  }, [filter]) as T;

  const onResetFilter = () => {
    setParamsRouter({});
  };

  const onFilterChange = useCallback(
    (newFilter: T) => {
      const cloneFilter = cloneDeep(newFilter);
      if (!cloneFilter.page) {
        cloneFilter.page = DEFAULT_PAGINATION.page;
      }

      setParamsRouter(
        formatFilterBeforeSyncURL({
          ...apiFilter,
          ...cloneFilter,
        }) as URLSearchParamsInit
      );
    },
    [apiFilter, setParamsRouter]
  );

  const onPageChange = useCallback(
    ({ current, pageSize }: TablePaginationConfig) => {
      onFilterChange({ page: current, perPage: pageSize } as T);
    },
    [onFilterChange]
  );

  return {
    schemaList,
    filter,
    apiFilter,
    onFilterChange,
    onPageChange,
    onResetFilter,
  };
};

// Handle when format type
const formatType = {
  number: (value: string) => +value,
  date: (value: string) => dayjs(value),
  string: (value: string) => value,
};
export const formatValueWithType = <T extends Record<string, unknown>>(
  { defaultValue, type }: TFilterSchema<T>,
  value?: string
) => {
  if (!value) return defaultValue;
  try {
    return formatType[type](value);
  } catch (error) {
    return;
  }
};
type K = ReturnType<typeof formatValueWithType>;

export const formatFilterBeforeSyncURL = (filter: {
  [key: string]: unknown;
}) => {
  const cloneFilter = cloneDeep(filter);
  for (const filterKey in cloneFilter) {
    const filterValue = cloneFilter[filterKey];

    if (typeof filterValue === 'number') continue;

    // process invalid value
    if (!filterValue) {
      delete cloneFilter[filterKey];
      continue;
    }

    // process date
    if (dayjs.isDayjs(filterValue)) {
      cloneFilter[filterKey] = filterValue.format('YYYY-MM-DD HH:mm:ss');
      continue;
    }
  }

  return cloneFilter as { [key: string]: NonNullable<K> };
};
