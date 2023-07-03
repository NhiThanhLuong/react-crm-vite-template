import { BreadcrumbsWrapper } from '@/components'
import { Typography } from 'antd'

const Dashboard = () => {
  return (
    <BreadcrumbsWrapper
      breadcrumbs={[
        {
          title: 'Dashboard',
        },
      ]}
    >
      <Typography>Chưa đủ dữ liệu cho các bảng thống kê</Typography>
    </BreadcrumbsWrapper>
  )
}

export default Dashboard
