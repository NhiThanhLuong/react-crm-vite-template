import { BreadcrumbsWrapper, CustomTable } from '@/components'
import { fallbackImgSrc } from '@/data/constant'
import {
  ANIMAL_BREADCRUMBS,
  AnimalData,
  useAnimalListQuery,
} from '@/features/animal'
import { columnAction, columnId, getPathImg } from '@/utils'
import { Card, Image } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { FC } from 'react'

const AnimalSetup: FC = () => {
  const { data, isLoading, isFetching } = useAnimalListQuery(undefined, {
    select: (data) => data.data,
  })

  return (
    <BreadcrumbsWrapper
      breadcrumbs={ANIMAL_BREADCRUMBS.list}
      isLoading={isFetching}
    >
      <Card title={ANIMAL_BREADCRUMBS.listPath.title} loading={isLoading}>
        <CustomTable columns={columns} dataSource={data} />
      </Card>
    </BreadcrumbsWrapper>
  )
}

export default AnimalSetup

const columns: ColumnsType<AnimalData> = [
  columnId(),
  {
    title: 'Ảnh theo quốc gia(55 x 55)',
    dataIndex: 'images',
    align: 'center',
    render: (images: AnimalData['images']) => (
      <Image
        alt="Hình ảnh đối tượng"
        src={images.avatar?.[128] && getPathImg(images.avatar[128].id)}
        fallback={fallbackImgSrc}
        width={120}
      />
    ),
  },
  {
    title: 'Tên theo mặc dịnh',
    dataIndex: 'defaultName',
  },
  {
    title: 'Tên theo ngôn ngữ',
    dataIndex: 'name',
  },
  columnAction(ANIMAL_BREADCRUMBS.listPath.url),
]
