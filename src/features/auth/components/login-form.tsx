import { Button, Checkbox, Form, Input, Row } from 'antd';
import { FC } from 'react';
import { useSessionStorage } from 'usehooks-ts';

import { LoginValues, useAuthStore, useLoginMutation } from '@/features/auth';
import { useApp } from '@/hooks';
import { validator, validatorFn } from '@/utils';
import { AiOutlineLock, AiOutlineUser } from 'react-icons/ai';

type Values = LoginValues & {
  isSaved?: boolean;
};

type Props = {
  setForgotTrue: () => void;
};

const LoginForm: FC<Props> = ({ setForgotTrue }) => {
  const { message } = useApp();
  const login = useAuthStore((state) => state.login);

  const [savedData, setSavedData] = useSessionStorage<
    Partial<Values> | undefined
  >('savedData', {
    isSaved: false,
  });

  const { mutate, isLoading } = useLoginMutation();

  const handleFinish = (values: Values) => {
    const { isSaved, ...formValues } = values;
    setSavedData(
      isSaved
        ? values
        : {
            isSaved: false,
          }
    );
    mutate(formValues, {
      onSuccess: ({ token }) => {
        login(token);
      },
      onError: () => {
        void message.error('Email hoặc mật khẩu không đúng');
      },
    });
  };

  return (
    <Form
      initialValues={savedData}
      onFinish={handleFinish}
      disabled={isLoading}
    >
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
      >
        <Input.Password
          prefix={<AiOutlineLock />}
          placeholder="Mật khẩu"
          size="large"
        />
      </Form.Item>
      <Row className="items-center justify-between mb-2">
        <Form.Item name="isSaved" valuePropName="checked" className="mb-0">
          <Checkbox>
            <span className="text-black">Ghi nhớ</span>
          </Checkbox>
        </Form.Item>
        <Button type="text" onClick={setForgotTrue}>
          Quên mật khẩu
        </Button>
      </Row>

      <Button className="btn-submit" htmlType="submit" type="primary">
        <span>Đăng nhập</span>
      </Button>
    </Form>
  );
};

export default LoginForm;
