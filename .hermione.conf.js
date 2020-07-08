const path = require('path');
global.assert = require('chai').assert;

const GRID_USERNAME = process.env.GRID_USERNAME;
const GRID_PASSWORD = process.env.GRID_PASSWORD;
const NGROK_AUTHTOKEN = process.env.NGROK_AUTHTOKEN;

const GRID_AUTH = GRID_USERNAME ? `${GRID_USERNAME}:${GRID_PASSWORD}@` : '';

const DISABLE_GEO = {
  profile: {
    default_content_setting_values: {
      geolocation: 2
    }
  }
};

module.exports = {
  gridUrl: 'http://' + GRID_AUTH + 'hub-cloud.browserstack.com/wd/hub',

  sets: {
    touch: {
      files: 'tests/touch'
    }
  },

  baseUrl: undefined,
  screenshotsDir: test => path.join(path.dirname(test.file), 'screens', test.id(), test.browserId),

  sessionsPerBrowser: 1,
  testsPerSession: 1,

  browsers: {
    iphone: {
      desiredCapabilities: {
        browserName: 'chrome',
        os: 'Windows',
        os_version: '10',
        version: '65.0',
        chromeOptions: {
          prefs: DISABLE_GEO,
          mobileEmulation: {
            deviceMetrics: {
              width: 320,
              height: 568,
              pixelRatio: 2.0
            },
            userAgent: [
              'Mozilla/5.0',
              '(iPhone; CPU iPhone OS 10_1_1 like Mac OS X)',
              'AppleWebKit/602.2.14',
              '(KHTML, like Gecko)',
              'Version/12.0',
              'Mobile/14B100',
              'Safari/602.1'
            ].join(' ')
          }
        }
      }
    }
  },
  plugins: {
    'html-reporter/hermione': {
      enabled: true
    },
    'ngrok-tunnel': {
      enabled: true,
      addr: 3000,
      authtoken: NGROK_AUTHTOKEN
    }
  }
};
