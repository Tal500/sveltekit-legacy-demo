import { Builder, logging } from 'selenium-webdriver';
import { Options as IEOptions } from 'selenium-webdriver/ie.js';

import { test as homeTest } from './home.js';

(async () => {
    const baseUrl = (process.argv.length >= 3) ? process.argv[2] : 'http://localhost:4173';

    const options = new IEOptions();
    options.introduceFlakinessByIgnoringProtectedModeSettings(true);
    options.ignoreZoomSetting(true);

    const prefs = new logging.Preferences();
    prefs.setLevel(logging.Type.BROWSER, logging.Level.DEBUG);

    const driver = await new Builder().forBrowser('internet explorer').setIeOptions(options)
        /*.setLoggingPrefs(prefs)*/.build();
    
    const context = { baseUrl, driver };

    try {
        await homeTest(context);
    } finally {
        console.log('ending...');
        await driver.quit();
    }
})();