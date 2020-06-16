## 介绍
基于vue element-ui的多标签后台管理脚手架

## 运行
安装依赖 `npm install` 或 `yarn install`；
启动服务 `npm start`。

## 构建
可添加sub参数构建用于子目录的部署包。如执行`npm run build -- sub=manage`，则可将包部署到服务器名为manage的子目录下。
- `npm run dev`：构建开发环境代码
- `npm run test`：构建测试环境代码
- `npm run pre`：构建售前环境代码
- `npm run build`：构建生产环境代码
- `npm run lint`：运行eslint并报告代码中的任何linting错误。
- `npm run mock`：启动mock服务。

## 项目结构
```
.
├── build             // webpack配置
├── dist              // 打包输出目录
├── index.html        // 首页模板
├── README.md         // 项目总体说明
├── style-guide.md    // 编码规范
├── src
│   ├── App.vue       // 主应用程序组件
│   ├── assets        // 静态资源，将由webpack处理
│   ├── components    // 组件，项目里所有的组件应该放到此文件夹
│   ├── constants     // 常量，如菜单数组
│   ├── directives    // 指令
│   ├── filters       // 过滤器
│   ├── icons         // 字体图标库
│   ├── locale        // 国际化，预留模块
│   ├── main.js       // 入口文件
│   ├── mixins        // 要与Vue一起使用的mixin将放在此目录中
│   ├── mock          // mock数据
│   ├── pages         // 页面组件
│   ├── proxies       // 对接口请求的封装
│   ├── routes        // 路由
│   ├── store         // vuex
│   ├── theme         // 主题样式
│   ├── transformers  // 转换器用于转换传入和传出请求
│   └── utils         // 工具方法，可以包含filter
├── static            // 静态资源，不需由webpack处理，包含接口配置，第三方插件等
│   ├── config        // 不同环境下的配置
│   ├── plugins       // 插件
└── test              // 测试

```

## 技术栈
- **Vue**，渐进式 JavaScript 框架。
- **Webpack**，一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。
- **ES6**，添加了一系列新的语言特性，其中一些特性比其它更具有开创性以及更广的可用性，有助于提高开发效率。
- **Axios**，一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。它支持Promise API、拦截请求和响应、转换请求数据和响应数据、取消请求、自动转换 JSON 数据、客户端支持防御 XSRF等。
- **Sass**，对 CSS 的扩展，让 CSS 语言更强大、优雅。 它允许你使用变量、嵌套规则、mixins、导入等众多功能，并且完全兼容 CSS 语法。Sass有助于保持大型样式表结构良好，同时也让你能够快速开始小型项目。
- **Element-UI**，一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库。
- **XSS**，使用[js-xss](https://github.com/leizongmin/js-xss)开源库，xss是一个用于过滤用户输入以防止XSS攻击的模块。
- **Crypto**，使用[crypto.js](https://github.com/brix/crypto-js)，js标准加密库，支持多种加密方式。
