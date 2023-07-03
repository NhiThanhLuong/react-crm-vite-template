import { TablePaginationConfig } from 'antd'
import { useCallback, useState } from 'react'

const usePagePagination = () => {
  const [currentPage, setCurrentPage] = useState(1)

  //onChange is used for onChange props of Table Antd component
  const onChange = useCallback(({ current }: TablePaginationConfig) => {
    setCurrentPage(current!)
  }, [])

  return { currentPage, onChange } as const
}

export default usePagePagination
