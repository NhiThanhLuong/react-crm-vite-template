import { validator, validatorFn } from '@/utils';
import { Button, Form, Input } from 'antd';
import { FC } from 'react';
import { AiOutlineLock, AiOutlineUser } from 'react-icons/ai';

const ForgotPassword: FC = () => {
  return (
    <Form>
      <Form.Item
        name="email"
        rules={validator(['email', 'required'])}
        className="mb-[2vh]"
      >
        <Input prefix={<AiOutlineUser />} size="large" placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={validator(['required', 'noWhiteSpace']).concat(
          validatorFn('minAndMax')(8, 16)
        )}
        className="mb-[2vh]"
        hasFeedback
      >
        <Input.Password
          prefix={<AiOutlineLock />}
          placeholder="Nhập mật khẩu mới"
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="confirm_password"
        rules={validator(['required', 'confirmPassword'])}
        className="mb-[2vh]"
        hasFeedback
      >
        <Input.Password
          prefix={<AiOutlineLock />}
          placeholder="Xác nhận lại mật khẩu mới"
          size="large"
        />
      </Form.Item>

      <Button className="btn-submit" htmlType="submit" type="primary">
        <span>Xác nhận</span>
      </Button>
    </Form>
  );
};

export default ForgotPassword;
