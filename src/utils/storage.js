// 获取item
export const getItem = name => decodeURIComponent(sessionStorage.getItem(name));

// 获取纯净item
export const getPureItem = name => sessionStorage.getItem(name);

// 设置item
export const setItem = (name, val = '') => sessionStorage.setItem(name, encodeURIComponent(val));

// 清除item
export const removeItem = name => sessionStorage.removeItem(name);

// 清除所有
export const removeItemAll = () => sessionStorage.clear();

// 获取item--localStorage
export const getLocalItem = name => decodeURIComponent(localStorage.getItem(name));

// 设置item--localStorage
export const setLocalItem = (name, val = '') => localStorage.setItem(name, encodeURIComponent(val));
