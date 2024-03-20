import { DashboardOutlined } from '@ant-design/icons';
import { Alert, Button, Result, Spin } from 'antd';
import { lazy, Suspense } from 'react';
import { Link, Navigate } from 'react-router-dom';

import { TOKEN, getStorage } from 'utils';
// import Layout from "@/components/Layout";
import { Layout, OutletLayoutRouter } from 'components';
import type { MenuItem } from 'components';
import Dashboard from '@/pages/dashboard';
import ErrorPage from '@/pages/error-page';
import Workplace from '@/pages/alarm';
import TroubleShooting from '@/pages/knowledge-graph/troubleShooting';
import User from '@/pages/user';
import Login from '@/pages/login';
// import { loginAPI } from 'api'; // 替换成实际的后端API调用函数
// import { useState } from 'react';

const Permissions = ({ children }: any) => {
  const token = getStorage(TOKEN);
  return token ? children : <Navigate to="/login" />;
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // // 假设这是一个处理登录的函数，调用后端API验证用户信息
  // const handleLogin = async () => {
  //   try {
  //     // 调用后端API验证用户信息
  //     const response = await loginAPI(/* 传递用户信息和密码等参数 */);
      
  //     // 假设后端API返回的数据结构中包含token信息
  //     const token = response.data.token;

  //     // 将token保存到本地存储中
  //     setStorage(TOKEN, token);
      
  //     // 标记用户已登录
  //     setIsLoggedIn(true);
  //   } catch (error) {
  //     // 处理登录失败的情况
  //     console.error('登录失败:', error);
  //   }
  // };

  // // 判断用户是否已登录，如果已登录则渲染子组件，否则重定向到登录页面
  // return isLoggedIn ? children : <Navigate to="/login" />;
};

export const baseRouterList = [
  {
    label: 'Dashboard',
    key: 'dashboard',
    path: 'dashboard',
    icon: <DashboardOutlined />,
    filepath: 'pages/dashboard/index.tsx',
  },
];

export const defaultRoutes: any = [
  {
    path: '/',
    element: <Permissions>{<Layout />}</Permissions>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Navigate to="dashboard" />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      // 在 defaultRoutes 数组中添加新页面的路由配置
      {
        path: 'alarm', // 新页面的路径
        element: <Workplace />, // 对应的页面组件
      },
      {
        path: 'troubleShooting', // 新页面的路径
        element: <TroubleShooting />, // 对应的页面组件
      },
      {
        path: 'user', // 新页面的路径
        element: <User />, // 对应的页面组件
      },
      {
        path: '/*',
        element: (
          <ErrorPage>
            <Result
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
              extra={
                <Link to={'/'}>
                  <Button type="primary">Back Home</Button>
                </Link>
              }
            />
          </ErrorPage>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
];

// /**/ 表示二级目录 一般二级目录就够了  不够在加即可
export const modules = import.meta.glob('../pages/**/*.tsx');

function pathToLazyComponent(Ele: string) {
  const path = modules[`../${Ele}`] as any;
  if (!path)
    return (
      <ErrorPage>
        <Alert
          message={Ele + ':Cannot find the path, please configure the correct folder path'}
          type="error"
        />
      </ErrorPage>
    );
  const Components = lazy(path);
  return (
    <Suspense fallback={<Spin size="small" />}>
      <Components />
    </Suspense>
  );
}
export const filepathToElement = (list: MenuItem[]) =>
  list.map((item) => {
    if (item.children) {
      return {
        path: item.path,
        key: item.key,
        children: item.children?.map((c) => ({
          key: c.key,
          path: c.path,
          element: pathToLazyComponent(c.filepath),
        })),
        element: <OutletLayoutRouter />,
      };
    } else {
      return {
        key: item.key,
        path: item.path,
        element: pathToLazyComponent(item.filepath),
      };
    }
  });
