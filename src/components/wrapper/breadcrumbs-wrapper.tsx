import { BreadcrumbsType } from '@/ts/types';
import { Spin } from 'antd';
import { FC, ReactNode } from 'react';
import CustomBreadcrumb from '../custom/custom-breadcrumb';

type Props = {
  isLoading?: boolean;
  breadcrumbs?: BreadcrumbsType[];
  children: ReactNode;
};

const BreadcrumbsWrapper: FC<Props> = ({
  isLoading = false,
  breadcrumbs,
  children,
}) => {
  return (
    <>
      <CustomBreadcrumb routes={breadcrumbs} />
      <Spin spinning={isLoading}>{children}</Spin>
    </>
  );
};

export default BreadcrumbsWrapper;
