module.exports = {
  chainWebpack: config => config.optimization.minimize(false),
  lintOnSave: false,
  configureWebpack: {
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
