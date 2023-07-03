import { Form, Space } from 'antd'
import { FC, ReactNode } from 'react'
import PostInfoCard from '../post-info-form/post-info-card'
import { PostData } from '../../services/types'
import { EnumPostCategoryType } from '../../services/enums'
import RelatedPost from './related-post'

type Props = {
  isLoading?: boolean
  data?: PostData
  categoryType: EnumPostCategoryType
  extra?: ReactNode
  isDisabledForm?: boolean
}

const PostForm: FC<Props> = ({
  categoryType,
  data,
  extra,
  isDisabledForm,
  isLoading,
}) => {
  return (
    <Space direction="vertical" size="middle" className="w-full">
      <PostInfoCard
        {...{
          isLoading,
          data,
          isDisabledForm,
          extra,
          categoryType,
        }}
      />

      <Form.Item name="postIds" noStyle>
        <RelatedPost />
      </Form.Item>
    </Space>
  )
}

export default PostForm
