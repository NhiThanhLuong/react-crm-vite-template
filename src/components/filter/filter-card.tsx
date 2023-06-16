import { CustomCard } from '@/components';
import { Button, Space } from 'antd';
import { FC, ReactElement } from 'react';
import { FaAngleDoubleDown, FaAngleDoubleUp } from 'react-icons/fa';
import { FcClearFilters, FcSearch } from 'react-icons/fc';
import { useToggle } from 'usehooks-ts';

type Props = {
  onReset: () => void;
  children: ReactElement;
};

const FilterCard: FC<Props> = ({ onReset, children }) => {
  const [isExpand, toggleExpand] = useToggle(true);

  return (
    <CustomCard
      title={
        <Space
          onClick={toggleExpand}
          className="cursor-pointer select-none text-lg"
        >
          <span>Bộ lọc</span>
          <span>{isExpand ? <FaAngleDoubleDown /> : <FaAngleDoubleUp />}</span>
        </Space>
      }
      className={`${!isExpand ? 'max-h-[56px]' : ''} overflow-hidden`}
      bordered
      extra={
        <Space>
          <Button
            onClick={onReset}
            className="flex justify-between items-center gap-1"
            icon={<FcClearFilters size={18} />}
          >
            Xóa bộ lọc
          </Button>
          <Button
            type="primary"
            className="flex justify-between items-center gap-1"
            htmlType="submit"
            icon={<FcSearch size={18} />}
          >
            Tìm kiếm
          </Button>
        </Space>
      }
    >
      {children}
    </CustomCard>
  );
};

export default FilterCard;
