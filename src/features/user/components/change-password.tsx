import { MainAction } from '@/components';
import { DEFAULT_PASSWORD } from '@/data/constant';
import { validator, validatorFn } from '@/utils';
import { UseMutateFunction } from '@tanstack/react-query';
import { Descriptions, Form, Input, Typography } from 'antd';
import { Rule } from 'antd/es/form';
import { FC } from 'react';
import { BodyUpdateUser } from '../services/type';

type Props = {
  mutate: UseMutateFunction<unknown, unknown, BodyUpdateUser, unknown>;
  isLoading?: boolean;
  onCancel?: () => void;
  keyModal?: string;
};

const ChangePassword: FC<Props> = ({
  mutate,
  isLoading,
  onCancel,
  keyModal,
}) => {
  const [form] = Form.useForm();

  const handleFinish = ({ password }: { password: string }) => {
    mutate(
      { password },
      {
        onSuccess: () => onCancel!(),
      }
    );
  };

  const handleReset = () => {
    mutate(
      { password: DEFAULT_PASSWORD },
      {
        onSuccess: () => onCancel!(),
      }
    );
  };

  return keyModal === '1' ? (
    <Form form={form} onFinish={handleFinish} disabled={isLoading}>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Mật khẩu mới">
          <Form.Item
            name="password"
            className="mb-0"
            rules={validator(['required', 'noWhiteSpace']).concat(
              validatorFn('minAndMax')(8, 16)
            )}
            hasFeedback
          >
            <Input.Password placeholder="Nhập mật khẩu mới" />
          </Form.Item>
        </Descriptions.Item>

        <Descriptions.Item label="Xác nhận mật khẩu mới">
          <Form.Item
            name="confirm_password"
            className="mb-0"
            dependencies={['password']}
            rules={validator(['required', 'confirmPassword'])}
            hasFeedback
          >
            <Input.Password placeholder="Xác nhận mật khẩu mới" />
          </Form.Item>
        </Descriptions.Item>
      </Descriptions>
      <MainAction onOk={form.submit} onCancel={onCancel as () => void} />
    </Form>
  ) : (
    <>
      <Typography.Text>
        Bạn có muốn reset mật khẩu về mặc định:{' '}
      </Typography.Text>
      <Typography.Text className="text-base" strong>
        123456a@
      </Typography.Text>
      <MainAction onOk={handleReset} onCancel={onCancel as () => void} />
    </>
  );
};

export default ChangePassword;

const validateConfirmPassword: Rule = ({ getFieldValue }) => ({
  validator(_, value) {
    if (!value || getFieldValue('password') === value) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error('Nội dung phải trùng khớp với mật khẩu trên')
    );
  },
});
