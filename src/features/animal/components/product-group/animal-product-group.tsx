import { CommonButton, CustomTable } from '@/components'
import { usePagePagination } from '@/hooks'
import { columnId, columnStatusTwo, getPathImg } from '@/utils'
import { Card, Image, Space } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { FC, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import useAnimalStore from '../../hooks/use-animal-store'
import { useAnimaProductGroupQuery } from '../../hooks/use-product-group-query'
import { AnimalProductGroupData } from '../../services/types'
import ProductGroupModal from './product-group-modal'

const PAGE_SIZE = 5

const AnimalProductGroup: FC = () => {
  const { id } = useParams()
  const setProductGroupModal = useAnimalStore(
    (state) => state.setProductGroupModal
  )

  const { currentPage, onChange } = usePagePagination()

  const { data, isLoading } = useAnimaProductGroupQuery({
    animalIds: +id!,
    page: currentPage,
    perPage: PAGE_SIZE,
  })

  const columns: ColumnsType<AnimalProductGroupData> = useMemo(
    () => [
      columnId(),
      {
        title: 'Hình ảnh',
        width: 160,
        dataIndex: 'images',
        align: 'center',
        render: (images: AnimalProductGroupData['images']) =>
          images.avatar?.original && (
            <Image
              alt="Hình ảnh nhóm sản phẩm"
              src={getPathImg(images.avatar[128].id)}
              width={120}
            />
          ),
      },
      {
        title: 'Nhóm sản phẩm',
        dataIndex: 'name',
      },
      {
        title: 'Mô tả',
        dataIndex: 'description',
      },
      columnStatusTwo(),
      {
        title: 'Hành động',
        align: 'center',
        width: 120,
        fixed: 'right',
        render: (_, { id }) => (
          <Space>
            <CommonButton
              action="view"
              onClick={() => setProductGroupModal(id)}
            />
          </Space>
        ),
      },
    ],
    [setProductGroupModal]
  )

  return (
    <Card
      title="Danh sách Nhóm sản phẩm"
      loading={isLoading}
      extra={
        <CommonButton
          action="add"
          onClick={() => setProductGroupModal('add')}
          className="flex items-center"
        >
          Thêm nhóm sản phẩm
        </CommonButton>
      }
    >
      <CustomTable
        name="nhóm sản phẩm"
        dataSource={data?.data}
        onChange={onChange}
        columns={columns}
        pagination={{
          current: currentPage,
          pageSize: PAGE_SIZE,
          total: data?.total,
        }}
      />
      <ProductGroupModal />
    </Card>
  )
}

export default AnimalProductGroup
