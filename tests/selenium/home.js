import assert from 'assert';
import { By, until } from 'selenium-webdriver';

/** @type {import('./types').TestFunc} */
export async function test({driver, baseUrl}) {
    await driver.get(baseUrl);
    await driver.wait(until.titleIs('Home'), 1000);

    while (await driver.executeScript('return document.readyState') !== 'complete') {
        console.log('Waiting for JS to be loaded...');
        await driver.sleep(100);
    }

    const counterDisplay = await driver.findElement(By.css(".counter-viewport strong:not([aria-hidden])"))
    const increaseButton = await driver.findElement(By.css('button[aria-label="Increase the counter by one"]'));
    const decreaseButton = await driver.findElement(By.css('button[aria-label="Decrease the counter by one"]'));

    let exectedCount = 0;

    const assertCount = async () => {
        assert(await counterDisplay.getText() === exectedCount.toString(), `Assert that the current count is ${exectedCount}`);
    };

    const increase = async () => {
        ++exectedCount;
        await increaseButton.click();
        await driver.wait(until.elementTextIs(counterDisplay, exectedCount.toString()));
        await assertCount();
    };

    const decrease = async () => {
        --exectedCount;
        await decreaseButton.click();
        await driver.wait(until.elementTextIs(counterDisplay, exectedCount.toString()));
        await assertCount();
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