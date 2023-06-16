import { Avatar, Dropdown, Space, Typography } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { MenuClickEventHandler } from 'rc-menu/lib/interface';
import { AiOutlineDown, AiOutlineLogout, AiOutlineUser } from 'react-icons/ai';

import { USER_PATH } from '@/data/constant';
import { useLogoutMutation } from '@/features/auth';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInfoQuery } from '@/features/user';

const items: ItemType[] = [
  {
    key: '1',
    icon: <AiOutlineUser />,
    label: 'Tài khoản',
  },
  {
    type: 'divider',
  },
  {
    key: '2',
    danger: true,
    icon: <AiOutlineLogout />,
    label: 'Đăng xuất',
  },
];

const UserInfo = () => {
  const navigate = useNavigate();
  const { data: user } = useInfoQuery();
  const { mutate } = useLogoutMutation();

  const handleClick: MenuClickEventHandler = useCallback(
    ({ key }) => {
      if (key === '2') {
        mutate();
      } else if (key === '1') {
        navigate(`${USER_PATH}/${user?.id ?? ''}`);
      }
    },
    [mutate, navigate, user]
  );

  return (
    <Dropdown
      menu={{ items, onClick: handleClick }}
      trigger={['click']}
      placement="bottomRight"
      arrow
    >
      <Space className="cursor-pointer">
        <Avatar size="small" icon={<AiOutlineUser />} />
        <Typography.Text>{user?.name}</Typography.Text>
        <AiOutlineDown />
      </Space>
    </Dropdown>
  );
};

export default UserInfo;
