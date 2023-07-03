import { BreadcrumbsWrapper, MainAction } from '@/components'
import { MESSAGE } from '@/data/constant'

import { useApp } from '@/hooks'
import { Form } from 'antd'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAddPostMutation } from '../hooks/use-post-query'
import { POST_BREADCRUMBS, POST_NAME, POST_PATH } from '../post-constant'
import { EnumPostCategoryType, EnumPostType } from '../services/enums'
import { BodyAddPost } from '../services/types'
import PostForm from './post-form/post-form'

type Props = {
  postCategoryType: EnumPostCategoryType
}
const PostAdd: FC<Props> = ({ postCategoryType }) => {
  const { message } = useApp()
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { mutate, isLoading } = useAddPostMutation()

  const backToList = () => navigate(POST_PATH[postCategoryType])

  const onFinish = (values: BodyAddPost) => {
    if (postCategoryType === EnumPostCategoryType['INTRODUCTION']) {
      values.type = EnumPostType['DEFAULT']
    }

    mutate(values, {
      onSuccess: () => {
        void message.success(
          `Một bài viết - ${POST_NAME[postCategoryType]} vừa được tạo mới`
        )
        backToList()
      },
    })
  }

  const onFinishFailed = () => {
    void message.error(MESSAGE.FAIL_SUBMIT)
  }

  return (
    <BreadcrumbsWrapper breadcrumbs={POST_BREADCRUMBS(postCategoryType).add}>
      <Form
        {...{
          form,
          onFinish,
          onFinishFailed,
        }}
        disabled={isLoading}
      >
        <PostForm categoryType={postCategoryType} />
        <div className="sticky bottom-2">
          <MainAction
            isAddType
            onOk={form.submit}
            cancelText="Quay lại trang danh sách"
            onCancel={backToList}
            isOkLoading={isLoading}
            isCancelDisabled={isLoading}
          />
        </div>
      </Form>
    </BreadcrumbsWrapper>
  )
}

export default PostAdd
