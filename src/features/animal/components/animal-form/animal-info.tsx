import { Card, Form, Input, Typography } from 'antd'
import { FC, useMemo } from 'react'
import { AnimalData } from '../../services/types'
import { DescriptionsRecord } from '@/ts/types'
import { validator } from '@/utils'
import { CustomDescriptions, UploadImage } from '@/components'
import { ANIMAL_NAME } from '../../animal-constant'

type Props = {
  isLoading?: boolean
  data?: AnimalData
}

const AnimalInfo: FC<Props> = ({ data, isLoading }) => {
  const descriptionData: DescriptionsRecord[] = useMemo(
    () => [
      {
        isRequired: true,
        labelText: 'Ảnh theo quốc gia (55 x 55)',
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
        labelText: 'Tên mặc định',
        descriptionElement: (
          <Form.Item name="defaultName" className="mb-0">
            <Input placeholder="Nhập tên mặc định" />
          </Form.Item>
        ),
      },
      {
        isShow: !!data,
        labelText: 'Tên theo ngôn ngữ',
        descriptionElement: <Typography.Text>{data?.name}</Typography.Text>,
      },
    ],
    [data]
  )

  return (
    <Card loading={isLoading} title={`Thông tin ${ANIMAL_NAME}`}>
      <CustomDescriptions labelStyle={{ width: 240 }} data={descriptionData} />
    </Card>
  )
}

export default AnimalInfo
