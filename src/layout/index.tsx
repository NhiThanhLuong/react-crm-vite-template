import { Layout, Spin } from 'antd';
import dayjs from 'dayjs';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import fallbackRender from './error-boundary/fallbackRender';
import HeaderComponent from './header';
import MenuComponent from './menu';

const { Content, Footer } = Layout;
const year = dayjs().format('YYYY');

const LayoutComponent = () => {
  return (
    <Layout className="h-full">
      <HeaderComponent />
      <Layout>
        <MenuComponent />
        <Layout>
          <Content className="px-4 pt-4 flex flex-col">
            <ErrorBoundary fallbackRender={fallbackRender}>
              <Suspense
                fallback={
                  <div className="w-full h-full flex">
                    <Spin spinning className="m-auto" />
                  </div>
                }
              >
                <Outlet />
              </Suspense>
            </ErrorBoundary>
          </Content>
          <Footer className="text-center !py-2 z-10">
            <span>
              Copyright &copy; {year} Powered by Estuary Solutions, version{' '}
              {import.meta.env.VITE_VERSION}
            </span>
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
