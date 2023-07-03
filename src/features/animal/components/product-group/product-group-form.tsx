import { CustomDescriptions, UploadImage } from '@/components'
import { STATUS_LIST } from '@/data/constant'
import { DescriptionsRecord } from '@/ts/types'
import { formatDateToString, validator } from '@/utils'
import { Form, Input, Radio } from 'antd'
import { FC, useMemo } from 'react'
import { AnimalProductGroupData } from '../../services/types'

type Props = {
  data?: AnimalProductGroupData
}

const ProductGroupForm: FC<Props> = ({ data }) => {
  const descriptionData: DescriptionsRecord[] = useMemo(
    () => [
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
        isRequired: true,
        labelText: 'Tên nhóm sản phẩm',
        descriptionElement: (
          <Form.Item name="name" className="mb-0">
            <Input placeholder="Nhập tên nhóm sản phẩm" />
          </Form.Item>
        ),
      },
      {
        isRequired: true,
        labelText: 'Mô tả',
        descriptionElement: (
          <Form.Item name="description" className="mb-0">
            <Input placeholder="Nhập mô tả" />
          </Form.Item>
        ),
      },
      {
        isRequired: true,
        labelText: 'Trang thái',
        descriptionElement: (
          <Form.Item name="status" className="mb-0">
            <Radio.Group options={STATUS_LIST} />
          </Form.Item>
        ),
      },
      {
        isShow: !!data,
        labelText: 'Thời điểm tạo',
        descriptionElement:
          data?.createdAt &&
          formatDateToString(data.createdAt, 'DD/MM/YYYY MM:hh:ss'),
      },
      {
        isShow: !!data,
        labelText: 'Thời điểm cập nhật gần nhất',
        descriptionElement:
          data?.updatedAt &&
          formatDateToString(data?.updatedAt, 'DD/MM/YYYY MM:hh:ss'),
      },
    ],
    [data]
  )

  return (
    <CustomDescriptions labelStyle={{ width: 240 }} data={descriptionData} />
  )
}

export default ProductGroupForm
