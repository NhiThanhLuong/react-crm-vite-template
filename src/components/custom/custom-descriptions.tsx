import { DescriptionsRecord } from '@/ts/types';
import { Descriptions, DescriptionsProps, Typography } from 'antd';
import { FC } from 'react';
import RequiredLabel from '../common/required-label';

type Props = DescriptionsProps & {
  data: DescriptionsRecord[];
};

const CustomDescriptions: FC<Props> = ({
  column = 1,
  bordered = true,
  data,
  ...props
}) => {
  return (
    <Descriptions
      {...{
        column,
        bordered,
      }}
      {...props}
    >
      {data.map((item) => {
        if (item.isShow === false) return null;

        const labelTitle = item.isRequired ? (
          <RequiredLabel label={item.labelText} />
        ) : (
          <Typography.Text>{item.labelText}</Typography.Text>
        );

        return (
          <Descriptions.Item key={item.labelText} label={labelTitle}>
            {item.descriptionElement}
          </Descriptions.Item>
        );
      })}
    </Descriptions>
  );
};

export default CustomDescriptions;
