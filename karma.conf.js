// Karma configuration

module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['jspm', 'qunit'],

    //es6 modules
    jspm: {
          loadFiles: ['test/**/*.js'],
          serveFiles: ['src/**/*.js'],

    },
  
    //older browser don't have require elements (es6)
    files: ['vendor/*.js'],
    
    preprocessors: {
      'test/**/*.js': ['6to5'],
      'src/**/*.js': ['6to5']
    },
    '6to5Preprocessor': {
      options: {
        sourceMap: 'inline',
        modules: 'system',
        moduleIds: false
      }
    },

    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    
    browsers: ['Chrome', 'Firefox', 'PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
