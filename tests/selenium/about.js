import { By, until } from 'selenium-webdriver';

import { assertStrictEquals, waitForJS } from './utils.js';

/** @type {import('./types').TestFunc} */
export async function test({driver, baseUrl}) {
    await driver.get(baseUrl + '/about');
    await driver.wait(until.titleIs('About'), 1000);

    await waitForJS(driver);

    const headerElement = await driver.findElement(By.css(".text-column h1"));
    assertStrictEquals(await headerElement.getText(), "About this app");
}