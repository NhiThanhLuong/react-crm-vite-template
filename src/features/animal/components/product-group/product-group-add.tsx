import { MainAction } from '@/components'
import { EnumStatus } from '@/ts/enums'
import { Form } from 'antd'
import { useParams } from 'react-router-dom'
import useAnimalStore from '../../hooks/use-animal-store'
import { useAddProductGroupMutation } from '../../hooks/use-product-group-query'
import { AnimalBodyAddProductGroup } from '../../services/types'
import ProductGroupForm from './product-group-form'

const ProductGroupAdd = () => {
  const { id } = useParams()
  const [form] = Form.useForm()
  const setProductGroupModal = useAnimalStore(
    (state) => state.setProductGroupModal
  )

  const { mutate, isLoading } = useAddProductGroupMutation()

  const onFinish = (values: AnimalBodyAddProductGroup) => {
    values.animalId = +id!

    mutate(values, {
      onSuccess: () => setProductGroupModal(),
    })
  }

  return (
    <Form
      {...{
        form,
        onFinish,
      }}
      initialValues={{
        status: EnumStatus['ACTIVE'],
      }}
      disabled={isLoading}
    >
      <ProductGroupForm />
      <MainAction
        onCancel={() => setProductGroupModal()}
        isAddType
        onOk={form.submit}
        isCancelDisabled={isLoading}
        isOkLoading={isLoading}
      />
    </Form>
  )
}

export default ProductGroupAdd
