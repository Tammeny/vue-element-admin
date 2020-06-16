/* ============
 * Mutations for the system module
 * ============
 */
import { setItem } from '@/utils/storage';
import {
  FIND,
} from './mutation-types';


export default {
  /**
   * 系统信息
   * @param {Object} state   当前模块的状态
   * @param {Object} data   系统细心
   */
  [FIND](state, data) {
    state.systemInfo = data;
    setItem('logoFileId', data.logoFileId); // 用sessionStorage会失效 不知道谁重置了session
    setItem('consoleLogoId', data.consoleLogoId);
  },
};
