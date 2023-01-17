import { Builder /*, logging*/ } from 'selenium-webdriver';
import { Options as IEOptions } from 'selenium-webdriver/ie.js';

import { default as BrowserStackCaps } from './browser-stack-caps.js';

import { test as navigationTest } from './navigation.js';
import { test as homeTest } from './home.js';
import { test as aboutTest } from './about.js';
import { test as sverdleTest } from './sverdle.js';

const browserStackUsername = process.env.BROWSERSTACK_USERNAME;
const browserStackAccessKey = process.env.BROWSERSTACK_ACCESS_KEY;

const tests = [
    { name: 'Navigation', func: navigationTest },
    { name: 'Home', func: homeTest },
    { name: 'About', func: aboutTest },
    { name: 'Sverdle', func: sverdleTest }
];

/** @type {(browser: string, caps?: BrowserStackCaps[number]) => Builder} */
const makeBuilder = (browser, caps) => {
    if (caps) {
        // In the case we're on BrowserStack testing

        if (!browserStackUsername || !browserStackAccessKey) {
            throw "Error: BROWSERSTACK_USERNAME or BROWSERSTACK_ACCESS_KEY" + 
                " environment variables aren't defined, but requested to run tests in BrowserStack.";
        }

        return new Builder()
            .usingServer(`http://${browserStackUsername}:${browserStackAccessKey}@hub.browserstack.com/wd/hub`)
            .withCapabilities(caps);
    }
    // otherwise

    switch (browser) {
        case 'ie':
            const options = new IEOptions();
            options.introduceFlakinessByIgnoringProtectedModeSettings(true);
            options.ignoreZoomSetting(true);

            return new Builder().forBrowser('internet explorer').setIeOptions(options);
        case 'edge':
            return new Builder().forBrowser('MicrosoftEdge');
        case 'safari':
            return new Builder().forBrowser('safari');
        case 'firefox':
            return new Builder().forBrowser('firefox');
        case 'chrome':
            return new Builder().forBrowser('chrome');
        default:
            throw `Error: Browser ${browser} isn't supported.`;
    }
};

/** @type {(browser: string, baseUrl: string, caps?: BrowserStackCaps[number]) => Promise<void>} */
async function runOn(browser, baseUrl, caps = undefined) {
    // Doesn't work for IE11 with `.setLoggingPrefs(prefs)`. Can we fix this?
    // const prefs = new logging.Preferences();
    // prefs.setLevel(logging.Type.BROWSER, logging.Level.DEBUG);

    const driver = await makeBuilder(browser, caps)
        /*.setLoggingPrefs(prefs)*/.build();

    /**
     * Log the message with the browser name
     * @param {string} message 
     * @returns 
     */
    const log = (message) => console.log(`[${browser}]: ${message}`);
    
    const context = { baseUrl, driver, log, actionsEnabled: caps?.actionsEnabled ?? true };

    log('=== started ===');

    for (const test of tests) {
        log(`Starting test ${test.name}...`);
        await test.func(context);
        log(`Test ${test.name} has ended.`);
    }
    
    // This logging doesn't work on IE11 either
    //const logEntries = driver.manage().logs().get(logging.Level.ALL.name);
    //console.log("Logs: " + JSON.stringify(logEntries));

    // Clean drive destruction consumes time for some reason, so don't perform this on CI.
    if (!process.env.CI) {
        log('ending...');
        await driver.quit();
    }

    log('=== finished ===');
}

await (() => {
    const browsersArrStr = process.env.BROWSER || 'ie';
    const baseUrl = (process.argv.length >= 3) ? process.argv[2] : 'http://localhost:4173';

    const browsers = browsersArrStr.split(',').map(str => str.trim());

    return Promise.all(browsers.map((browser) => {
        if (browser === 'browser-stack') {
            return Promise.all(BrowserStackCaps.map(cap => runOn(`browser-stack:${cap['bstack:options'].sessionName}`, baseUrl, cap)));
        } else {
            return runOn(browser, baseUrl);
        }
    }));
})();