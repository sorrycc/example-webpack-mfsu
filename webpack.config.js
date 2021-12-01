const webpack = require('webpack');
const { MFSU } = require('@umijs/mfsu');

const mfsu = new MFSU({
  implementor: webpack,
  buildDepWithESBuild: {},
});

const config = {
  entry: {
    main: [__dirname + '/src/main.tsx']
  },
  mode: 'development',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    onBeforeSetupMiddleware(devServer) {
      for (const middleware of mfsu.getMiddlewares()) {
        devServer.app.use(middleware);
      }
    }
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            plugins: [
              ...mfsu.getBabelPlugins()
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new (require('html-webpack-plugin'))({
      template: __dirname + '/index.html'
    })
  ],
  stats: {
    assets: false,
    moduleAssets: false,
    runtime: false,
    runtimeModules: false,
    modules: false,
    entrypoints: false,
  },
  experiments: {
    topLevelAwait: true,
  }
};

mfsu.setWebpackConfig({
  config,
});

module.exports = config;
