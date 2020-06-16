import BaseProxy from './base';

class AuthProxy extends BaseProxy {
  /**
   * 构造函数
   *
   * @param {Object} parameters 请求参数
   */
  constructor(parameters = {}) {
    super('/sso/login', parameters);
  }

  /**
   * 登录
   *
   * @param {String} username 用户名
   * @param {String} password 密码
   * @param {String} code 验证码
   *
   * @returns {Object} 登录结果
   */
  async login({ username, password, imageCode, codeid }) {
    const data = {
      username,
      password,
      imageCode,
      codeid,
    };
    const response = await this.submit('post', `${this.path}`, data);
    return response;
  }

  /**
   * 注册
   *
   * @param {Object} data 注册信息
   *
   * @returns {Object} 注册结果
   */
  async register(data) {
    const response = await this.submit('post', `${this.path}/register`, data);
    return response;
  }
}

export default AuthProxy;
