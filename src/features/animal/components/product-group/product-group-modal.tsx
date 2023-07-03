import { Modal } from 'antd'
import { FC } from 'react'
import useAnimalStore from '../../hooks/use-animal-store'
import ProductGroupAdd from './product-group-add'
import ProductGroupDetail from './product-group-detail'

const ProductGroupModal: FC = () => {
  const productGroupModal = useAnimalStore((state) => state.productGroupModal)
  const setProductGroupModal = useAnimalStore(
    (state) => state.setProductGroupModal
  )

  return (
    <Modal
      key={productGroupModal}
      open={!!productGroupModal}
      closable={false}
      footer={null}
      width={700}
      onCancel={() => setProductGroupModal()}
      title={
        productGroupModal === 'add'
          ? 'Thêm nhóm sản phẩm'
          : `Chi tiết nhóm sản phẩm ${productGroupModal ?? ''}`
      }
      forceRender
    >
      {productGroupModal === 'add' ? (
        <ProductGroupAdd />
      ) : (
        <ProductGroupDetail />
      )}
    </Modal>
  )
}

export default ProductGroupModal
