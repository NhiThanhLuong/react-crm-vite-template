import { DateRangeParams, TFilterSchema } from '@/ts/types'
import validator from './validate'
import { DefaultOptionType } from 'antd/es/select'

export const FILTER_ID: TFilterSchema<Record<'id', number>> = {
  name: 'id',
  type: 'number',
  element: 'number',
  placeholder: 'ID',
  fieldProps: {
    controls: false,
  },
}

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
})

export const FILTER_CREATE_AT_RANGE: TFilterSchema<DateRangeParams>[] = [
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
]

export const FILTER_PHONE_NUMBER: TFilterSchema<Record<'phone', string>> = {
  name: 'phone',
  type: 'string',
  element: 'input',
  placeholder: 'Số điện thoại',
  formItemProps: {
    rules: validator('number'),
  },
}
