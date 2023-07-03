import { FILTER_SCHEMA_PAGE_LIST } from '@/data/constant'
import { useFilter } from '@/hooks'
import { TFilterSchema } from '@/ts/types'
import {
  FILTER_CREATE_AT_RANGE,
  FILTER_ID,
  columnCreateAt,
  columnId,
  columnStatus,
  filterStatus,
  formatDateToString,
  getPathImg,
} from '@/utils'
import { Image } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { FC } from 'react'
import { usePostListQuery } from '../../hooks/use-post-query'
import { POST_NAME, POST_STATUS_LIST } from '../../post-constant'
import { EnumPostRelatedModal } from '../../services/enums'
import { PostData, PostListParams, RelatedPostData } from '../../services/types'
import PickRelated from './pick-related'

type Props = {
  value: RelatedPostData[]
  setValue: (value: RelatedPostData[]) => void
}

const PickRelatedPost: FC<Props> = ({ setValue, value }) => {
  const {
    filter,
    apiFilter,
    schemaList,
    onPageChange,
    onFilterChange,
    onResetFilter,
  } = useFilter(filterSchema)

  const { data, isLoading, isFetching } = usePostListQuery(apiFilter)

  return (
    <PickRelated
      openType={EnumPostRelatedModal['POST']}
      name={POST_NAME.MAIN}
      dataSource={data?.data}
      total={data?.total}
      scrollX={2000}
      {...{
        columns,
        value,
        setValue,
        onResetFilter,
        onFilterChange,
        schemaList,
        filter,
        onPageChange,
        isFetching,
        isLoading,
        setRowRecords,
      }}
    />
  )
}

export default PickRelatedPost

const filterSchema: TFilterSchema<PostListParams>[] = [
  FILTER_ID,
  {
    name: 'title',
    type: 'string',
    element: 'input',
    placeholder: 'Tiêu đề',
  },
  filterStatus(POST_STATUS_LIST),
  ...FILTER_CREATE_AT_RANGE,
  ...FILTER_SCHEMA_PAGE_LIST,
]

const columns: ColumnsType<PostData> = [
  columnId(),
  {
    title: 'Hình ảnh',
    width: 160,
    dataIndex: 'images',
    align: 'center',
    render: (value: PostData['images']) =>
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
    title: 'Danh mục',
    dataIndex: ['postCategory', 'name'],
  },
  columnStatus(POST_STATUS_LIST),
  columnCreateAt(),
  {
    title: 'Người tạo',
    dataIndex: ['creatorInfo', 'name'],
  },
  {
    title: 'Thời điểm cập nhật cuối',
    dataIndex: 'updatedAt',
    align: 'center',
    render: (value?: string) =>
      formatDateToString(value, 'DD/MM/YYYY HH:mm:ss'),
  },
]

// Get some fields to display from general record
const setRowRecords = ({
  id,
  images,
  shortTitle,
  shortContent,
  status,
}: PostData) => ({
  id,
  images,
  shortTitle,
  shortContent,
  status,
})
