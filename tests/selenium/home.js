import { By, until } from 'selenium-webdriver';
import { default as percySnapshot } from '@percy/selenium-webdriver';

import { assertStrictEquals, waitForJS } from './utils.js';

/** @type {import('./types').TestFunc} */
export async function test({driver, baseUrl}) {
    await driver.get(baseUrl);
    await driver.wait(until.titleIs('Home'), 1000);

    await waitForJS(driver);
    
    await percySnapshot(driver, 'Home Page (Initial)');

    const counterDisplay = await driver.findElement(By.css(".counter-viewport strong:not([aria-hidden])"));
    const increaseButton = await driver.findElement(By.css('button[aria-label="Increase the counter by one"]'));
    const decreaseButton = await driver.findElement(By.css('button[aria-label="Decrease the counter by one"]'));

    let exectedCount = 0;

    const assertCount = async () => {
        assertStrictEquals(await counterDisplay.getText(), exectedCount.toString(), `Assert that the current count is ${exectedCount}`);
    };

    let percyCount = 0;
    const postPress = async () => {
        await driver.wait(until.elementTextIs(counterDisplay, exectedCount.toString()));
        await assertCount();
        await percySnapshot(driver, `Home Page (exectedCount: ${exectedCount}, percyCount: ${++percyCount})`);
    };

    const increase = async () => {
        ++exectedCount;
        await increaseButton.click();
        await postPress();
    };

    const decrease = async () => {
        --exectedCount;
        await decreaseButton.click();
        await postPress();
    };

    await assertCount();

    await increase();
    await increase();
    await decrease();
    await decrease();
    await increase();
    await decrease();
    await decrease();
}