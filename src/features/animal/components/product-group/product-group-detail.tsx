import { MainAction } from '@/components'
import { differentObject } from '@/utils'
import { Form } from 'antd'
import { useEffect, useMemo } from 'react'
import { useBoolean } from 'usehooks-ts'
import useAnimalStore from '../../hooks/use-animal-store'
import {
  useAnimaProductGroupDetailQuery,
  useUpdateProductGroupMutation,
} from '../../hooks/use-product-group-query'
import { AnimalBodyUpdateProductGroup } from '../../services/types'
import ProductGroupForm from './product-group-form'

const ProductGroupDetail = () => {
  const [form] = Form.useForm()
  const { value: isChanged, setTrue, setFalse } = useBoolean(false)
  const productGroupModal = useAnimalStore((state) => state.productGroupModal)
  const setProductGroupModal = useAnimalStore(
    (state) => state.setProductGroupModal
  )

  const { data, isFetching } = useAnimaProductGroupDetailQuery(
    productGroupModal as number,
    {
      enabled: typeof productGroupModal === 'number',
    }
  )

  const { mutate, isLoading: isUpdating } = useUpdateProductGroupMutation(
    productGroupModal as number
  )

  const initialValues = useMemo(
    () =>
      data && {
        ...data,
        images: {
          avatar: data.images.avatar && data.images.avatar[360].id,
        },
      },
    [data]
  )

  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [initialValues, form])

  const handleReset = () => {
    form.resetFields()
    setFalse()
  }

  const onFinish = (values: AnimalBodyUpdateProductGroup) => {
    const dataChanged = differentObject(values, initialValues)
    mutate(dataChanged, {
      onSuccess: () => {
        setFalse()
        setProductGroupModal()
      },
    })
  }

  return (
    <Form
      key={productGroupModal}
      {...{
        form,
        initialValues,
        onFinish,
      }}
      onValuesChange={setTrue}
      disabled={isFetching}
    >
      <ProductGroupForm data={data} />
      <MainAction
        onCancel={handleReset}
        onOk={form.submit}
        isCancelDisabled={!isChanged}
        isOkDisabled={!isChanged}
        isOkLoading={isUpdating}
      />
    </Form>
  )
}

export default ProductGroupDetail
