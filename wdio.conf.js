/* eslint-disable no-unused-vars,no-console,object-shorthand,import/no-extraneous-dependencies,global-require */
const fs = require('fs');
const moment = require('moment');

// uncomment to enable Allure HTML reporting
// const allure = require('allure-commandline');

exports.config = {
    /**
     * The number of times to retry the entire specfile when it fails as a whole
     */
    specFileRetries: 0,
    /**
     * Retried specfiles are inserted at the beginning of the queue and retried immediately
     */
    specFileRetriesDeferred: false,
    /**

     /**
     ====================
     Runner Configuration
     ====================

     WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
     on a remote machine).
     */
    runner: 'local',
    /**
     ==================
     Specify Test Files
     ==================
     Define which test specs should run. The pattern is relative to the directory
     from which `wdio` was called. Notice that, if you are calling `wdio` from an
     NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
     directory is where your package.json resides, so `wdio` will be called from there.
     */

    specs: ['.test/specs/*.spec.js'],
    /** Patterns to exclude. */
    exclude: [
        /** 'path/to/excluded/files' */
    ],

    suites: {
        allTests:[
            './test/specs/employee.spec.js',
            './test/specs/info.spec.js',
            './test/specs/systemUser.spec.js',
        ],

    },
    // Custom variables
    username: 'Admin',
    password: 'admin123',
    waitForElementTimeout: 9000,
    // Default timeout for all modal in utils

    /**
     ============
     Capabilities
     ============
     Define your capabilities here. WebdriverIO can run multiple capabilities at the same
     time. Depending on the number of capabilities, WebdriverIO launches several test
     sessions. Within your capabilities you can overwrite the spec and exclude options in
     order to group specific specs to a specific capability.

     First, you can define how many instances should be started at the same time. Let's
     say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
     set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
     files and you set maxInstances to 10, all spec files will get tested at the same time
     and 30 processes will get spawned. The property handles how many capabilities
     from the same test should run tests.
     */
    maxInstances: 1,
    /**
     ===================
     Test Configurations
     ===================
     Define all options that are relevant for the WebdriverIO instance here

     Level of logging verbosity: trace | debug | info | warn | error
     */
    logLevel: 'info',
    outputDir: './logs',
    logLevels: {
        webdriver: 'info',
        '@wdio/applitools-service': 'info',
    },

    /** Warns when a deprecated command is used */
    deprecationWarnings: true,
    /**
     If you only want to run your tests until a specific amount of tests have failed use
     bail (default is 0 - don't bail, run all tests).
     */
    bail: 0,
    /**
     Set a base URL in order to shorten url command calls. If your `url` parameter starts
     with `/`, the base url gets prepended, not including the path portion of your baseUrl.
     If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
     gets prepended directly.
     */
    baseUrl: '',
    apiUrl: '',
    wdioToken: '',

    /** Default timeout for all waitFor* commands. */
    waitforTimeout: 30000,
    waitforTimeoutForUpgrade: 300000,

    /**
     Default timeout in milliseconds for request
     if Selenium Grid doesn't send response
     */
    connectionRetryTimeout: 60000,

    /** Default request retries count */
    connectionRetryCount: 1,
    /**
     Test runner services
     Services take over a specific job you don't want to take care of. They enhance
     your test setup with almost no effort. Unlike plugins, they don't add new
     commands. Instead, they hook themselves up into the test process.
     */
    services: ['selenium-standalone'],
    /**
     Framework you want to run your specs with.
     The following are supported: Mocha, Jasmine, and Cucumber
     see also: https://webdriver.io/docs/frameworks.html

     Make sure you have the wdio adapter package for the specific framework installed
     before running any tests.
     */
    framework: 'jasmine',
    /**
     Test reporter for stdout.
     The only one supported by default is 'dot'
     see also: https://webdriver.io/docs/dot-reporter.html
     */
    reporters: [
        'dot',
        'spec',
        [
            'junit',
            {
                outputDir: './test_results',
                outputFileFormat(options) {
                    const timeStamp = moment().format('YYYYMMDD-hhmmss');
                    return `${timeStamp}_test_results.xml`;
                },
                errorOptions: {
                    error: 'message',
                    failure: 'message',
                    stacktrace: 'stack',
                },
            },
        ],
        // uncomment to enable Allure HTML reporting
        /*
        ['allure', {
          outputDir: 'allure-results',
          // Set this to false locally to get screenshot in the Allure report
          disableWebdriverScreenshotsReporting: true,
        }],
        */
    ],

    /**
     Options to be passed to Jasmine, we are passing the defaultTimeoutInterval
     */

    jasmineNodeOpts: {
        defaultTimeoutInterval: 90000,
    },

    /**
     Gets executed once before all workers get launched.
     @param {Object} config wdio configuration object
     @param {Array.<Object>} capabilities list of capabilities details
     */
    onPrepare(config, capabilities) {
        const dir = './logs';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        const testDir = './test_results';
        if (!fs.existsSync(testDir)) {
            fs.mkdirSync(testDir);
        }

        const downDir = './tempDownload';
        if (!fs.existsSync(downDir)) {
            fs.mkdirSync(downDir);
        }
    },

    // uncomment to enable Allure HTML reporting
    /*
    onComplete: function () {
      const reportError = new Error('Could not generate Allure report');
      const generation = allure(['generate', 'allure-results', '--clean']);
      return new Promise((resolve, reject) => {
        const generationTimeout = setTimeout(() => { reject(reportError); }, 5000);

        generation.on('exit', (exitCode) => {
          clearTimeout(generationTimeout);

          if (exitCode !== 0) {
            return reject(reportError);
          }

          console.log('Allure report successfully generated');
          resolve();
          return null;
        });
      });
    },
    */

    /**
     before function for the start of the execution
     */
    before: function () {
        require('@babel/register'); // eslint-disable-line import/no-unresolved
        const CurrentTestCaseReporter = require('./current-test-case-reporter.js');
        jasmine.getEnv().addReporter(new CurrentTestCaseReporter());

        browser.addCommand('blur', function () {
            browser.execute((domElement) => {
                domElement.blur();
            }, this);
        }, true);
    },

    /**
     Function to be executed after a test Jasmine
     Capturing the screenshot on the failure of test cases
     */
    afterTest(test) {
        if (!test.passed) {
            const dir = './test_results/screenshot';
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
                fs.chmodSync(dir, 0o777);
            }
            const testName = test.fullTitle;
            browser.takeScreenshot();
            const timestamp = moment().format('YYYYMMDD-hhmmss');
            const fileName = `${dir}/${testName}.${timestamp}.png`;
            browser.saveScreenshot(fileName);
            console.log(`Saved screenshot "${fileName}" `);
        }
    },
};
