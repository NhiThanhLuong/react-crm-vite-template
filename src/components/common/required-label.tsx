import { Typography } from 'antd';
import { FC, ReactNode } from 'react';

type Props = {
  label: ReactNode;
  className?: string;
};

const RequiredLabel: FC<Props> = ({ label, className }) => {
  return (
    <span className={className}>
      <Typography.Text>{label}</Typography.Text>{' '}
      <span className="text-red-400">*</span>
    </span>
  );
};

export default RequiredLabel;
