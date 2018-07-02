const path = require('path');
const pxtorem = require('postcss-pxtorem');

const svgSpriteDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''), // antd-mobile 内置svg
  path.resolve(__dirname, 'src/svg/'),  // 业务代码本地私有 svg 存放目录
];

export default {
  entry: 'src/index.js',
  svgSpriteLoaderDirs: svgSpriteDirs,
  "publicPath": "./",
  "theme": "./theme.config.js",
  // 接口代理示例
  // "proxy": {
  //   "/api": {
  //     "target": "http://192.168.1.66:8099",
  //     "changeOrigin": true,
  //     "pathRewrite": { "^/api" : "/" }
  //   },
  // },
  env: {
    development: {
      extraBabelPlugins: [
        'dva-hmr',
        'transform-runtime',
        ['import', { 'libraryName': 'antd-mobile', 'libraryDirectory': 'lib', 'style': true }]
      ],
      extraPostCSSPlugins: [
        pxtorem({
          rootValue: 100,
          propWhiteList: [],
        }),
      ],
    },
    production: {
      extraBabelPlugins: [
        'transform-runtime',
        ['import', { 'libraryName': 'antd-mobile', 'libraryDirectory': 'lib', 'style': true }]
      ],
      extraPostCSSPlugins: [
        pxtorem({
          rootValue: 100,
          propWhiteList: [],
        }),
      ],
    }
  }
}
