module.exports = {
  chainWebpack: config => config.optimization.minimize(false),
  productionSourceMap: true,
  lintOnSave: false,
  configureWebpack: {
    mode: 'production',
    devServer: {
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      disableHostCheck: true,
      sockPort: 8507,
      sockHost: "localhost",
      // https: true,
      port: 8507
    },
    externals: ["vue", "vue-router", /^@vue-mf\/.+/]
  },
  filenameHashing: false,
};
