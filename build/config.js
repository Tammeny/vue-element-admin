// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var argument = process.argv[2];
console.info('打包成子目录', argument || '否');

module.exports = {
  // 配置文件目录
  configDirectory: 'static/config',
  // 不同环境下的配置文件
  configFile: {
    dev: 'dev.config.js',
    test: 'test.config.js',
    pre: 'pre.config.js',
    prod: 'prod.config.js',
  },
  build: {
    env: {
      NODE_ENV: '"production"'
    },
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    // 如果构建命令含有sub参数，则将其值设为子目录名
    assetsPublicPath: argument ? `/${argument.split('sub=')[1]}/` : '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: {
      NODE_ENV: '"development"'
    },
    port: 3001,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
