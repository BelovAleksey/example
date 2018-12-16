exports.config = {
  specs: [
    //'./specs/checkInitialState.spec.ts',
    './specs/checkFunctionality.spec.ts',
  ],
  maxInstances: 1,
  host: 'localhost',
  services: ['selenium-standalone'],
  capabilities: [
    {
      browserName: 'chrome',
      chromeOptions: {
        args: ['--window-size=1920,1080'],
      },
    },
  ],

  sync: true,
  //
  // Level of logging verbosity: silent | verbose | command | data | result | error
  logLevel: 'silent',
  //
  // Enables colors for log output.
  coloredLogs: true,
  //
  // Warns when a deprecated command is used
  deprecationWarnings: true,
  //
  // If you only want to run your tests until a specific amount of tests have failed use
  // bail (default is 0 - don't bail, run all tests).
  bail: 0,
  //
  // Saves a screenshot to a given path if a command fails.
  screenshotPath: 'allure-results',

  baseUrl: '',
  //
  // Default timeout for all waitFor* commands.
  waitforTimeout: 60000,
  reporters: ['spec', 'allure'],
  // Some reporters require additional information which should get defined here
  reporterOptions: {
    allure: {
      outputDir: 'allure-results',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: false,
    },
  },
  //
  // Default timeout in milliseconds for request
  // if Selenium Grid doesn't send response
  connectionRetryTimeout: 90000,
  //
  // Default request retries count
  connectionRetryCount: 3,
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    compilers: ['ts:ts-node/register'],
    timeout: 75000,
  },
  beforeSession: function() {
    const fs = require('fs');
    const allureResultsDir = 'allure-results';
    fs.readdir(allureResultsDir, (err, files) => {
      if (err) throw err;
      for (const file of files) {
        fs.unlink(process.env.PWD.concat('/', allureResultsDir, '/', file), err => {
          if (err) throw err;
        });
      }
    });
  },
};
