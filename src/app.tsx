import './styles/index.css';
import ruRU from 'antd/locale/ru_RU';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import { SidebarMenu } from './components/sidebar-menu';
import { ConfigProvider, Layout } from 'antd';
import { useState } from 'react';
import { AuthContextProvider } from './entities/auth/provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider onStatusChange={setIsAuth}>
          <ConfigProvider locale={ruRU}>
            <Layout>
              <Layout.Sider width={isAuth ? 280 : 0}>
                <SidebarMenu />
              </Layout.Sider>
              <Layout style={{ padding: 12 }}>
                <AppRouter />
              </Layout>
            </Layout>
          </ConfigProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
