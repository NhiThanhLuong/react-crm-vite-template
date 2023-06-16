import { ListManagementWrapper } from '@/components';
import { FILTER_SCHEMA_PAGE_LIST } from '@/data/constant';
import {
  EnumPostCategoryType,
  POST_BREADCRUMBS,
  POST_NAME,
  POST_PATH,
  POST_STATUS_LIST,
  PostData,
  PostListParams,
  usePostCategoryQuery,
  usePostListQuery,
} from '@/features/post';
import { TFilterSchema } from '@/ts/types';
import {
  columnAction,
  columnCreateAt,
  columnId,
  columnStatus,
  filterCreateAtRange,
  filterId,
  filterStatus,
  formatDateToString,
  getPathImg,
} from '@/utils';
import { Image } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FC } from 'react';

const postType = EnumPostCategoryType['INTRODUCTION'];

const PostIntroductionList: FC = () => {
  const { data: categoryList } = usePostCategoryQuery(
    EnumPostCategoryType['INTRODUCTION']
  );

  const filterSchema: TFilterSchema<PostListParams>[] = [
    filterId,
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
    ...filterCreateAtRange,
    ...FILTER_SCHEMA_PAGE_LIST,
  ];

  return (
    <ListManagementWrapper
      name={POST_NAME.MAIN}
      path={POST_PATH[postType]}
      listBreadcrumbs={POST_BREADCRUMBS(postType).list}
      scrollX={1600}
      useQueryFn={usePostListQuery}
      fixedFilter={{
        postCategoryType: postType,
      }}
      {...{
        columns,
        filterSchema,
      }}
    />
  );
};

export default PostIntroductionList;

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
  columnAction(POST_PATH[postType]),
];
