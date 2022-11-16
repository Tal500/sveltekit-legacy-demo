import { By, until } from 'selenium-webdriver';

import { waitForJS } from './utils.js';

/** @type {import('./types').TestFunc} */
export async function test({driver, baseUrl}) {
    await driver.get(baseUrl);
    await driver.wait(until.titleIs('Home'), 1000);

    await waitForJS(driver);

    await driver.findElement(By.css('a[href="/about"]')).click();
    await driver.wait(until.titleIs('About'), 1000);

    await driver.findElement(By.css('a[href="/sverdle"]')).click();
    await driver.wait(until.titleIs('Sverdle'), 1000);

    await driver.findElement(By.css('a[href="/"]')).click();
    await driver.wait(until.titleIs('Home'), 1000);
}