import LayoutDefault from '@/components/layouts/default';

// 首页
export default [
  {
    path: '/',
    redirect: {
      name: 'home.index',
    },
    meta: {},
  },
  {
    path: '/home',
    redirect: '/home/index',
    name: 'home',
    component: LayoutDefault,
    meta: {
      icon: 'el-icon-s-home',
      hideInBread: false,
      hideInMenu: false,
      isTop: true,
      title: '首页',
    },
    children: [
      {
        path: '',
        name: 'home.index',
        component: () => import(/* webpackChunkName: "home.index" */ '@/pages/home'),
        meta: {
          icon: '',
          title: '首页',
        },
      },
    ],
  },
];
