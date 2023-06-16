import { Dropdown, Modal } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { MenuClickEventHandler } from 'rc-menu/lib/interface';
import {
  Children,
  FC,
  ReactElement,
  cloneElement,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { AiFillLock, AiTwotoneSetting } from 'react-icons/ai';
import { MdOutlineSwapHorizontalCircle } from 'react-icons/md';
import styled from 'styled-components';

const modals: Record<
  string,
  {
    title: string;
  }
> = {
  '1': {
    title: 'Đổi mật khẩu',
  },
  '2': {
    title: 'Đặt mật khẩu về mặc định',
  },
};

type Props = {
  isMe?: boolean;
  children: ReactElement;
};

const UserPasswordDropdown: FC<Props> = ({ isMe, children }) => {
  const [keyModal, setKeyModal] = useState<string>();

  const items: ItemType[] = useMemo(
    () => [
      {
        key: '1',
        icon: <MdOutlineSwapHorizontalCircle />,
        label: 'Đổi mật khẩu',
        disabled: !isMe,
      },
      {
        type: 'divider',
      },
      {
        key: '2',
        icon: <AiFillLock />,
        label: 'Đặt lại mật khẩu mặc định',
      },
    ],
    [isMe]
  );

  const handleClick: MenuClickEventHandler = useCallback(({ key }) => {
    setKeyModal(key);
  }, []);

  const modifiedChildren = Children.map(children, (child) => {
    return cloneElement(child, {
      keyModal: keyModal,
      onCancel: () => setKeyModal(undefined),
    });
  });

  return (
    <>
      <Dropdown
        forceRender
        className="cursor-pointer"
        menu={{ items, onClick: handleClick }}
        trigger={['click']}
        placement="bottomRight"
        arrow
      >
        <StyleAiTwotoneSetting size={36} />
      </Dropdown>
      <Modal
        forceRender
        key={keyModal}
        open={!!keyModal}
        width={600}
        destroyOnClose
        onCancel={() => setKeyModal(undefined)}
        title={keyModal && modals[keyModal].title}
        footer={null}
      >
        {modifiedChildren}
        {/* <ChangePassword /> */}
      </Modal>
    </>
  );
};

export default UserPasswordDropdown;

const StyleAiTwotoneSetting = styled(AiTwotoneSetting)`
  animation: rotate 2s linear infinite;
  &:hover {
    animation-play-state: paused;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`;
