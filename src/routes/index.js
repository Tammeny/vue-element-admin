/* ============
 * Vue Router
 * ============
 *
 * The official Router for Vue.js. It deeply integrates with Vue.js core
 * to make building Single Page Applications with Vue.js a breeze.
 *
 * http://router.vuejs.org/en/index.html
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import { setTitle } from '@/utils/tools';
import routes from './routes';

Vue.use(VueRouter);

export const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  const needAuth = to.matched.some(m => m.meta.auth === undefined || m.meta.auth);
  if (needAuth && !store.state.auth.authenticated) {
    next();
  } else {
    next();
  }
});

router.afterEach((to) => {
  setTitle(to, router.app);
  window.scrollTo(0, 0);
});

Vue.router = router;

export default {
  router,
};
