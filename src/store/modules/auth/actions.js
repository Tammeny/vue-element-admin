/* ============
 * 权限模块的actions
 * ============
 */

import Vue from 'vue';
import AuthProxy from '@/proxies/auth';
import * as types from './mutation-types';

export const check = ({ commit }) => {
  commit(types.CHECK);
};

/**
 * 注册，此功能预留
 * @param {Function} mutation的commit方法
 */
export const register = ({ commit }) => {
  commit(types.LOGIN, 'RandomGeneratedToken');
  Vue.router.push({
    name: 'home.index',
  });
};


/**
 * 登录
 * @param {Function} commit mutation的commit方法
 * @param {Object} payload  登录请求参数
 */
export const login = async ({ commit }, payload) => {
  const { data } = await new AuthProxy().login(payload);
  commit(types.LOGIN, Object.assign({
    token: data.token,
  }, data));
  Vue.router.push('/home/index');
};

/**
 * 注销
 * @param {Function} commit mutation的commit方法
 */
export const logout = ({ commit }) => {
  commit(types.LOGOUT);
  // Vue.router.push({
  //   name: 'login.index',
  // });
};

export default {
  check,
  register,
  login,
  logout,
};
