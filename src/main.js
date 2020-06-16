/* ============
 * Main File
 * ============
 *
 * Will initialize the application.
 */
import VuexRouterSync from 'vuex-router-sync';
import Vue from 'vue';
// import VCharts from 'v-charts';
import '@/utils';
// import { router } from '@/routes';
import store from '@/store';
import '@/theme/common/index.scss';
import '@/theme/animation/index.scss';
import '@/theme/element-ui';

import './components/index';

import App from './App';
import * as filters from './filters';
import * as tools from './utils/tools';
import * as storage from './utils/storage';

const router = require('./routes').router; // 再加载路由 循序不能改

VuexRouterSync.sync(store, router);

// 注册全局通过过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;
Vue.prototype.$utils = tools; // 全局工具
Vue.prototype.$storage = storage; // 存储

/* eslint-disable no-new */
new Vue({
  /**
   * Bind the Vue instance to the HTML.
   */
  el: '#app',

  /**
   * The router.
   */
  router,

  /**
   * The Vuex store.
   */
  store,

  /**
   * Will render the application.
   *
   * @param {Function} h Will create an element.
   */
  render: h => h(App),
});
