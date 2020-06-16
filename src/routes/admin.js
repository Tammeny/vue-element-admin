import LayoutDefault from '@/components/layouts/default';

// 管理员
export default [
  {
    path: '/admin',
    redirect: '/admin/index',
    name: 'admin',
    component: LayoutDefault,
    meta: {
      icon: 'el-icon-s-custom',
      isTop: true,
      title: '管理员',
    },
    children: [
      {
        path: '',
        name: 'admin.index',
        component: () => import(/* webpackChunkName: "admin.index" */ '@/pages/admin'),
        meta: {
          icon: '',
          hideInBread: true,
          title: '管理员列表',
        },
      },
    ],
  },
];
