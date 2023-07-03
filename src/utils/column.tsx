import { CommonButton, StatusTag, StatusTagTwo } from '@/components'
import { Status } from '@/ts/types'
import { Space } from 'antd'
import { ColumnType } from 'antd/es/table'
import { formatDateToString } from './date'
import { STATUS } from '@/data/constant'

export const columnId = <T extends object>(): ColumnType<T> => ({
  title: 'ID',
  dataIndex: 'id',
  align: 'center',
  width: 80,
})

export const columnAction = <T extends { id: number }>(
  PATH: string,
  width = 120
): ColumnType<T> => ({
  title: 'Xem chi tiết',
  align: 'center',
  fixed: 'right',
  width: width,
  render: (record: T) => (
    <Space>
      <CommonButton action="view" href={`${PATH}/${record.id}`} />
    </Space>
  ),
})

export const columnCreateAt = <T extends object>(): ColumnType<T> => ({
  title: 'Thời điểm tạo',
  width: 160,
  dataIndex: 'createdAt',
  align: 'center',
  render: (value?: string) => formatDateToString(value, 'DD/MM/YYYY HH:mm:ss'),
})

export const columnStatus = <T extends { status: number }>(
  statusList?: Status[]
): ColumnType<T> => ({
  title: 'Trạng thái',
  dataIndex: 'status',
  align: 'center',
  render: (value: number) => (
    <StatusTag value={value} statusList={statusList} />
  ),
})

export const columnStatusTwo = <T extends { status: number }>(
  statusObj: Record<number, Status> = STATUS
): ColumnType<T> => ({
  title: 'Trạng thái',
  width: 140,
  dataIndex: 'status',
  align: 'center',
  render: (value: number) => <StatusTagTwo statusObj={statusObj[value]!} />,
})
