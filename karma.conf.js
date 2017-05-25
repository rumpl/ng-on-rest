var webpackConfig = require('./webpack.config');

module.exports = (cfg) => {
  var config = {
    autoWatch: false,
    basePath: '',
    browserDisconnectTolerance: 2,
    browserNoActivityTimeout: 100000,
    browsers: ['Chrome'],
    colors: true,
    coverageReporter: {
      dir: 'coverage/',
      reporters: [{
        dir: 'coverage',
        file: 'coverage-final.json',
        subdir: 'json',
        type: 'json',
      }],
    },
    exclude: [],
    files: [
      { pattern: './karma-shim.js', watched: false },
    ],
    frameworks: ['jasmine'],
    logLevel: cfg.LOG_INFO,
    port: 9876,
    preprocessors: {
      './karma-shim.js': ['webpack', 'sourcemap'],
    },
    remapIstanbulReporter: {
      reports: {
        html: 'coverage/html',
        lcovonly: 'coverage/json/lcov.info',
        'text': null,
      },
      src: 'coverage/json/coverage-final.json',
      timeoutNoMoreFiles: 1000,
      timeoutNotCreated: 1000,
    },
    reporters: ['mocha', 'coverage', 'karma-remap-istanbul'],
    singleRun: true,
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: 'errors-only',
    },
  };

  cfg.set(config);
};
