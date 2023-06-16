import { FC } from 'react';
import { PostData } from '../services/types';
import { DescriptionsRecord, NumberEnumUnion } from '@/ts/types';
import { Form, Input, Select, Typography } from 'antd';
import { formatDateToString } from '@/utils';
import { CustomDescriptions, StatusTagTwo, UploadImage } from '@/components';
import { POST_STATUS } from '../post-constant';
import { EnumPostCategoryType } from '../services/enums';
import { usePostCategoryQuery } from '../hooks/use-post-category-query';

const { Text } = Typography;

type Props = {
  data?: PostData;
  categoryType: NumberEnumUnion<typeof EnumPostCategoryType>;
};

const PostInfo: FC<Props> = ({ data, categoryType }) => {
  const { data: categoryList } = usePostCategoryQuery(categoryType);

  const descriptionData: DescriptionsRecord[] = [
    {
      isRequired: true,
      labelText: 'Hình ảnh',
      descriptionElement: (
        <Form.Item name={['images', 'avatar']} className="m-auto text-center">
          <UploadImage />
        </Form.Item>
      ),
    },
    {
      labelText: 'Alt',
      descriptionElement: (
        <Form.Item name="alt" className="mb-0">
          <Input placeholder="Nhập tiêu đề" />
        </Form.Item>
      ),
    },
    {
      isRequired: true,
      labelText: 'Tiêu đề',
      descriptionElement: (
        <Form.Item name="title" className="mb-0">
          <Input placeholder="Nhập tiêu đề" />
        </Form.Item>
      ),
    },
    {
      isRequired: true,
      labelText: 'Tiêu đề ngắn',
      descriptionElement: (
        <Form.Item name="shortTitle" className="mb-0">
          <Input placeholder="Nhập tiêu đề ngắn" />
        </Form.Item>
      ),
    },
    {
      isRequired: true,
      labelText: 'Nội dung ngắn',
      descriptionElement: (
        <Form.Item name="shortContent" className="mb-0">
          <Input placeholder="Nhập nội dung ngắn" />
        </Form.Item>
      ),
    },
    {
      isRequired: true,
      labelText: 'Danh mục',
      descriptionElement: (
        <Form.Item name="postCategoryId" className="mb-0">
          <Select placeholder="Chọn danh mục bài viết" options={categoryList} />
        </Form.Item>
      ),
    },
    {
      labelText: 'Từ khóa SEO',
      descriptionElement: (
        <Form.Item name="keyWords" className="mb-0">
          <Select mode="tags" placeholder="Nhập từ khóa SEO" />
        </Form.Item>
      ),
    },
    {
      isShow: !!data,
      labelText: 'Trạng thái',
      descriptionElement: data?.status && (
        <StatusTagTwo statusObj={POST_STATUS[data.status]} />
      ),
    },
    {
      isShow: !!data,
      labelText: 'Thời điểm tạo',
      descriptionElement: <Text>{formatDateToString(data?.createdAt)}</Text>,
    },
  ];
  return (
    <CustomDescriptions labelStyle={{ width: 200 }} data={descriptionData} />
  );
};

export default PostInfo;
