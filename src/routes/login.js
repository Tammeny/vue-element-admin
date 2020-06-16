import LayoutMinimal from '@/components/layouts/minimal';

const Layout = LayoutMinimal;

// 登录
export default [
  {
    path: '/login',
    redirect: '/login/index',
    name: 'login',
    component: Layout,
    meta: {
      hideInMenu: true,
      title: '',
    },
    children: [
      {
        path: '',
        name: 'login.index',
        component: () => import(/* webpackChunkName: "login.index" */ '@/pages/login'),
        meta: {
          hideInMenu: true,
          title: '登录',
        },
      },
    ],
  },
];
