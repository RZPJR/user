module.exports = {
  lintOnSave: false,
  configureWebpack: {
    devServer: {
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      disableHostCheck: true,
      sockPort: 8506,
      sockHost: "localhost",
      // https: true,
      port: 8506
    },
    externals: ["vue", "vue-router", /^@vue-mf\/.+/]
  },
  filenameHashing: false
};
