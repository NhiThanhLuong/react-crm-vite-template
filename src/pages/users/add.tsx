import { BreadcrumbsWrapper, MainAction } from '@/components'
import { DEFAULT_PASSWORD, USER_PATH } from '@/data/constant'
import {
  BodyUpdateUser,
  USER_BREADCRUMBS,
  USER_NAME,
  UserForm,
  useAddUserMutation,
} from '@/features/user'
import { Button, Card, Form } from 'antd'
import { FC, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const UserAdd: FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { mutate, isLoading } = useAddUserMutation()

  const handleFinish = (values: BodyUpdateUser) => {
    mutate(values)
  }

  const setDefaultPassword = useCallback(() => {
    form.setFieldValue('password', DEFAULT_PASSWORD)
  }, [form])

  return (
    <BreadcrumbsWrapper breadcrumbs={USER_BREADCRUMBS.add()}>
      <Card title={`Tạo mới ${USER_NAME}`}>
        <Form form={form} onFinish={handleFinish} disabled={isLoading}>
          <UserForm />
        </Form>
        <div className="mt-4">
          <Button onClick={setDefaultPassword}>
            Đặt mật khẩu mặc định là:{'  '}
            <strong className="text-base">{DEFAULT_PASSWORD}</strong>
          </Button>
        </div>
        <MainAction
          isAddType
          cancelText="Trở về danh sách"
          onOk={form.submit}
          onCancel={() => navigate(USER_PATH)}
          isOkLoading={isLoading}
          isCancelDisabled={isLoading}
        />
      </Card>
    </BreadcrumbsWrapper>
  )
}

export default UserAdd
