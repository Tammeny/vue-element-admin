/**
 * 读写cookie工具
 */
const cookie = {
  // 写cookies
  setCookie(name, value) {
    const days = 1;
    const exp = new Date();
    exp.setTime(exp.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie =
      `${name}=${escape(value)};expires=${exp.toGMTString()}`;
  },
  // 读取cookies
  readCookie(name) {
    let arr = null;
    const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
    arr = document.cookie.match(reg);
    if (document.cookie && arr) {
      return unescape(arr[2]);
    } else {
      return null;
    }
  },
  // 删除cookies
  delCookie(name) {
    const cval = this.readCookie(name);
    if (cval != null) {
      document.cookie =
        `${name}=${cval};expires=${new Date(0).toGMTString()}`;
    }
  },
};

export default cookie;
