import { By, until } from 'selenium-webdriver';
import { default as percySnapshot } from '@percy/selenium-webdriver';

import { waitForJS } from './utils.js';

/** @type {import('./types').TestFunc} */
export async function test({driver, baseUrl}) {
    await driver.get(baseUrl);
    await driver.wait(until.titleIs('Home'), 10000);

    await waitForJS(driver);

    await percySnapshot(driver, 'Home (Navigation Test)');

    await driver.findElement(By.css('a[href="/about"]')).click();
    await driver.wait(until.titleIs('About'), 10000);

    await percySnapshot(driver, 'About (Navigation Test)');

    await driver.findElement(By.css('a[href="/sverdle"]')).click();
    await driver.wait(until.titleIs('Sverdle'), 10000);

    await percySnapshot(driver, 'Sverdle (Navigation Test)');

    await driver.findElement(By.css('a[href="/"]')).click();
    await driver.wait(until.titleIs('Home'), 10000);

    await percySnapshot(driver, 'Home again (Navigation Test)');
}