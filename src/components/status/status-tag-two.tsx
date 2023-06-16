import { Tag, TagProps } from 'antd';
import { FC } from 'react';

type Props = TagProps & {
  statusObj: {
    color: string;
    label: string;
  };
};

const StatusTagTwo: FC<Props> = ({ statusObj, ...props }) => {
  return (
    <Tag
      color={statusObj.color}
      className="min-w-[120px] text-center px-2 py-1 text-sm font-medium"
      {...props}
    >
      {statusObj.label}
    </Tag>
  );
};

export default StatusTagTwo;
