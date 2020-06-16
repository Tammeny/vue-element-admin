export default {
  // 电话
  phone: (rule, value, callback) => {
    if (!value) {
      return callback(new Error('电话不能为空'));
    }

    if (/^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?|((1[3,4,5,7,8,9])\d{9})$/.test(value)) {
      return callback();
    }
    return callback(new Error('电话号码格式不正确'));
  },
  // 固话
  telephone: (rule, value, callback) => {
    if (!value) {
      return callback(new Error('联系电话不能为空'));
    }

    if (/^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/.test(value)) {
      return callback();
    }
    return callback(new Error('联系电话不正确'));
  },
  // 移动电话
  cellphone: (rule, value, callback) => {
    if (!value) {
      return callback(new Error('手机号码不能为空'));
    }

    if (/^(1[3,4,5,7,8,9])\d{9}$/.test(value)) {
      return callback();
    }
    return callback(new Error('手机号码格式不正确'));
  },
  // 密码校验-通用
  password: (rule, value, callback) => {
    if (!value) {
      return callback(new Error('密码不能为空'));
    }

    return callback();

    // if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,16}$/.test(value)) {
    //   return callback();
    // }
    // return callback(new Error('密码由4-16位字母和数字的混合组成，且区分大小写'));
  },
  // 密码校验-自定义
  passwordCustom: (rule, value, callback) => {
    if (!value) {
      return callback(new Error('密码不能为空'));
    }

    if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,16}$/.test(value)) {
      if (value === 'Password1') {
        return callback(new Error('自定义密码不能为系统默认密码Password1'));
      }
      return callback();
    }
    return callback(new Error('密码由4-16位字母和数字的混合组成，且区分大小写'));
  },
  // 身份证校验
  idCard: (rule, value, callback) => {
    if (!value) {
      return callback(new Error('身份证号不能为空'));
    }
    if (/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(value)) {
      return callback();
    }
    return callback(new Error('请输入正确的身份证号码'));
  },
  // 账号校验
  account: (rule, value, callback) => {
    if (!value) {
      return callback(new Error('账号不能为空'));
    }

    if (/^[A-Za-z0-9]{6,18}$/.test(value)) {
      return callback();
    }
    return callback(new Error('不要输入空格或特殊字符'));
  },

  // 学号校验
  studentNum: (rule, value, callback) => {
    if (!value) {
      return callback(new Error('学号不能为空'));
    }

    if (/^(?![a-zA-Z]+$)[0-9A-Za-z]{1,18}$/.test(value)) {
      return callback();
    }
    return callback(new Error('学号只允许输入纯数字或数字字母混合'));
  },

  // 名称校验
  name: (rule, value, callback) => {
    // 20位
    if (!value && rule.required) {
      return callback(new Error('名称不能为空'));
    }

    if (/^[0-9A-Za-z_\u4e00-\u9fa5]{0,20}$/.test(value)) {
      return callback();
    }
    return callback(new Error('名称仅可输入中/英文/_'));
  },

  // 名称校验
  name_32: (rule, value, callback) => {
    // 32位
    if (!value && rule.required) {
      return callback(new Error('姓名不能为空'));
    }

    if (/^[A-Za-z_\u4e00-\u9fa5]{0,32}$/.test(value)) {
      return callback();
    }
    return callback(new Error('姓名仅可输入中文、英文、"_"'));
  },

  // 中/英文/数字
  numeric_alphabet_Chinese: (rule, value, callback) => {
    if (!value && rule.required) {
      return callback(new Error('不能为空'));
    }

    if (/^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(value)) {
      return callback();
    }
    return callback(new Error('仅可输入中文/英文/数字'));
  },
  // 合法的域名
  validateURL: (rule, value, callback) => {
    if (!value && rule.required) {
      return callback(new Error('URL不能为空'));
    }

    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    if (urlregex.test(value)) {
      return callback();
    } else {
      if (value) {
        return callback(new Error('请输入正确的域名'));
      }
      return callback();
    }
  },
  // 18位 数字字母
  numeric_alphabet: (rule, value, callback) => {
    const reg = /^[A-Za-z0-9]{18}$/;
    if (reg.test(value)) {
      return callback();
    } else {
      return callback(new Error('请输入18位 数字/字母'));
    }
  },
};
