const path = require("path");

module.exports = {
  // 代码部署路径
  publicPath: process.env.NODE_ENV === "production" ? "" : "/",
  outputDir: process.env.NODE_ENV === "production" ? "dist" : "devDist",
  assetsDir: "static",
  lintOnSave: false,
  //loader配置
  chainWebpack: (config) => {
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
        include: ["./src/icons"],
      });
  },
  configureWebpack: (config) => {
    // console.log(config)
    config.resolve = {
      extensions: [".js", ".json", "vue"],
      alias: {
        //修改vue的指向，从默认的vue.runtime.js改为vue.js,即从运行时模式换成compile模式，从而可以使用Vue.component注册全局组件，如注册svg-icon
        vue: "vue/dist/vue.js",
        "@": path.resolve(__dirname, "./src"),
        public: path.resolve(__dirname, "./public"),
        "@c": path.resolve(__dirname, "./src/components"),
        // 'common': path.resolve(__dirname, './src/common'),
        // 'api': path.resolve(__dirname, './src/api'),
        views: path.resolve(__dirname, "./src/views"),
        // 'data': path.resolve(__dirname, './src/data')
      },
    };
  },
  //生产环境是否配置sourceMap文件
  productionSourceMap: false,
  // css配置
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {
      scss: {
        prependData: `@import "./src/styles/main.scss";`,
      },
    },
    // 为什么会影响到elementui的默认样式了？
    requireModuleExtension: true,
    // 等同于modules: false
  },
  //并行构建，对于babel和ts等，机器多核的情况下
  parallel: require("os").cpus.length > 1,
  pwa: {},
  //webpack-dev-server配置
  devServer: {
    //编译完成是否打开网页
    open: false,
    //指定使用地址，localhost，0.0.0.0代表可以被外界访问
    host: "0.0.0.0",
    port: 8080,
    //编译失败时刷新页面
    https: false,
    hot: true,
    hotOnly: false,
    proxy: {
      "/devApi": {
        target: "http://www.web-jshtml.cn/vue_admin_api",
        changeOrigin: true,
        pathRewrite: {
          "^/devApi": "",
        },
      },
    },
  },
  pluginOptions: {},
};
