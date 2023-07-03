/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { mediaFileApi } from '@/apis'
import { useApp } from '@/hooks'
import { getPathImg } from '@/utils'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { ConfigProvider, Form, FormItemProps, Spin, theme } from 'antd'
import ClassicEditor from 'ckeditor5-luongthanhnhi-custom-build/build/ckeditor'
import { FC, useState } from 'react'
import styled from 'styled-components'
import EmbedProvider from './embed-provider'

type Props = FormItemProps & {
  data?: string
  isDisabled?: boolean
}

const FormCKEditor: FC<Props> = ({ data, isDisabled, ...props }) => {
  const { message } = useApp()
  const [isUploading, setIsUploading] = useState(false)

  function uploadAdapter(loader: { file: Promise<Blob> }) {
    return {
      upload: async () => {
        const body = new FormData()
        const file = await loader.file
        body.append('file', file)
        try {
          setIsUploading(true)
          const data = await mediaFileApi(body)
          return {
            default: getPathImg(data.variants[360].id),
          }
        } catch (err) {
          void message.error('File tải lên không thành công')
          return Promise.reject(err)
        } finally {
          setIsUploading(false)
        }
      },
    }
  }

  function uploadPlugin(editor: ClassicEditor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: {
      file: Promise<Blob>
    }) => {
      return uploadAdapter(loader)
    }
  }

  const config = {
    mediaEmbed: {
      previewsInData: true,
      providers: EmbedProvider,
    },
    extraPlugins: [uploadPlugin],
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <Container>
        <Spin spinning={isUploading} tip="Đang chờ tải hình ảnh">
          <Form.Item
            {...props}
            getValueFromEvent={(_, editor: ClassicEditor) => editor.getData()}
          >
            <CKEditor
              disabled={isDisabled}
              editor={ClassicEditor}
              {...{ data, config }}
            />
          </Form.Item>
        </Spin>
      </Container>
    </ConfigProvider>
  )
}

export default FormCKEditor

const Container = styled.div`
  .ck.ck-content {
    min-height: 300px;
  }
`
