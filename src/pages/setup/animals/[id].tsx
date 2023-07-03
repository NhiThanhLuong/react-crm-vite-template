import { BreadcrumbsWrapper, MainAction } from '@/components'
import {
  ANIMAL_BREADCRUMBS,
  AnimalForm,
  BodyUpdateAnimal,
  useAnimalDetailQuery,
  useUpdateAnimalMutation,
} from '@/features/animal'
import { differentObject } from '@/utils'
import { Form } from 'antd'
import { FC, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useBoolean } from 'usehooks-ts'

const AnimalDetail: FC = () => {
  const { id } = useParams()
  const [form] = Form.useForm()
  const { value: isChanged, setTrue, setFalse } = useBoolean(false)
  const { data, isLoading, isFetching } = useAnimalDetailQuery(+id!)
  const { mutate, isLoading: isUpdating } = useUpdateAnimalMutation(+id!)

  const initialValues = useMemo(
    () =>
      data && {
        ...data,
        images: {
          avatar: data.images.avatar && data.images.avatar.original.id,
          banner: data.images.banner && data.images.banner.original.id,
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

  const onFinish = (values: BodyUpdateAnimal) => {
    const dataChanged = differentObject(values, initialValues)
    mutate(dataChanged, {
      onSuccess: setFalse,
    })
  }

  return (
    <BreadcrumbsWrapper
      breadcrumbs={ANIMAL_BREADCRUMBS.detail()}
      isLoading={isFetching || isUpdating}
    >
      <Form
        {...{
          form,
          initialValues,
          onFinish,
        }}
        onValuesChange={setTrue}
      >
        <AnimalForm
          {...{
            data,
            isLoading,
          }}
        />
        {isChanged && (
          <div className="sticky bottom-2">
            <MainAction
              onOk={form.submit}
              onCancel={handleReset}
              cancelText="Hủy bỏ thay đổi"
              isCancelDisabled={!isChanged || isUpdating}
              isOkLoading={isUpdating}
              isOkDisabled={!isChanged}
            />
          </div>
        )}
      </Form>
    </BreadcrumbsWrapper>
  )
}

export default AnimalDetail
