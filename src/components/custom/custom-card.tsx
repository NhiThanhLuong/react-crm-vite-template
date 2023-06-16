import { Card, CardProps, Spin } from 'antd';
import { FC } from 'react';

type Props = CardProps & {
  isLoading?: boolean;
};

const CustomCard: FC<Props> = ({
  isLoading = false,
  title,
  className,
  ...props
}) => {
  return (
    <Card
      title={
        title && <b className="inline-block min-h-[32px] text-lg">{title}</b>
      }
      className={className}
      {...props}
    >
      <Spin spinning={isLoading}>{props.children}</Spin>
    </Card>
  );
};

export default CustomCard;
