import { FC, useMemo } from 'react'
import { AnimalData } from '../../services/types'
import { Card, Form } from 'antd'
import { CustomDescriptions, UploadImage } from '@/components'
import { DescriptionsRecord } from '@/ts/types'
import { validator } from '@/utils'

type Props = {
  isLoading?: boolean
  data?: AnimalData
}

const AnimalBanner: FC<Props> = ({ data, isLoading }) => {
  const descriptionData: DescriptionsRecord[] = useMemo(
    () => [
      {
        isRequired: true,
        labelText: 'Hình ảnh',
        descriptionElement: (
          <Form.Item
            name={['images', 'banner']}
            rules={validator('required')}
            className="m-auto text-center"
          >
            <UploadImage />
          </Form.Item>
        ),
      },
    ],
    []
  )

  return (
    <Card loading={isLoading} title="Thông tin banner trang sản phẩm">
      <CustomDescriptions labelStyle={{ width: 240 }} data={descriptionData} />
    </Card>
  )
}

export default AnimalBanner
