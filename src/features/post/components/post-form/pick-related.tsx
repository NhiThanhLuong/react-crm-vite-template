import { CommonButton, CustomTable, FilterWrapper } from '@/components'
import { useApp } from '@/hooks'
import { TFilterSchema } from '@/ts/types'
import {
  Card,
  Modal,
  TablePaginationConfig,
  TableProps,
  Typography,
} from 'antd'
import { ColumnsType } from 'antd/es/table'
import { Dayjs } from 'dayjs'
import { Key, useRef, useState } from 'react'
import usePostStore from '../../hooks/use-post-store'
import { EnumPostRelatedModal } from '../../services/enums'

type Props<
  T extends Record<'id', number>,
  TData extends Record<'id', number>,
  TFilter extends Record<string, unknown>
> = {
  value: T[]
  setValue: (value: T[]) => void
  openType: EnumPostRelatedModal

  //Type Table
  scrollX?: number
  name: string
  columns: ColumnsType<TData>
  setRowRecords: (item: TData) => T

  // Type of useFilter
  onResetFilter: () => void
  onFilterChange: (newFilter: TFilter) => void
  schemaList: TFilterSchema<TFilter>[]
  filter: {
    [key: string]: string | number | Dayjs | undefined
  }
  onPageChange: ({ current, pageSize }: TablePaginationConfig) => void

  //Type useQuery
  isFetching: boolean
  isLoading: boolean
  dataSource: TData[] | undefined
  total: number | undefined
}

const PickRelated = <
  T extends Record<'id', number>,
  TData extends Record<'id', number>,
  TFilter extends Record<string, unknown>
>({
  value,
  setValue,
  openType,

  // Table
  name,
  columns,
  scrollX = 1000,

  // useFilter
  onResetFilter,
  onFilterChange,
  schemaList,
  filter,
  setRowRecords,
  onPageChange,

  //useQuery
  isFetching,
  isLoading,
  dataSource,
  total,
}: Props<T, TData, TFilter>) => {
  const { message } = useApp()
  const modalType = usePostStore((state) => state.modalType)
  const setModal = usePostStore((state) => state.setModal)
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])

  const newSelectedRecords = useRef<T[]>([])

  const turnOffModal = () => {
    setModal()
    onResetFilter()
  }

  const handleResetFilter = () => {
    if (selectedRowKeys.length > 0) {
      void message.warning(
        `Vui lòng thêm hoặc bỏ chọn các ${name}, trước khi xóa bộ lọc`
      )
      return
    }
    onResetFilter()
  }

  const handlePageChange = (params: TablePaginationConfig) => {
    if (selectedRowKeys.length > 0) {
      void message.warning(
        `Vui lòng thêm hoặc bỏ chọn các ${name}, trước khi chuyển trang`
      )
      return
    }
    onPageChange(params)
  }

  const handleFilterChange = (newFilter: TFilter) => {
    if (selectedRowKeys.length > 0) {
      void message.warning(
        `Vui lòng thêm hoặc bỏ chọn các ${name}, trước khi tìm kiếm`
      )
      return
    }
    onFilterChange(newFilter)
  }

  const rowSelection: TableProps<TData>['rowSelection'] = {
    selectedRowKeys,
    getCheckboxProps: (record) => ({
      // disabled, not allow to select more existing items
      disabled:
        openType === EnumPostRelatedModal['POST'] &&
        value.some((item) => item.id === record.id),
    }),
    onChange: (newSelectedRowKeys, newSelectedRows) => {
      // Get some fields to display from general record from setRowRecords function
      newSelectedRecords.current = newSelectedRows.map(setRowRecords)
      setSelectedRowKeys(newSelectedRowKeys)
    },
  }

  const handleAddItems = () => {
    setSelectedRowKeys([])
    turnOffModal()
    setValue(newSelectedRecords.current)
  }

  return (
    <Modal
      key={modalType}
      width={1000}
      closable={false}
      open={modalType === openType}
      onCancel={turnOffModal}
      footer={null}
    >
      <FilterWrapper
        className="mb-4"
        onReset={handleResetFilter}
        onChange={handleFilterChange}
        schemaList={schemaList}
        filter={filter}
      />
      <div className="flex items-center gap-4 mb-2">
        <CommonButton
          action="add"
          className="flex items-center"
          disabled={selectedRowKeys.length === 0}
          onClick={handleAddItems}
        >
          Thêm {name} đã chọn
        </CommonButton>
        {selectedRowKeys.length > 0 && (
          <Typography.Text>
            Đã chọn {selectedRowKeys.length} {name}
          </Typography.Text>
        )}
      </div>
      <Card title={`Danh sách ${name}`} loading={isLoading}>
        <CustomTable
          isLoading={isFetching}
          onChange={handlePageChange}
          pagination={{
            current: filter.page as number,
            pageSize: filter.limit as number,
            total: total,
          }}
          {...{
            scrollX,
            name,
            columns,
            dataSource,
            rowSelection,
          }}
        />
      </Card>
    </Modal>
  )
}

export default PickRelated
