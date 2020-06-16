/* ============
 * Mutations for the auth module
 * ============
 */
import {
  getPureItem,
  setItem,
  removeItemAll,
} from '@/utils/storage';
import {
  CHECK,
  REGISTER,
  LOGIN,
  LOGOUT,
} from './mutation-types';

export default {
  /**
   * 重新验证是否登录
   * @param {Object} state   当前模块的状态
   */
  [CHECK](state) {
    state.authenticated = !!getPureItem('token');
  },
  /**
   * 注册，功能预留
  */
  [REGISTER]() {
  },
  /**
   * 登录
   * @param {Object} state   当前模块的状态
   * @param {Object} token   登录返回的token
   */
  [LOGIN](state, data) {
    // 先全清掉
    removeItemAll();
    state.authenticated = true;
    /**
     * personalSpaceUrl 个人空间地址
     * headerImgId 头像文件id
     * classId 班级id
     */
    for (const key in data) {
      setItem(key, data[key]);
    }
    state.userInfo = data;
  },
  /**
   * 注销
   * @param {Object} state   当前模块的状态
   */
  [LOGOUT](state) {
    state.authenticated = false;
  },
};
