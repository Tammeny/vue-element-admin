/* ============
 * Axios
 * ============
 *
 * Promise based HTTP client for the browser and node.js.
 * 用作执行ajax请求.
 *
 * https://github.com/mzabriskie/axios
 */

import Vue from 'vue';
import Axios from 'axios';
import Store from '@/store';
import { Message } from 'element-ui';
import qs from 'qs';
import { getItem } from '@/utils/storage';

// 默认接口地址
const api = window.API_CONFIG['api'];
const defaultDataType = 'application/x-www-form-urlencoded;charset=UTF-8';
const jsonType = 'application/json;charset=UTF-8';
// 判断接口请求是否成功的key
const codeKey = 'retCode';
// 判断接口请求是否成功的code
const successCode = '000000';
// 判断是否需要重新登录的code
const reloginCode = '110008';
// 超时时间
Axios.defaults.timeout = 5 * 60 * 1000;

/**
 * 根据模块获取api地址
 * @param {Object} config axios配置项
 * @param {String} moduleType 模块名称
 * @returns {String} 完整的apiurl
 */
const setRequestUrl = (config) => {
  let newApi = '';
  if (!config.moduleType) {
    newApi = api;
  } else {
    switch (config.moduleType) {
      case 'api':
        newApi = window.API_CONFIG['api'];
        break;
      default:
        break;
    }
  }
  return newApi + config.url;
};

Axios.interceptors.request.use(
  (config) => {
    if (config.url.substr(0, 1) !== '/') {
      config.url = `/${config.url}`;
    }
    if (config.url !== '/login') {
      const token = getItem('token');
      // 都要传的参数
      const commonData = {
        accessToken: token,
      };
      config.headers.accessToken = token;
      if (config.dataType) {
        let requestType = '';
        switch (config.dataType.toLowerCase()) {
          case 'json':
            requestType = jsonType; // json
            break;
          case 'form':
            requestType = defaultDataType; // form
            break;
          default:
            break;
        }
        config.headers['Content-Type'] = requestType;
      }
      if (typeof config.data === 'object' && config.url.indexOf('login') === -1) {
        config.data = Object.assign(
          {},
          commonData,
          config.data,
        );
      }
      if (config.method.toLowerCase() === 'get') {
        config.params = Object.assign(
          {},
          commonData,
          config.params,
        );
      }
      if (
        config.method.toLowerCase() === 'post' &&
        config.headers['Content-Type'] === defaultDataType
      ) {
        config.data = qs.stringify(config.data);
      }
    }
    /* reset请求url 因为api服务器是多个的 放在最后面是为了避免与其他代码出现冲突 */
    // config.url = api + config.url;
    config.url = setRequestUrl(config);
    return config;
  },
  (err) => {
    Message.error({ showClose: true, message: err || '发起请求出错' });
    throw new Error(err || '发起请求出错');
  },
);

/**
 * 响应体拦截器
 */
Axios.interceptors.response.use(
  (res) => {
    const data = res.data;
    const resultCode = data[codeKey];
    if (/^2/.test(res.status) && resultCode === successCode) {
      // 状态码是2开头，并且retCode等于000000则说明成功，这里的字段需要根据接口返回的数据格式来决定
      return data;
    } else if (resultCode === reloginCode) {
      // token invalid
      setTimeout(() => {
        Store.dispatch('auth/logout');
      }, 1000);
    }

    Message.error({ showClose: true, message: data.retDesc || '服务器错误' });
    return Object.assign({}, data, { fail: true });
  },
  (err) => {
    console.log(err);
    if (err.response) {
      Message.error({ showClose: true, message: err.response.data.message || '服务器错误' });
    } else if (err.request) {
      Message.error({ showClose: true, message: '网络环境太差，请稍后再试' });
    } else {
      Message.error({ showClose: true, message: err.response.data.message || '服务器错误' });
    }

    throw new Error(JSON.stringify(err));
  },
);
// 将Axios绑定到Vue
Vue.$http = Axios;
Object.defineProperty(Vue.prototype, '$http', {
  get() {
    return Axios;
  },
});
