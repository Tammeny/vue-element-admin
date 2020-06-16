/* ============
 * Mutations for the account module
 * ============
 *
 * The mutations that are available on the
 * account module.
 */

// import { FIND } from './mutation-types';
import Vue from 'vue';
import {
  getBreadCrumbList,
  setTagNavListInLocalstorage,
  getTagNavListFromLocalstorage,
  getHomeRoute,
  getNextRoute,
  routeHasExist,
  routeEqual,
  getRouteTitleHandled,
  localSave,
} from '@/utils/tools';

const closePage = (state, route) => {
  const nextRoute = getNextRoute(state.tagNavList, route);
  state.tagNavList = state.tagNavList.filter(item => !routeEqual(item, route));
  Vue.router.push(nextRoute);
};

export default {
  setBreadCrumb(state, route) {
    state.breadCrumbList = getBreadCrumbList(route, state.homeRoute);
  },
  setHomeRoute(state, routes) {
    state.homeRoute = getHomeRoute(routes, 'home.index');
  },
  setTagNavList(state, list) {
    let tagList = [];
    if (list) {
      tagList = [...list];
    } else tagList = getTagNavListFromLocalstorage() || [];
    if (tagList[0] && tagList[0].name !== 'home.index') tagList.shift();
    const homeTagIndex = tagList.findIndex(item => item.name === 'home.index');
    if (homeTagIndex > 0) {
      const homeTag = tagList.splice(homeTagIndex, 1)[0];
      tagList.unshift(homeTag);
    }
    state.tagNavList = tagList;
    setTagNavListInLocalstorage([...tagList]);
  },
  closeTag(state, route) {
    const tag = state.tagNavList.filter(item => routeEqual(item, route));
    route = tag[0] ? tag[0] : null;
    if (!route) return;
    closePage(state, route);
  },
  addTag(state, { route, type = 'unshift' }) {
    const routerItem = getRouteTitleHandled(route);
    if (!routeHasExist(state.tagNavList, routerItem)) {
      if (type === 'push') state.tagNavList.push(routerItem);
      else {
        if (routerItem.name === 'home.index') state.tagNavList.unshift(routerItem);
        else state.tagNavList.splice(1, 0, routerItem);
      }
      setTagNavListInLocalstorage([...state.tagNavList]);
    }
  },
  setLocal(state, lang) {
    localSave('local', lang);
    state.local = lang;
  },
  addError(state, error) {
    state.errorList.push(error);
  },
  setHasReadErrorLoggerStatus(state, status = true) {
    state.hasReadErrorPage = status;
  },
};
