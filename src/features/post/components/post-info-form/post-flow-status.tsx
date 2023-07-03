import { Button, Space } from 'antd'
import { FC } from 'react'
import { POST_STATUS } from '../../post-constant'
import { EnumPostStatus } from '../../services/enums'

type Props = {
  status: EnumPostStatus
  onNextStatus: (nextStatus: number, label: string, color: string) => void
}

const PostFlowStatus: FC<Props> = ({ status, onNextStatus }) => {
  return (
    <Space>
      {POST_STATUS[status].nextActions.map((nextStatus) => {
        const statusRecord = POST_STATUS[nextStatus]

        return (
          <Button
            disabled={false}
            key={nextStatus}
            style={{
              backgroundColor: statusRecord.color,
            }}
            onClick={() =>
              onNextStatus(nextStatus, statusRecord.label, statusRecord.color)
            }
          >
            {statusRecord.label}
          </Button>
        )
      })}
    </Space>
  )
}

export default PostFlowStatus
