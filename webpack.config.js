const path = require('path');
const webpack = require('webpack');
const ngToolsWebpack = require('@ngtools/webpack');

const ENV = process.env.npm_lifecycle_event;
const isTest = ENV.includes('test');

module.exports = (() => {
  const config = {
    devtool: 'source-map',
    entry: {
      'module': './src/index.ts',
    },
    output: isTest ? {} : {
      path: path.resolve('dist/bundles'),
      filename: '[name].js',
      publicPath: '/',
      filename: 'index.js',
      libraryTarget: 'umd',
      library: 'ng-on-rest',
    },
    externals: isTest ? [] : [/^\@angular\//],
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          options: isTest ? {} : {
            compilerOptions: {
              declaration: false,
              sourceMap: false,
            },
          },
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    plugins: [
      new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)@angular/, path.resolve(__dirname, './src')),
    ],
  };

  if (isTest) {
    config.module.rules.push({
      test: /\.ts$/,
      include: path.resolve('src'),
      loader: 'istanbul-instrumenter-loader',
      query: {
        esModules: true,
      },
      enforce: 'post',
      exclude: [/\.spec\.ts$/, /node_modules/, /test/],
    });
  } else {
    config.plugins.push(new ngToolsWebpack.AotPlugin({
      tsConfigPath: path.resolve('tsconfig.json'),
      entryModule: path.resolve('src/index#NgOnRestModule'),
    }));
  }

  return config;
})();
