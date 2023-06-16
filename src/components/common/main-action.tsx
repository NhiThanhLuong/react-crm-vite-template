import { PopconfirmProps, Space } from 'antd';
import { FC, ReactNode } from 'react';
import CommonButton from './common-button';
import ConfirmButton from './confirm-button';

type Props = {
  isCancelDisabled?: boolean;
  isOkDisabled?: boolean;
  isOkLoading?: boolean;
  isAddType?: boolean;
  cancelText?: ReactNode;
  onOk: PopconfirmProps['onConfirm'];
  onCancel: () => void;
};

const MainAction: FC<Props> = ({
  isCancelDisabled,
  isOkDisabled,
  isOkLoading,
  onCancel,
  onOk,
  cancelText = 'Hủy bỏ',
  isAddType = false,
}) => {
  return (
    <Space className="flex justify-end mt-4">
      <ConfirmButton
        onConfirm={onCancel}
        title="Bạn có chắc chắn hủy bỏ?"
        button={
          <CommonButton
            action="cancel"
            disabled={isCancelDisabled}
            className="flex"
          >
            {cancelText}
          </CommonButton>
        }
      />
      <ConfirmButton
        title="Bạn có chắc chắn muốn thực hiện?"
        onConfirm={onOk}
        button={
          <CommonButton
            action={isAddType ? 'add' : 'save'}
            disabled={isOkDisabled}
            loading={isOkLoading}
            className="flex"
          >
            {isAddType ? 'Thêm' : 'Cập nhật'}
          </CommonButton>
        }
      />
    </Space>
  );
};

export default MainAction;
