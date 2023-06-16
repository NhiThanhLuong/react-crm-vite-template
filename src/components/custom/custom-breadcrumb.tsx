import { Breadcrumb } from 'antd';
import { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { DASHBOARD_PATH } from '@/data/constant';
import { BreadcrumbsType } from '@/ts/types';
import { NewBreadcrumbProps } from 'antd/es/breadcrumb/Breadcrumb';

const itemRender = (
  route: BreadcrumbsType,
  _: unknown,
  routes: BreadcrumbsType[]
) => {
  const isLast = routes.indexOf(route) === routes.length - 1;
  return isLast ? (
    <span>{route.title}</span>
  ) : (
    <Link to={route.url ?? ''}>{route.title}</Link>
  );
};

type Props = {
  routes?: BreadcrumbsType[];
};

const CustomBreadcrumb: FC<Props> = ({ routes = [] }) => {
  const currentRoutes = useMemo(
    () => [{ url: DASHBOARD_PATH, title: 'Trang chủ' }, ...routes],
    [routes]
  );

  return (
    <Breadcrumb
      style={{ marginBottom: currentRoutes.length > 0 ? 10 : 0 }}
      items={currentRoutes}
      itemRender={itemRender as NewBreadcrumbProps['itemRender']}
    />
  );
};

export default CustomBreadcrumb;
