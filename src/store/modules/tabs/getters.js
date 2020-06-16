/* ============
 * Getters for the account module
 * ============
 *
 * The getters that are available on the
 * account module.
 */
import {
  getMenuByRouter,
} from '@/utils/tools';
import routers from '@/routes/routes';

export default {
  menuList: (state, getters, rootState) => getMenuByRouter(routers, rootState.user.access),
  errorCount: state => state.errorList.length,
};
