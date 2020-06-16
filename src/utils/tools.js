/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export function hasOneOf(targetarr, arr) {
  return targetarr.some(_ => arr.indexOf(_) > -1);
}

const showThisMenuEle = (item, access) => {
  if (item.meta && item.meta.access && item.meta.access.length) {
    if (hasOneOf(item.meta.access, access)) return true;
    else return false;
  } else return true;
};

export const hasChild = item => item.children && item.children.length !== 0;

export function forEach(arr, fn) {
  if (!arr.length || !fn) return;
  let i = -1;
  const len = arr.length;
  while (i < len) {
    fn(arr[i], i, arr);
    i += 1;
  }
}

export function showTitle(item) {
  const { title } = item.meta;
  if (item.query && item.query.name) {
    return item.query.name;
  }
  return title ? (item.meta && item.meta.title) || item.name : '';
}

/**
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */
export function doCustomTimes(times, callback) {
  let i = 0;
  while (i < times) {
    callback(i);
    i += 1;
  }
}

export function localSave(key, value) {
  localStorage.setItem(key, value);
}

export function localRead(key) {
  return localStorage.getItem(key) || '';
}

/**
 * @param {*} obj1 对象
 * @param {*} obj2 对象
 * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
 */
export function objEqual(obj1, obj2) {
  const keysArr1 = Object.keys(obj1);
  const keysArr2 = Object.keys(obj2);
  if (keysArr1.length !== keysArr2.length) {
    return false;
  } else if (keysArr1.length === 0 && keysArr2.length === 0) {
    return true;
  }
  return !keysArr1.some(key => obj1[key] !== obj2[key]);
}

/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
export function routeEqual(route1, route2) {
  const params1 = route1.params || {};
  const params2 = route2.params || {};
  const query1 = route1.query || {};
  const query2 = route2.query || {};
  return (route1.name === route2.name) && objEqual(params1, params2) && objEqual(query1, query2);
}

/**
 * @description 本地存储和获取标签导航列表
 */
export function setTagNavListInLocalstorage(list) {
  localStorage.tagNaveList = JSON.stringify(list);
}

/**
 * 判断打开的标签列表里是否已存在这个新添加的路由对象
 */
export function routeHasExist(tagNavList, routeItem) {
  const len = tagNavList.length;
  let res = false;
  doCustomTimes(len, (index) => {
    if (routeEqual(tagNavList[index], routeItem)) res = true;
  });
  return res;
}

/**
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则不再添加
 */
export function getNewTagList(list, newRoute) {
  const { name, path, meta } = newRoute;
  const newList = [...list];
  if (newList.findIndex(item => item.name === name) >= 0) return newList;
  else newList.push({ name, path, meta });
  return newList;
}

/**
 * @param {Array} routers 路由列表数组
 * @description 用于找到路由列表中name为home的对象
 */
export function getHomeRoute(routers, homeName = 'home.index') {
  let i = 0;
  const len = routers.length;
  let homeRoute = {};
  while (i < len) {
    const item = routers[i];
    if (item.children && item.children.length) {
      const res = getHomeRoute(item.children, homeName);
      if (res.name) return res;
    } else {
      if (item.name === homeName) homeRoute = item;
    }
    i += 1;
  }
  return homeRoute;
}

/**
 * @param {Array} list 标签列表
 * @param {String} name 当前关闭的标签的name
 */
export function getNextRoute(list, route) {
  let res = {};
  if (list.length === 2) {
    res = getHomeRoute(list);
  } else {
    const index = list.findIndex(item => routeEqual(item, route));
    if (index === list.length - 1) res = list[list.length - 2];
    else res = list[index + 1];
  }
  return res;
}

/**
 * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
 */
export function getTagNavListFromLocalstorage() {
  const list = localStorage.tagNaveList;
  return list ? JSON.parse(list) : [];
}

/**
 * @param {Array} list 通过路由列表得到菜单列表
 * @returns {Array}
 */
export function getMenuByRouter(list, access) {
  const res = [];
  forEach(list, (item) => {
    if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
      const obj = {
        icon: (item.meta && item.meta.icon) || '',
        name: item.name,
        meta: item.meta,
      };
      if ((hasChild(item) || (item.meta && item.meta.showAlways))
        && showThisMenuEle(item, access)) {
        obj.children = getMenuByRouter(item.children, access);
      }
      if (item.meta && item.meta.href) obj.href = item.meta.href;
      if (showThisMenuEle(item, access)) res.push(obj);
    }
  });
  return res;
}

/**
 * @param {Array} routeMetched 当前路由metched
 * @returns {Array}
 */
export function getBreadCrumbList(route, homeRoute) {
  const homeItem = { ...homeRoute, icon: homeRoute.meta.icon };
  const routeMetched = route.matched;
  if (routeMetched.some(item => item.name === homeRoute.name)) return [homeItem];
  let res = routeMetched.filter(item => item.meta === undefined
      || !item.meta.hideInBread).map((item) => {
        const meta = { ...item.meta };
        if (meta.title && typeof meta.title === 'function') {
          meta.titleIsFunction = true;
          meta.title = meta.title(route);
        }
        const obj = {
          icon: (item.meta && item.meta.icon) || '',
          name: item.name,
          meta: meta,
        };
        return obj;
      });
  res = res.filter(item => !item.meta.hideInMenu);
  return [{ ...homeItem, to: homeRoute.path }, ...res];
}

export function getRouteTitleHandled(route) {
  const router = { ...route };
  const meta = { ...route.meta };
  let title = '';
  if (meta.title) {
    if (typeof meta.title === 'function') {
      meta.titleIsFunction = true;
      title = meta.title(router);
    } else title = meta.title;
  }
  meta.title = title;
  router.meta = meta;
  return router;
}

/**
 * @description 根据当前跳转的路由设置显示在浏览器标签的title
 * @param {Object} routeItem 路由对象
 * @param {Object} vm Vue实例
 */
export function setTitle(routeItem, vm) {
  const handledRoute = getRouteTitleHandled(routeItem);
  const pageTitle = showTitle(handledRoute, vm);
  const resTitle = pageTitle || '';
  window.document.title = resTitle;
}
