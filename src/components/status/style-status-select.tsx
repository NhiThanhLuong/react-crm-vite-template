import { Select, SelectProps } from 'antd';
import styled from 'styled-components';

type StyleProps = SelectProps & {
  color: string;
};

const StyleStatusSelect = styled((props: StyleProps) => <Select {...props} />)`
  .ant-select-selector {
    background-color: ${(props) => props.color} !important;
  }
  .ant-select-selection-item {
    font-size: 1rem;
    line-height: 1.5rem;
    color: #fff;
  }
  .ant-select-arrow {
    color: #fff;
  }
`;

export default StyleStatusSelect;
