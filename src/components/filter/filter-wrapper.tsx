import { TFilterSchema } from '@/ts/types';
import { Col, Form, FormProps, Row } from 'antd';
import { Dayjs } from 'dayjs';
import { cloneDeep } from 'lodash';
import { useEffect } from 'react';
import FilterCard from './filter-card';
import FilterItem from './filter-item';

type Props<T extends Record<string, unknown>> = Omit<FormProps, 'onChange'> & {
  filter: {
    [key: string]: string | number | Dayjs | undefined;
  };
  onReset: () => void;
  schemaList: TFilterSchema<T>[];
  onChange: (_: Record<string, unknown>) => void;
};

const colProps = {
  xxl: 4,
  lg: 6,
  md: 8,
  sm: 12,
  xs: 24,
};

const FilterWrapper = <T extends Record<string, unknown>>({
  filter,
  onChange,
  onReset,
  schemaList,
  ...props
}: Props<T>) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(filter);
  }, [filter, form]);

  const handleReset = () => {
    form.resetFields();
    onReset();
  };

  const handleFinish = (values: Record<string, unknown>) => {
    const transformValues = cloneDeep(values);
    onChange(transformValues);
  };

  return (
    <Form form={form} onFinish={handleFinish} {...props}>
      <FilterCard onReset={handleReset}>
        <Row gutter={[8, 8]}>
          {schemaList.map(({ type, defaultValue, ...item }) => (
            <Col key={item.name as string} {...colProps}>
              <FilterItem {...item} form={form} />
            </Col>
          ))}
        </Row>
      </FilterCard>
    </Form>
  );
};

export default FilterWrapper;
