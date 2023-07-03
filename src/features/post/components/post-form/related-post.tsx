import { CommonButton, CustomTable } from '@/components'
import { columnId, getPathImg } from '@/utils'
import { Card, Image } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { FC, useCallback, useMemo } from 'react'
import { POST_NAME } from '../../post-constant'
import { RelatedPostData } from '../../services/types'
import usePostStore from '../../hooks/use-post-store'
import { EnumPostRelatedModal } from '../../services/enums'
import PickRelatedPost from './pick-related-post'

type Props = {
  value?: RelatedPostData[]
  onChange?: (value: RelatedPostData[]) => void
}

const RelatedPost: FC<Props> = (props) => {
  const setModal = usePostStore((state) => state.setModal)

  const handleDelete = useCallback(
    (id: number) => {
      const newValue = props.value!.filter((item) => item.id !== id)
      props.onChange!(newValue)
    },
    [props.onChange, props.value]
  )

  const columns: ColumnsType<RelatedPostData> = useMemo(
    () => [
      columnId(),
      {
        title: 'Hình ảnh',
        width: 160,
        dataIndex: 'images',
        align: 'center',
        render: (value: RelatedPostData['images']) =>
          value.avatar?.original && (
            <Image
              alt="Hình ảnh bài viết"
              src={getPathImg(value.avatar[128].id)}
              width={120}
            />
          ),
      },
      {
        title: 'Tiêu đề ngắn',
        dataIndex: 'shortTitle',
      },
      {
        title: 'Nội dung ngắn',
        dataIndex: 'shortContent',
      },
      {
        title: 'Thao tác',
        width: 100,
        align: 'center',
        fixed: 'right',
        render: (_, { id }) => {
          return (
            <CommonButton action="delete" onClick={() => handleDelete(id)} />
          )
        },
      },
    ],
    [handleDelete]
  )

  const setValue = useCallback(
    (value: RelatedPostData[]) => {
      props.onChange!(props.value!.concat(value))
    },
    [props.onChange, props.value]
  )

  return (
    <Card
      title={`Danh sách ${POST_NAME.MAIN} liên quan`}
      extra={
        <CommonButton
          action="add"
          onClick={() => setModal(EnumPostRelatedModal['POST'])}
          className="flex items-center"
        >
          Thêm {POST_NAME.MAIN} liên quan
        </CommonButton>
      }
    >
      <CustomTable
        name={POST_NAME.MAIN}
        columns={columns}
        dataSource={props.value}
        pagination={{
          pageSize: 5,
        }}
      />
      <PickRelatedPost value={props.value!} setValue={setValue} />
    </Card>
  )
}

export default RelatedPost
