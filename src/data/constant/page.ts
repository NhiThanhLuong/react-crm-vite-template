import { PageParams, TFilterSchema } from '@/ts/types';

export const DEFAULT_PAGINATION = {
  page: 1,
  perPage: 10,
};

export const FILTER_SCHEMA_PAGE_LIST: TFilterSchema<PageParams>[] = [
  {
    name: 'page',
    type: 'number',
    defaultValue: DEFAULT_PAGINATION.page,
  },
  {
    name: 'perPage',
    type: 'number',
    defaultValue: DEFAULT_PAGINATION.perPage,
  },
];
