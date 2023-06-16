import { DateRangeParams, TFilterSchema } from '@/ts/types';
import validator from './validate';
import { DefaultOptionType } from 'antd/es/select';

export const filterId: TFilterSchema<Record<'id', number>> = {
  name: 'id',
  type: 'number',
  element: 'number',
  placeholder: 'ID',
  fieldProps: {
    controls: false,
  },
};

export const filterStatus = (
  options?: DefaultOptionType[]
): TFilterSchema<Record<'status', number>> => ({
  name: 'status',
  type: 'number',
  element: 'select',
  placeholder: 'Trạng thái',
  fieldProps: {
    options,
  },
});

export const filterCreateAtRange: TFilterSchema<DateRangeParams>[] = [
  {
    name: 'createdFrom',
    type: 'date',
    element: 'date',
    placeholder: 'Thời gian tạo từ',
    toDateName: 'createdTo',
  },
  {
    name: 'createdTo',
    type: 'date',
    element: 'date',
    placeholder: 'Thời gian tạo đến',
    fromDateName: 'createdFrom',
  },
];

export const filterPhoneNumber: TFilterSchema<Record<'phone', string>> = {
  name: 'phone',
  type: 'string',
  element: 'input',
  placeholder: 'Số điện thoại',
  formItemProps: {
    rules: validator('number'),
  },
};
