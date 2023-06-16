import { Typography } from 'antd';
import { TextProps } from 'antd/es/typography/Text';
import { FC } from 'react';

type Props = Omit<TextProps, 'strong'>;

const TypoTextStrong: FC<Props> = (props) => {
  return (
    <Typography.Text strong {...props}>
      {props.children}
    </Typography.Text>
  );
};

export default TypoTextStrong;
