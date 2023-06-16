import { BreadcrumbsWrapper, MainAction } from '@/components';
import {
  BodyUpdateUser,
  ChangePassword,
  USER_BREADCRUMBS,
  USER_NAME,
  UserForm,
  UserPasswordDropdown,
  useInfoQuery,
  useUpdateUserMutation,
  useUserDetailQuery,
} from '@/features/user';
import { differentObject } from '@/utils';
import { Card, Form } from 'antd';
import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useBoolean } from 'usehooks-ts';

const UserDetail: FC = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const { value: isChanged, setTrue, setFalse } = useBoolean(false);
  const { data, isLoading } = useUserDetailQuery(+id!);
  const { mutate, isLoading: isUpdating } = useUpdateUserMutation(+id!);

  const { data: myUser } = useInfoQuery();
  const isMe = myUser?.id === +id!;

  const initialValues = useMemo(
    () =>
      data && {
        ...data,
        images: {
          avatar: data.images.avatar && data.images.avatar[360].id,
        },
      },
    [data]
  );

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  const handleReset = () => {
    form.resetFields();
    setFalse();
  };

  const handleFinish = (values: BodyUpdateUser) => {
    const dataChanged = differentObject(values, initialValues);

    mutate(dataChanged, {
      onSuccess: () => {
        setFalse();
      },
    });
  };

  return (
    <BreadcrumbsWrapper
      breadcrumbs={USER_BREADCRUMBS.detail()}
      isLoading={isUpdating}
    >
      <Card
        title={`Chi tiết ${USER_NAME}`}
        loading={isLoading}
        extra={
          <UserPasswordDropdown isMe={isMe}>
            <ChangePassword mutate={mutate} isLoading={isUpdating} />
          </UserPasswordDropdown>
        }
      >
        <Form
          form={form}
          onFinish={handleFinish}
          onValuesChange={setTrue}
          initialValues={initialValues}
        >
          <UserForm data={data} />
        </Form>
        <MainAction
          onOk={form.submit}
          onCancel={handleReset}
          isCancelDisabled={!isChanged}
          isOkLoading={isUpdating}
          isOkDisabled={!isChanged}
        />
      </Card>
    </BreadcrumbsWrapper>
  );
};

export default UserDetail;
