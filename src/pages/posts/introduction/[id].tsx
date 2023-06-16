import { BreadcrumbsWrapper, MainAction } from '@/components';
import {
  BodyUpdatePost,
  EnumPostCategoryType,
  POST_BREADCRUMBS,
  PostInfo,
  usePostDetailQuery,
  useUpdatePostMutation,
} from '@/features/post';
import { differentObject } from '@/utils';
import { Card, Form, Tabs } from 'antd';
import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useBoolean } from 'usehooks-ts';

const PostIntroductionDetail: FC = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const { value: isChanged, setTrue, setFalse } = useBoolean(false);
  const { data, isLoading, isFetching } = usePostDetailQuery(+id!);
  const { mutate, isLoading: isUpdating } = useUpdatePostMutation(+id!);

  const initialValues = useMemo(
    () =>
      data && {
        ...data,
        images: {
          avatar: data.images.avatar && data.images.avatar[128].id,
        },
      },
    [data]
  );

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  const items = [
    {
      key: '1',
      label: 'Thông tin bài viết',
      children: (
        <PostInfo
          data={data}
          categoryType={EnumPostCategoryType['INTRODUCTION']}
        />
      ),
    },
    // {
    //   key: '2',
    //   label: 'Nội dung bài viết'
    //   children: <KpiRankHistory />,
    // },
  ];

  const handleReset = () => {
    form.resetFields();
    setFalse();
  };

  const onFinish = (values: BodyUpdatePost) => {
    const dataChanged = differentObject(values, initialValues);

    mutate(dataChanged, {
      onSuccess: () => {
        setFalse();
      },
    });
  };

  return (
    <BreadcrumbsWrapper
      breadcrumbs={
        POST_BREADCRUMBS(EnumPostCategoryType['INTRODUCTION']).detail
      }
      isLoading={isFetching || isUpdating}
    >
      <Form
        {...{
          form,
          initialValues,
          onFinish,
        }}
        onValuesChange={setTrue}
      >
        <Card title="Thông tin bài viết" loading={isLoading}>
          <Tabs defaultActiveKey="1" items={items} />
        </Card>
        <div className="sticky bottom-0">
          <MainAction
            onOk={form.submit}
            onCancel={handleReset}
            cancelText="Hủy bỏ thay đổi"
            isCancelDisabled={!isChanged || isUpdating}
            isOkLoading={isUpdating}
            isOkDisabled={!isChanged}
          />
        </div>
      </Form>
    </BreadcrumbsWrapper>
  );
};

export default PostIntroductionDetail;
