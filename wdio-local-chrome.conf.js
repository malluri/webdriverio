const merge = require('deepmerge');
const path = require('path');
// Uncomment below to enable video reporting
// const video = require('wdio-video-reporter');
const wdioConf = require('./wdio.conf').config;

const downloadDir = path.join(__dirname, 'tempDownload');
exports.config = merge(wdioConf, {
  // NOTE: Replace version with a version of Chrome driver that is compatible with your Chrome browser
  seleniumInstallArgs: {
    drivers: {
      chrome: {
        version: '86.0.4240.22',
        arch: process.arch,
        baseURL: 'https://chromedriver.storage.googleapis.com',
      },
    },
  },
  seleniumArgs: {
    drivers: {
      chrome: {
        version: '86.0.4240.22',
        arch: process.arch,
      },
    },
  },
  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': {
      w3c: false,
      useAutomationExtension: false,
      // args: ['--window-size=1280,800'],
      args: ['--headless', '--no-sandbox', '--disable-dev-shm-usage', '--window-size=1280,800'],
      prefs: {
        directory_upgrade: true,
        prompt_for_download: false,
        'download.default_directory': downloadDir,
      },
    },
  }],
  // Uncomment below to enable video reporting
  /*
  reporters: [
    [video, {
      saveAllVideos: false, // If true, also saves videos for successful test cases
      videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
      videoRenderTimeout: 5, // Max seconds to wait for a video to finish rendering
      outputDir: './video',
    }],
  ],
   */
}, { clone: false });
