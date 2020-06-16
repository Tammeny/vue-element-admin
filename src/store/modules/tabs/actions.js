/* ============
 * Actions for the account module
 * ============
 *
 * The actions that are available on the
 * account module.
 */

// import Transformer from '@/transformers/AccountTransformer';
// import * as types from './mutation-types';

export const addErrorLog = ({ commit, rootState }, info) => {
  if (!window.location.href.includes('error_logger_page')) {
    commit('setHasReadErrorLoggerStatus', false);
  }
  const { user: { token, userId, userName } } = rootState;
  const data = {
    ...info,
    time: Date.parse(new Date()),
    token,
    userId,
    userName,
  };
  // 将错误传到后台
  commit('addError', data);
  // saveErrorLogger(info).then(() => {
  //   commit('addError', data);
  // });
};

export default {
  addErrorLog,
};
