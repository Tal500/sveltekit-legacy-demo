import { By, until } from 'selenium-webdriver';
import { default as percySnapshot } from '@percy/selenium-webdriver';

import { waitForJS } from './utils.js';

/** @type {import('./types').TestFunc} */
export async function test({driver, baseUrl}) {
    await driver.get(baseUrl);
    await driver.wait(until.titleIs('Home'), 1000);

    await waitForJS(driver);

    percySnapshot(driver, 'Home (Navigation Test)');

    await driver.findElement(By.css('a[href="/about"]')).click();
    await driver.wait(until.titleIs('About'), 1000);

    percySnapshot(driver, 'About (Navigation Test)');

    await driver.findElement(By.css('a[href="/sverdle"]')).click();
    await driver.wait(until.titleIs('Sverdle'), 1000);

    percySnapshot(driver, 'Sverdle (Navigation Test)');

    await driver.findElement(By.css('a[href="/"]')).click();
    await driver.wait(until.titleIs('Home'), 1000);

    percySnapshot(driver, 'Home again (Navigation Test)');
}