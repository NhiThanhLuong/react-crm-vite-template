import { BreadcrumbsWrapper, MainAction } from '@/components'
import { MESSAGE } from '@/data/constant'
import { useApp } from '@/hooks'
import { differentObject } from '@/utils'
import { Form, Typography } from 'antd'
import { FC, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useBoolean } from 'usehooks-ts'
import {
  usePostDetailQuery,
  useUpdatePostMutation,
} from '../hooks/use-post-query'
import { POST_BREADCRUMBS } from '../post-constant'
import {
  EnumPostCategoryType,
  EnumPostStatus,
  EnumPostType,
} from '../services/enums'
import { BodyUpdatePost } from '../services/types'
import PostForm from './post-form/post-form'
import PostFlowStatus from './post-info-form/post-flow-status'

type Props = {
  postCategoryType: EnumPostCategoryType
}

const PostDetail: FC<Props> = ({ postCategoryType }) => {
  const { message, modal } = useApp()
  const { id } = useParams()
  const [form] = Form.useForm()
  const { value: isChanged, setTrue, setFalse } = useBoolean(false)
  const { data, isLoading, isFetching } = usePostDetailQuery(+id!)
  const { mutate, isLoading: isUpdating } = useUpdatePostMutation(+id!)

  const isDisabledForm = useMemo(
    () =>
      isUpdating ||
      isLoading ||
      [EnumPostStatus['CANCEL'], EnumPostStatus['ACTIVE']].includes(
        data!.status
      ),
    [data, isLoading, isUpdating]
  )

  const initialValues = useMemo(
    () =>
      data && {
        ...data,
        images: {
          avatar: data.images.avatar && data.images.avatar.original.id,
        },
        animalIds: data.relatedAnimal.map((item) => item.animal.id),
        postIds: data.relatedPost.map((item) => item.postRelated),
      },
    [data]
  )

  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [form, initialValues])

  const handleReset = () => {
    form.resetFields()
    setFalse()
  }

  const onFinish = (
    //Remove type images: ImageData[] and get number[] images
    // from values after submitting form
    values: Omit<NonNullable<typeof initialValues>, 'images'> &
      BodyUpdatePost['images']
  ) => {
    const dataChanged = differentObject(values, initialValues)
    if (postCategoryType === EnumPostCategoryType['INTRODUCTION']) {
      dataChanged.type = EnumPostType['DEFAULT']
    }

    mutate(
      {
        ...dataChanged,
        postIds: dataChanged.postIds && values.postIds.map(({ id }) => id),
      },
      {
        onSuccess: setFalse,
      }
    )
  }

  const onFinishFailed = () => {
    void message.error(MESSAGE.FAIL_SUBMIT)
  }

  const handleNextStatus = (
    nextStatus: number,
    label: string,
    color: string
  ) => {
    if (isChanged) {
      void message.warning(
        'Vui lòng Hủy bỏ hoặc Cập nhật thay đổi của biểu mẫu!'
      )
      return
    }

    modal.confirm({
      title: 'Xác nhận thay đổi trạng thái',
      width: 500,
      content: (
        <Typography.Text>
          Bạn có chắc chắn muốn thay đổi trạng thái sang{' '}
          <Typography.Text
            italic
            style={{
              color,
            }}
            className="text-lg"
          >
            {label}
          </Typography.Text>
        </Typography.Text>
      ),
      cancelText: 'Hủy bỏ',
      okText: 'Đồng ý',
      onOk: () => {
        mutate({
          status: nextStatus,
        })
      },
    })
  }

  return (
    <BreadcrumbsWrapper
      breadcrumbs={POST_BREADCRUMBS(postCategoryType).detail}
      isLoading={isFetching || isUpdating}
    >
      <Form
        {...{
          form,
          initialValues,
          onFinish,
          onFinishFailed,
        }}
        onValuesChange={setTrue}
        disabled={isDisabledForm}
      >
        <PostForm
          {...{
            isLoading,
            data,
            isDisabledForm,
          }}
          categoryType={postCategoryType}
          extra={
            !isLoading && (
              <PostFlowStatus
                onNextStatus={handleNextStatus}
                status={data!.status}
              />
            )
          }
        />
        {isChanged && (
          <div className="sticky bottom-2">
            <MainAction
              onOk={form.submit}
              onCancel={handleReset}
              cancelText="Hủy bỏ thay đổi"
              isCancelDisabled={!isChanged || isUpdating}
              isOkLoading={isUpdating}
              isOkDisabled={!isChanged}
            />
          </div>
        )}
      </Form>
    </BreadcrumbsWrapper>
  )
}

export default PostDetail
