import { Status } from '@/ts/types';
import { findObjInArrByKey } from '@/utils';
import { SelectProps } from 'antd';
import { FC } from 'react';
import StyleStatusSelect from './style-status-select';

type Props = Omit<SelectProps, 'options'> & {
  options: Status[];
};

const ColorSelect: FC<Props> = ({ options, ...props }) => {
  if (!props.value) return <span></span>;
  return (
    <StyleStatusSelect
      color={findObjInArrByKey(options, props.value)!.color}
      options={options}
      {...props}
    />
  );
};

export default ColorSelect;
