import { ListManagementWrapper } from '@/components'
import { FILTER_SCHEMA_PAGE_LIST } from '@/data/constant'
import { AnimalListQuery, useAnimalListQuery } from '@/features/animal'
import { EnumStatus } from '@/ts/enums'
import { TFilterSchema } from '@/ts/types'
import {
  FILTER_CREATE_AT_RANGE,
  FILTER_ID,
  columnAction,
  columnCreateAt,
  columnId,
  columnStatus,
  filterStatus,
  formatDateToString,
  getPathImg,
} from '@/utils'
import { Image, List } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { FC, useCallback, useMemo } from 'react'
import { usePostCategoryQuery } from '../hooks/use-post-category-query'
import { usePostListQuery } from '../hooks/use-post-query'
import {
  POST_BREADCRUMBS,
  POST_NAME,
  POST_PATH,
  POST_STATUS_LIST,
} from '../post-constant'
import { EnumPostCategoryType } from '../services/enums'
import { PostData, PostListParams } from '../services/types'

type Props = {
  postCategoryType: EnumPostCategoryType
}

const PostList: FC<Props> = ({ postCategoryType }) => {
  const { data: categoryList } = usePostCategoryQuery(postCategoryType)

  const { data: animalList } = useAnimalListQuery(
    {
      status: EnumStatus['ACTIVE'],
    },
    {
      select: useCallback(
        (data: AnimalListQuery) =>
          data.data.map((item) => ({
            value: item.id,
            label: item.name,
          })),
        []
      ),
      enabled: postCategoryType === EnumPostCategoryType['LIBRARY'],
    }
  )

  const filterSchema = useMemo(() => {
    const result: TFilterSchema<PostListParams>[] = [
      FILTER_ID,
      {
        name: 'title',
        type: 'string',
        element: 'input',
        placeholder: 'Tiêu đề',
      },
      {
        name: 'postCategoryId',
        type: 'number',
        element: 'select',
        placeholder: 'Danh mục',
        fieldProps: {
          options: categoryList,
        },
      },
      filterStatus(POST_STATUS_LIST),
      ...FILTER_CREATE_AT_RANGE,
      ...FILTER_SCHEMA_PAGE_LIST,
    ]

    if (postCategoryType === EnumPostCategoryType['LIBRARY']) {
      result.splice(3, 0, {
        name: 'animalId',
        type: 'number',
        element: 'select',
        placeholder: 'Đối tượng',
        fieldProps: {
          options: animalList,
        },
      })
    }

    return result
  }, [animalList, categoryList, postCategoryType])

  const columns = useMemo(() => {
    const result: ColumnsType<PostData> = [
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
        title: 'Tiêu đề',
        dataIndex: 'title',
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
      columnAction(POST_PATH[postCategoryType]),
    ]

    if (postCategoryType === EnumPostCategoryType['LIBRARY']) {
      result.splice(3, 0, {
        title: 'Đối tượng',
        dataIndex: 'relatedAnimal',
        render: (values: PostData['relatedAnimal']) =>
          values.length > 0 ? (
            <List
              dataSource={values}
              renderItem={(item) => (
                <List.Item className="!py-1" key={item.id}>
                  - {item.animal.name}
                </List.Item>
              )}
            />
          ) : (
            'Chưa có đối tượng'
          ),
      })
    }

    return result
  }, [postCategoryType])

  return (
    <ListManagementWrapper
      name={POST_NAME.MAIN}
      path={POST_PATH[postCategoryType]}
      listBreadcrumbs={POST_BREADCRUMBS(postCategoryType).list}
      scrollX={1600}
      useQueryFn={usePostListQuery}
      fixedFilter={{
        postCategoryType: postCategoryType,
      }}
      {...{
        columns,
        filterSchema,
      }}
    />
  )
}

export default PostList
