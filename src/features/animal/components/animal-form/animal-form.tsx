import { FC } from 'react'
import AnimalInfo from './animal-info'
import { AnimalData } from '../../services/types'
import { Space } from 'antd'
import AnimalBanner from './animal-banner'
import AnimalProductGroup from '../product-group/animal-product-group'

type Props = {
  isLoading?: boolean
  data?: AnimalData
}

const AnimalForm: FC<Props> = ({ data, isLoading }) => {
  return (
    <Space direction="vertical" className="w-full" size="middle">
      <AnimalInfo
        {...{
          data,
          isLoading,
        }}
      />
      <AnimalBanner
        {...{
          data,
          isLoading,
        }}
      />
      <AnimalProductGroup />
    </Space>
  )
}

export default AnimalForm
