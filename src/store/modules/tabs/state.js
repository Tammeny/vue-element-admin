/* ============
 * State of the account module
 * ============
 *
 * The initial state of the account module.
 */
import { localRead } from '@/utils/tools';

export default {
  breadCrumbList: [],
  tagNavList: [],
  homeRoute: {},
  local: localRead('local'),
  errorList: [],
  hasReadErrorPage: false,
};
