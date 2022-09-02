const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api/': {
        target: 'http://localhost:3000',
        // target: 'http://39.108.147.245:3000',
        changeOrigin: true,
        ws: false
      }
    }
  }
})
// module.exports = {
//   assetsDir: 'static',
//   parallel: false,
//   publicPath: './'
// }
