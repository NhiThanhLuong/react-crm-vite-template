import {
  DatePickerProps,
  FormItemProps,
  InputNumberProps,
  InputProps,
  SelectProps,
} from 'antd';
import { Dayjs } from 'dayjs';

// type Component
type TInput = {
  element: 'input';
  fieldProps?: InputProps;
};

type TSelect = {
  element: 'select';
  fieldProps?: SelectProps;
};

type TInputNumber = {
  element?: 'number';
  fieldProps?: InputNumberProps;
};

// Type schemaFilter
type ITypeString = (TSelect | TInput) & {
  type: 'string';
  defaultValue?: string;
};

type ITypeNumber = (TSelect | TInputNumber) & {
  type: 'number';
  defaultValue?: number;
};

type ITypeDate = {
  type: 'date';
  defaultValue?: Dayjs;
  element: 'date';
  fieldProps?: DatePickerProps;
  fromDateName?: string;
  toDateName?: string;
};

type IType = ITypeString | ITypeNumber | ITypeDate;

export type TFilterSchema<T extends Record<string, unknown>> = IType & {
  name: keyof T;
  placeholder?: string;
  formItemProps?: FormItemProps;
  allowClear?: boolean;
};
