import { Builder /*, logging*/ } from 'selenium-webdriver';
import { Options as IEOptions } from 'selenium-webdriver/ie.js';

import { test as homeTest } from './home.js';
import { test as aboutTest } from './about.js';

const tests = [
    { name: 'Home', func: homeTest },
    { name: 'About', func: aboutTest }
];

/** @type {(browser: string) => Builder} */
const makeBuilder = (browser) => {
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

(async () => {
    const browser = process.env.BROWSER || 'ie';
    const baseUrl = (process.argv.length >= 3) ? process.argv[2] : 'http://localhost:4173';

    // Doesn't work for IE11 with `.setLoggingPrefs(prefs)`. Can we fix this?
    // const prefs = new logging.Preferences();
    // prefs.setLevel(logging.Type.BROWSER, logging.Level.DEBUG);

    const driver = await makeBuilder(browser)
        /*.setLoggingPrefs(prefs)*/.build();
    
    const context = { baseUrl, driver };

    try {
        console.log(`=== Starting selenium tests on browser ${browser} ===`)

        for (const test of tests) {
            console.log(`Starting test ${test.name}...`);
            await test.func(context);
            console.log(`Test ${test.name} has ended.`);
        }
        
        // This logging doesn't work on IE11 either
        //const logEntries = driver.manage().logs().get(logging.Level.ALL.name);
        //console.log("Logs: " + JSON.stringify(logEntries));
    } finally {
        // Clean drive destruction consumes time for some reason, so don't perform this on CI.
        if (!process.env.CI) {
            console.log('ending...');
            await driver.quit();
        }
    }
})();