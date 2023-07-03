import { getLocalStorage, setLocalStorage } from '@/utils'
import { Dropdown, MenuProps, Space, Typography } from 'antd'
import { FC, useEffect } from 'react'
import { AiOutlineDown } from 'react-icons/ai'
import useLanguageStore from '../hooks/use-language-store'

const LanguageSwitch: FC = () => {
  const currentLanguage = useLanguageStore((state) => state.currentLanguage)

  useEffect(() => {
    if (!getLocalStorage('lang')) {
      setLocalStorage('lang', currentLanguage)
    }
  }, [currentLanguage])

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Tài khoản',
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      danger: true,
      label: 'Đăng xuất',
    },
  ]

  return (
    <Dropdown
      menu={{ items }}
      trigger={['click']}
      placement="bottomRight"
      arrow
    >
      <Space className="cursor-pointer">
        <Typography.Text>Viet Nam</Typography.Text>
        <AiOutlineDown />
      </Space>
    </Dropdown>
  )
}

export default LanguageSwitch
