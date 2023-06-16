import { Button, Image, Layout, Space, Tooltip, Typography } from 'antd';
import { BsSun } from 'react-icons/bs';
import { FaRegMoon } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { COLOR, DASHBOARD_PATH } from '@/data/constant';
import { useThemeStore } from '@/hooks';
import UserInfo from './user-info';

const { Header } = Layout;

const HeaderComponent = () => {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  const onChangeTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    localStorage.setItem('theme', newTheme);
    setTheme({
      theme: newTheme,
    });
  };

  return (
    <Header className="bg-inherit">
      <div
        className="fixed h-16 inset-x-0 z-30 flex justify-between items-center px-4"
        style={{
          backgroundColor:
            theme === 'dark' ? COLOR.DARK_PRIMARY : COLOR.LIGHT_PRIMARY,
        }}
      >
        <Link to={DASHBOARD_PATH} className="flex items-center">
          <Space>
            <Image
              className="mr-8"
              width={68}
              preview={false}
              src="/logo.svg"
              alt="Brand logo"
            />
            <Typography className="text-lg font-bold">ADMIN PANEL</Typography>
          </Space>
        </Link>
        <Space>
          <Tooltip
            title={`Chuyển sang chế độ ban ${
              theme === 'dark' ? 'ngày' : 'đêm'
            }`}
            className="table"
          >
            <Button
              onClick={onChangeTheme}
              type="ghost"
              icon={
                theme === 'dark' ? <BsSun size={20} /> : <FaRegMoon size={20} />
              }
            />
          </Tooltip>
          <UserInfo />
        </Space>
      </div>
    </Header>
  );
};

export default HeaderComponent;
