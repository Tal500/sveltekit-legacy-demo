import { By, until } from 'selenium-webdriver';
import { default as percySnapshot } from '@percy/selenium-webdriver';

import { assertStrictEquals, waitForJS } from './utils.js';

/** @type {import('./types').TestFunc} */
export async function test({driver, baseUrl}) {
    await driver.get(baseUrl + '/about');
    await driver.wait(until.titleIs('About'), 10000);

    await waitForJS(driver);
    
    await percySnapshot(driver, 'About Page');

    const headerElement = await driver.findElement(By.css(".text-column h1"));
    assertStrictEquals(await headerElement.getText(), "About this app");
}