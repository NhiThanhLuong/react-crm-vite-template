import { FormCKEditor } from '@/components'
import { validator } from '@/utils'
import { Card, Tabs } from 'antd'
import { FC, ReactNode, useMemo } from 'react'
import { EnumPostCategoryType } from '../../services/enums'
import { PostData } from '../../services/types'
import PostInfo from './post-info'

type Props = {
  isLoading?: boolean
  data?: PostData
  categoryType: EnumPostCategoryType
  extra?: ReactNode
  isDisabledForm?: boolean
}

const PostInfoCard: FC<Props> = ({
  data,
  isLoading,
  categoryType,
  extra,
  isDisabledForm,
}) => {
  const items = useMemo(
    () => [
      {
        key: '1',
        label: 'Thông tin bài viết',
        children: <PostInfo {...{ data, categoryType }} />,
      },
      {
        key: '2',
        label: 'Nội dung bài viết',
        children: (
          <FormCKEditor
            name="content"
            rules={validator('required')}
            data={data?.content}
            isDisabled={isDisabledForm}
          />
        ),
      },
    ],
    [categoryType, data, isDisabledForm]
  )

  return (
    <Card title="Thông tin bài viết" loading={isLoading} extra={extra}>
      <Tabs defaultActiveKey="1" items={items} />
    </Card>
  )
}

export default PostInfoCard
