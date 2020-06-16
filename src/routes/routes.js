/* ============
 * 路由总入口
 * ============
 */

// import baseRoutes from './base';
// 首页
import homeRoutes from './home';
// 登录
import loginRoutes from './login';
// 管理员
import adminRoutes from './admin';

const routes = [
  ...homeRoutes,
  ...loginRoutes,
  ...adminRoutes,
];

// 防止baseRoutes被淹灭，放最后了
export default [
  ...routes,
  // ...baseRoutes,
];
