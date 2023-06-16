import { USER_STATUS_LIST } from '@/features/user';
import { Status } from '@/ts/types';
import { findObjInArrByKey } from '@/utils';
import { Tag, TagProps } from 'antd';
import { FC } from 'react';

type Props = TagProps & {
  statusList?: Status[];
  value: unknown;
};

const StatusTag: FC<Props> = ({
  statusList = USER_STATUS_LIST,
  value,
  ...props
}) => {
  const status = findObjInArrByKey(statusList, value);
  return (
    <Tag
      color={status?.color}
      className="min-w-[120px] text-center px-2 py-1 text-sm font-medium"
      {...props}
    >
      {status?.label}
    </Tag>
  );
};

export default StatusTag;
