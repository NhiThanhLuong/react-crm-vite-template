import { formatNumber } from '@/utils';
import { Table, TableProps } from 'antd';

type CustomTableProps<T extends object> = TableProps<T> & {
  name?: string;
  scrollX?: number;
  isLoading?: boolean;
};

function CustomTable<T extends object>({
  rowKey = 'id',
  dataSource = [],
  columns = [],
  name,
  isLoading,
  pagination,
  scrollX = 1200,
  onChange,
  ...props
}: CustomTableProps<T>) {
  return (
    <Table
      rowKey={rowKey}
      size="middle"
      dataSource={dataSource}
      columns={columns}
      onChange={onChange}
      pagination={{
        position: ['topRight', 'bottomRight'],
        showSizeChanger: false,
        showLessItems: true,
        showTotal: (total, range) =>
          `${formatNumber(total)}${name ? ' '.concat(name) : ''} | Từ ${
            range[0]
          } đến ${range[1]}`,
        ...pagination,
      }}
      scroll={{ x: scrollX }}
      loading={isLoading}
      {...props}
    />
  );
}

export default CustomTable;
