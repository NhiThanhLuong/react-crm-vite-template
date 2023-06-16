import '@/styles/index.less';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import { message } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      // onError: (error?: any) => {
      //   void message.error(
      //     // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
      //     `Something went wrong: ${error.message || 'unknown'}`
      //   );
      // },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen position="bottom-right" />
    </QueryClientProvider>
  </React.StrictMode>
);
