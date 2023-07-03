import { ColumnsType } from 'antd/es/table'
import { FC } from 'react'

import { ListManagementWrapper } from '@/components'
import { FILTER_SCHEMA_PAGE_LIST, USER_PATH } from '@/data/constant'
import {
  DataUser,
  USER_BREADCRUMBS,
  USER_NAME,
  USER_ROLE_LIST,
  USER_STATUS_LIST,
  UserListParams,
  useUserListQuery,
} from '@/features/user'
import { TFilterSchema } from '@/ts/types'
import {
  columnAction,
  columnCreateAt,
  columnId,
  columnStatus,
  FILTER_CREATE_AT_RANGE,
  FILTER_ID,
  FILTER_PHONE_NUMBER,
  filterStatus,
  findObjInArrByKey,
  validator,
} from '@/utils'

const columns: ColumnsType<DataUser> = [
  columnId(),
  {
    title: 'Họ và tên',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
    align: 'center',
  },
  {
    title: 'Chức vụ',
    dataIndex: 'type',
    align: 'center',
    render: (value: number) => findObjInArrByKey(USER_ROLE_LIST, value)?.label,
  },
  columnStatus(USER_STATUS_LIST),
  columnCreateAt(),
  columnAction(USER_PATH),
]

const filterSchema: TFilterSchema<UserListParams>[] = [
  FILTER_ID,
  {
    name: 'name',
    type: 'string',
    element: 'input',
    placeholder: 'Họ và tên',
    formItemProps: {
      rules: validator('name'),
    },
  },
  {
    name: 'email',
    type: 'string',
    element: 'input',
    placeholder: 'Email',
  },
  FILTER_PHONE_NUMBER,
  {
    name: 'type',
    type: 'number',
    element: 'select',
    placeholder: 'Chức vụ',
    fieldProps: {
      options: [
        {
          value: 1,
          label: 'Admin',
        },
      ],
    },
  },
  filterStatus(USER_STATUS_LIST),
  ...FILTER_CREATE_AT_RANGE,
  ...FILTER_SCHEMA_PAGE_LIST,
]

const Users: FC = () => {
  return (
    <ListManagementWrapper
      name={USER_NAME}
      path={USER_PATH}
      listBreadcrumbs={USER_BREADCRUMBS.list}
      useQueryFn={useUserListQuery}
      {...{
        columns,
        filterSchema,
      }}
    />
  )
}

export default Users
