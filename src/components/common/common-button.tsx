import { Button, ButtonProps } from 'antd';
import { ElementType, Fragment } from 'react';
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineExport,
  AiOutlineEye,
  AiOutlinePlus,
  AiOutlineSave,
  AiOutlineUndo,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';

const variants = {
  add: {
    icon: <AiOutlinePlus size={20} />,
    type: 'primary',
  },
  edit: {
    icon: <AiOutlineEdit size={20} />,
    type: 'primary',
  },
  delete: {
    icon: <AiOutlineDelete size={20} />,
    type: 'primary',
    danger: true,
    ghost: true,
  },
  view: { icon: <AiOutlineEye size={24} />, type: 'primary' },
  export: { icon: <AiOutlineExport />, type: 'primary' },
  save: {
    icon: <AiOutlineSave size={20} />,
    type: 'primary',
  },
  cancel: {
    icon: <AiOutlineUndo size={20} />,
    type: 'primary',
    danger: true,
    ghost: true,
  },
  nothing: {
    style: {
      outline: 'none',
      padding: '0px',
      border: 'none',
      height: 'auto',
    },
  },
};

type Props = ButtonProps & {
  action: keyof typeof variants;
};

export default function CommonButton({
  children,
  href,
  action,
  ...rest
}: Props) {
  const Component: ElementType = href ? Link : Fragment;

  return (
    <Component {...(href ? { to: href } : {})}>
      <Button {...(variants[action] as ButtonProps)} {...rest}>
        {children}
      </Button>
    </Component>
  );
}
