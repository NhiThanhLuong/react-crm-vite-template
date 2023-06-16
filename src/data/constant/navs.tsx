import { cloneDeep } from 'lodash';
import { lazy } from 'react';
import { AiOutlineDashboard, AiOutlineUser } from 'react-icons/ai';

import { EnumPostCategoryType, POST_NAME, POST_PATH } from '@/features/post';
import { USER_NAME } from '@/features/user';
import PrivateRoute from '@/routes/private-route';
import { capitalizeFirstLetter } from '@/utils';
import { Link } from 'react-router-dom';
import { DASHBOARD_PATH, USER_PATH } from './path';
import { TypeNavs, TypeRoutes } from './type-navs';
import { BsPostcard } from 'react-icons/bs';

const Dashboard = lazy(() => import('@/pages/dashboard'));

const Users = lazy(() => import('@/pages/users'));
const UserDetail = lazy(() => import('@/pages/users/[id]'));
const UserAdd = lazy(() => import('@/pages/users/add'));

const PostIntroductionList = lazy(() => import('@/pages/posts/introduction'));
const PostIntroductionDetail = lazy(
  () => import('@/pages/posts/introduction/[id]')
);

const PostLibraryList = lazy(() => import('@/pages/posts/library'));

const navs: TypeNavs[] = [
  {
    key: DASHBOARD_PATH,
    label: 'dashboard',
    icon: <AiOutlineDashboard size={18} />,
    element: <Dashboard />,
  },
  {
    key: USER_PATH,
    label: `quản lý ${USER_NAME}`,
    icon: <AiOutlineUser size={18} />,
    element: <Users />,
    children: [
      {
        key: '/:id',
        element: <UserDetail />,
      },
      {
        key: '/add',
        element: <UserAdd />,
      },
    ],
  },
  {
    key: POST_PATH.MAIN,
    label: POST_NAME.MAIN,
    icon: <BsPostcard size={18} />,
    children: [
      {
        key: '/introductions',
        label: POST_NAME[EnumPostCategoryType['INTRODUCTION']],
        element: <PostIntroductionList />,
        children: [
          {
            key: '/:id',
            element: <PostIntroductionDetail />,
          },
        ],
      },

      {
        key: '/libraries',
        label: POST_NAME[EnumPostCategoryType['LIBRARY']],
        element: <PostLibraryList />,
      },
    ],
  },
];

const getRoutes = (arr: TypeRoutes[], nav: TypeNavs, basePath = '') => {
  if (nav.children) {
    for (const n of nav.children) {
      getRoutes(arr, n, basePath + nav.key);
    }
  }
  if (!nav.element) return;

  arr.push({
    path: basePath + nav.key,
    element: nav.element && <PrivateRoute>{nav.element}</PrivateRoute>,
  });
  return arr;
};

const addLink = (nav: TypeNavs, path: string) => {
  return nav.children ? (
    capitalizeFirstLetter(nav.label as string)
  ) : (
    <Link to={path}>{capitalizeFirstLetter(nav.label as string)}</Link>
  );
};

const getShowNavigation = (
  nav: TypeNavs,
  basePath = ''
): TypeNavs | undefined => {
  if (!nav.label) return;
  if (nav.children) {
    const arr: TypeNavs[] = [];
    for (const n of nav.children) {
      const formatN = getShowNavigation(n, basePath + nav.key);
      if (formatN) arr.push(formatN);
    }

    nav.children = arr.length > 0 ? arr : undefined;
  }

  return {
    key: basePath + nav.key,
    icon: nav.icon,
    title: addLink(nav, basePath + nav.key),
    label: addLink(nav, basePath + nav.key),
    children: nav.children,
    element: nav.element,
  };
};

const menuList: TypeNavs[] = [];
const routeList: TypeRoutes[] = [];

for (const nav of navs) {
  const nav1 = cloneDeep(nav);
  const n = getShowNavigation(nav1);
  n && menuList.push(n);

  const nav2 = cloneDeep(nav);
  getRoutes(routeList, nav2);
}

export { menuList, routeList };
