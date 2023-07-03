import { CustomDescriptions, StatusTagTwo, UploadImage } from '@/components'
import { AnimalListQuery, useAnimalListQuery } from '@/features/animal'
import { EnumStatus } from '@/ts/enums'
import { DescriptionsRecord } from '@/ts/types'
import { formatDateToString, validator, youtube_parser } from '@/utils'
import { Form, Input, Select, Switch, Typography } from 'antd'
import { FC, useCallback } from 'react'
import { usePostCategoryQuery } from '../../hooks/use-post-category-query'
import { POST_STATUS } from '../../post-constant'
import { EnumPostCategoryType, EnumPostType } from '../../services/enums'
import { PostData } from '../../services/types'

const { Text } = Typography

type Props = {
  data?: PostData
  categoryType: EnumPostCategoryType
}

const PostInfo: FC<Props> = ({ data, categoryType }) => {
  const { data: categoryList } = usePostCategoryQuery(categoryType)

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
      enabled: categoryType === EnumPostCategoryType['LIBRARY'],
    }
  )

  const descriptionData: DescriptionsRecord[] = [
    {
      isRequired: true,
      labelText: 'Hình ảnh',
      descriptionElement: (
        <Form.Item
          name={['images', 'avatar']}
          rules={validator('required')}
          className="m-auto text-center"
        >
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
        <Form.Item name="title" className="mb-0" rules={validator('required')}>
          <Input placeholder="Nhập tiêu đề" />
        </Form.Item>
      ),
    },
    {
      isRequired: true,
      labelText: 'Tiêu đề ngắn',
      descriptionElement: (
        <Form.Item
          name="shortTitle"
          className="mb-0"
          rules={validator('required')}
        >
          <Input placeholder="Nhập tiêu đề ngắn" />
        </Form.Item>
      ),
    },
    {
      isRequired: true,
      labelText: 'Nội dung ngắn',
      descriptionElement: (
        <Form.Item
          name="shortContent"
          className="mb-0"
          rules={validator('required')}
        >
          <Input placeholder="Nhập nội dung ngắn" />
        </Form.Item>
      ),
    },
    {
      isRequired: true,
      labelText: 'Danh mục',
      descriptionElement: (
        <Form.Item
          name="postCategoryId"
          className="mb-0"
          rules={validator('required')}
        >
          <Select placeholder="Chọn danh mục bài viết" options={categoryList} />
        </Form.Item>
      ),
    },
    {
      isShow: categoryType === EnumPostCategoryType['LIBRARY'],
      isRequired: true,
      labelText: 'Đối tượng',
      descriptionElement: (
        <Form.Item name="animalIds" className="mb-0">
          <Select
            mode="multiple"
            placeholder="Chọn các đối tượng"
            options={animalList}
          />
        </Form.Item>
      ),
    },
    {
      isShow: categoryType === EnumPostCategoryType['LIBRARY'],
      labelText: 'Bài viết nâng cao',
      descriptionElement: (
        <Form.Item
          name="type"
          className="mb-0"
          getValueFromEvent={(value: boolean) =>
            value ? EnumPostType['ADVANCE'] : EnumPostType['DEFAULT']
          }
          getValueProps={(value: number) => ({
            checked: value === EnumPostType['ADVANCE'],
          })}
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      ),
    },
    {
      labelText: 'Link Video',
      descriptionElement: (
        <>
          <Form.Item name={['linked', 'video']} className="mb-0">
            <Input placeholder="Nhập link youtube" />
          </Form.Item>
          <Form.Item dependencies={[['linked', 'video']]} noStyle>
            {({ getFieldValue }) => {
              const url = getFieldValue(['linked', 'video']) as string
              const embedId = youtube_parser(url)
              return embedId ? (
                <div className="relative mt-2 w-full pb-[56%]">
                  <iframe
                    className="absolute w-full h-full rounded-3xl"
                    title="Embedded youtube"
                    allowFullScreen
                    src={`https://www.youtube.com/embed/${embedId}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; encrypted-media"
                  />
                </div>
              ) : (
                url && (
                  <Typography.Text className="text-red-400">
                    Chưa tìm thấy Video từ link này
                  </Typography.Text>
                )
              )
            }}
          </Form.Item>
        </>
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
      descriptionElement: (
        <Text>
          {formatDateToString(data?.createdAt, 'DD/MM/YYYY HH:mm:ss')}
        </Text>
      ),
    },
  ]

  return (
    <CustomDescriptions labelStyle={{ width: 200 }} data={descriptionData} />
  )
}

export default PostInfo
