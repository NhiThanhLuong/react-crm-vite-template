import {
  DatePicker,
  DatePickerProps,
  Form,
  FormInstance,
  Input,
  InputNumber,
  InputProps,
  Select,
} from 'antd';
import { Dayjs } from 'dayjs';
import { ReactElement } from 'react';

import { TFilterSchema } from '@/ts/types';
import { checkDisableFrom, checkDisableTo } from '@/utils';
import { PickerDateProps } from 'antd/es/date-picker/generatePicker';

type Props<T extends Record<string, unknown>> = Omit<
  TFilterSchema<T>,
  'type' | 'defaultValue'
> & {
  form: FormInstance;
  children?: ReactElement;
  fromDateName?: string;
  toDateName?: string;
};

const FilterItem = <T extends Record<string, unknown>>({
  form,
  name,
  element,
  fieldProps = {},
  formItemProps = {},
  placeholder,
  children,
  fromDateName,
  toDateName,
}: Props<T>) => {
  if (element !== 'number') {
    (fieldProps as InputProps).allowClear ??= true;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let Component: any;
  switch (element) {
    case 'input':
      Component = Input;
      break;
    case 'number':
      Component = InputNumber;
      break;
    case 'select':
      Component = Select;
      break;
    case 'date':
      Component = DatePicker;
      (fieldProps as DatePickerProps).format ??= 'DD/MM/YYYY HH:mm:ss';
      (fieldProps as PickerDateProps<unknown>).showTime ??= true;
      if (fromDateName)
        (fieldProps as DatePickerProps).disabledDate = (value: Dayjs) =>
          checkDisableTo(value, fromDateName, form);
      if (toDateName)
        (fieldProps as DatePickerProps).disabledDate = (value: Dayjs) =>
          checkDisableFrom(value, toDateName, form);
      break;
    default:
      Component = Input;
      break;
  }

  return (
    <Form.Item className="mb-2" name={name as string} {...formItemProps}>
      <Component className="w-full" placeholder={placeholder} {...fieldProps}>
        {children}
      </Component>
    </Form.Item>
  );
};

export default FilterItem;
