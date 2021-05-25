const merge = require('deepmerge');
const path = require('path');

const wdioConf = require('./wdio.conf').config;

const downloadDir = path.join(__dirname, 'tempDownload');

exports.config = merge(wdioConf, {
  seleniumInstallArgs: {
    drivers: {
      chrome: {
        version: '89.0.4389.23',
        arch: process.arch,
        baseURL: 'https://chromedriver.storage.googleapis.com',
      },
    },
  },
  seleniumArgs: {
    drivers: {
      chrome: {
        version: '89.0.4389.23',
        arch: process.arch,
      },
    },
  },
  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': {
      w3c: false,
      useAutomationExtension: false,
      // Since we are using a 'headless' chrome on orca, there is no screen available hence options like
      // --start-maximized and --start-full-screen don't really work as expected. A better option is to
      // explicitly specify the dimensions of the window size as done below.
      args: ['--headless', '--no-sandbox', '--disable-dev-shm-usage', '--window-size=1280,800'],
      prefs: {
        directory_upgrade: true,
        prompt_for_download: false,
        'download.default_directory': downloadDir,
      },
    },
  }],
}, { clone: false });
