import { BreadcrumbsWrapper } from '@/components';
import { isItemInList } from '@/utils';
import { Typography } from 'antd';

const Dashboard = () => {
  // const changeLanguage = (lng: string) => {
  //   void i18n.changeLanguage(lng);
  // };

  const a = [{ name: 2 }, 2, 3, 4];

  return (
    <BreadcrumbsWrapper
      breadcrumbs={[
        {
          title: 'Dashboard',
        },
      ]}
    >
      {/* <Button onClick={() => changeLanguage('vi')}></Button> */}
      <Typography>Chưa đủ dữ liệu cho các bảng thống kê</Typography>
    </BreadcrumbsWrapper>
  );
};

export default Dashboard;
