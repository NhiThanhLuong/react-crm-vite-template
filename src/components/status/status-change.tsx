import { useApp } from '@/hooks';
import { Status } from '@/ts/types';
import { findObjInArrByKey } from '@/utils';
import { FC, useCallback } from 'react';
import StyleStatusSelect from './style-status-select';

type Props = {
  value?: number;
  onChange: (_status: number) => void;
  statusList: Status[];
};

const StatusChange: FC<Props> = ({ value, onChange, statusList }) => {
  const { modal } = useApp();
  const handleChange = useCallback(
    (status: number) => {
      modal.confirm({
        title: 'Xác nhận thay đổi trạng thái',
        content: <span>Bạn có chắc chắn muốn thay đổi trạng thái</span>,
        cancelText: 'Hủy bỏ',
        okText: 'Đồng ý',
        onOk: () => {
          onChange(status);
        },
      });
    },
    [modal, onChange]
  );

  if (!value) return <span>Loading...</span>;
  const statusObj = findObjInArrByKey(statusList, value) as Status;

  return (
    <StyleStatusSelect
      value={value}
      color={statusObj.color}
      onChange={handleChange}
      options={statusList}
    />
  );
};

export default StatusChange;
