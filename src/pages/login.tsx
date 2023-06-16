import { Card, ConfigProvider, Image, Typography, theme } from 'antd';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBoolean, useReadLocalStorage } from 'usehooks-ts';

import { COLOR, DASHBOARD_PATH } from '@/data/constant';
import { ForgotPassword, LoginForm, useAuthStore } from '@/features/auth';
import styled from 'styled-components';

const Login: FC = () => {
  const navigate = useNavigate();
  const { value: isForgot, setTrue } = useBoolean(false);
  const token = useAuthStore((state) => state.token);
  const tokenLocal = useReadLocalStorage('token');

  useEffect(() => {
    if (token || tokenLocal) {
      navigate(DASHBOARD_PATH, { replace: true });
    }
  }, [navigate, token, tokenLocal]);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: COLOR.LIGHT_PRIMARY,
          colorTextPlaceholder: COLOR.LIGHT_PRIMARY,
          colorText: COLOR.LIGHT_PRIMARY,
        },
      }}
    >
      <div
        className="grid justify-end w-full h-full"
        style={{
          background: 'url(/bg-login.png) no-repeat center/cover',
        }}
      >
        <StyledCard>
          <Image
            src="/logo.svg"
            alt="Brand logo"
            preview={false}
            width="30vh"
            className="mb-8"
          />
          <Typography.Text className="slogan">
            We care your pets
          </Typography.Text>
          {isForgot ? (
            <ForgotPassword />
          ) : (
            <LoginForm setForgotTrue={setTrue} />
          )}

          <div className="mt-4 text-black">
            <p className="my-0">Version {import.meta.env.VITE_VERSION}</p>
            <span>Copyright &copy; 2023 BOSSEN</span>
          </div>
        </StyledCard>
      </div>
    </ConfigProvider>
  );
};

const StyledCard = styled(Card)`
  overflow: hidden;
  width: 40vw;
  min-width: 58vh;
  max-height: 90vh;
  text-align: center;
  margin: 4vh 2rem 2vh;
  border: 1px solid ${COLOR.LIGHT_PRIMARY};
  border-radius: 32px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;

  .slogan {
    display: block;
    margin-bottom: 2vh;

    font-family: 'Arial';
    font-style: italic;
    font-weight: 700;
    font-size: 6vh;
    line-height: 1;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  .btn-submit {
    width: 80%;
    max-height: 48px;
    height: 6vh;
    border-radius: 36px;
    span {
      font-size: 1.25rem; /* 20px */
      line-height: 1.75rem; /* 28px */
      font-weight: 700;
    }
  }

  input {
    font-weight: 700;
  }
`;

export default Login;
