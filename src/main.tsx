import '@/styles/index.less'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { App as AppProvider } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import QueryProvider from './provider/query-provider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <QueryProvider>
        <App />
        <ReactQueryDevtools initialIsOpen position="bottom-right" />
      </QueryProvider>
    </AppProvider>
  </React.StrictMode>
)
