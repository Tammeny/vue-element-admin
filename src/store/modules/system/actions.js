/* ============
 * 系统信息的actions
 * ============
 */

// import CommonProxy from '@/proxies/common';
import * as types from './mutation-types';

/**
 * 获取系统信息
 * @param {Function} commit mutation的commit方法
 */
export const find = async ({ commit }) => {
  // const res = await CommonProxy.getSystemInfo();
  commit(types.FIND, {});
};

export default {
  find,
};
