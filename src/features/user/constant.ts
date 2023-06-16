import { COLOR, USER_PATH } from '@/data/constant';

export const USER_NAME = 'người dùng';
export const USER_BREADCRUMBS = {
  list: [
    {
      title: `Danh sách ${USER_NAME}`,
    },
  ],
  listPath: {
    title: `Danh sách ${USER_NAME}`,
    url: USER_PATH,
  },
  detail: () => [
    USER_BREADCRUMBS.listPath,
    {
      title: `Chi tiết ${USER_NAME}`,
    },
  ],
  add: () => [
    USER_BREADCRUMBS.listPath,
    {
      title: `Thêm ${USER_NAME}`,
    },
  ],
};

export const USER_STATUS = {
  PAUSED: {
    value: -2,
    label: 'Tạm ngưng',
    color: COLOR.LOGIN_BG,
  },
  ACTIVE: {
    value: 1,
    label: 'Đang hoạt động',
    color: COLOR.ACTIVE,
  },
  LOCKED: {
    value: -3,
    label: 'Đã khóa',
    color: COLOR.LOCKED,
  },
  INACTIVE: {
    value: -1,
    label: 'Dừng hoạt động',
    color: COLOR.DISABLED,
  },
};
export const USER_STATUS_LIST = Object.values(USER_STATUS);

export const USER_ROLE = {
  ADMIN: {
    value: 1,
    label: 'Admin',
  },
};
export const USER_ROLE_LIST = Object.values(USER_ROLE);
