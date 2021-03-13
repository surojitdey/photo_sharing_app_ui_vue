const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.BASE_URL,
  outputDir: './photo_sharing_app/',
  runtimeCompiler: true,

  devServer: {
    public: 'localhost:8080',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },

  configureWebpack: {
    plugins: [
      new BundleTracker({ path: __dirname, filename: 'webpack-stats.json' })
    ]
  }
}
