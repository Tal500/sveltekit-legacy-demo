import assert from 'assert';
import { By, Key, until } from 'selenium-webdriver';
import { default as percySnapshot } from '@percy/selenium-webdriver';

import { assertStrictEquals, waitForJS } from './utils.js';

/**
 * 
 * @param {import('selenium-webdriver').WebDriver} driver 
 * @param {import('selenium-webdriver').WebElement} element 
 * @returns {Promise<string>} a promise to the value of the input element
 */
const getInputValue = (driver, element) => driver.executeScript('return arguments[0].value', element)

/**
 * 
 * @param {import('selenium-webdriver').WebDriver} driver 
 * @param {string} key
 */
const pressKey = (driver, key) => driver.actions().keyDown(key).perform();

// /**
//  * 
//  * @param {import('selenium-webdriver').WebDriver} driver 
//  * @param {string[]} keys
//  */
//  async function pressKeys(driver, keys) {
//     let actions = driver.actions();

//     for (let i = 0; i < keys.length; ++i) {
//         actions = actions.keyDown(keys[i]);
//     }
    
//     await actions.perform();
// }

/**
 * 
 * @param {import('selenium-webdriver').WebDriver} driver 
 * @param {string} char
 */
const clickButton = (driver, char) => driver.findElement(By.css(`button[data-key="${char}"]`)).click();

// /**
//  * 
//  * @param {import('selenium-webdriver').WebDriver} driver 
//  * @param {string[]} chars
//  */
// async function clickButtons(driver, chars) {
//     let actions = driver.actions();

//     for (let i = 0; i < chars.length; ++i) {
//         const element = driver.findElement(By.css(`button[data-key="${chars[i]}"]`));
//         actions = actions.move({origin:element}).press();
//     }
    
//     await actions.perform();
// }

/**
 * @param {import("selenium-webdriver").WebDriver} driver
 * @param {import("selenium-webdriver").WebElement} row
 * @param {string} word
 * @param {boolean} isKeyboard
 */
async function testSendWord(driver, row, word, isKeyboard) {
    const cells = await row.findElements(By.xpath("./child::*"));
    assertStrictEquals(cells.length, 5);

    // An optimized suggestion that doesn't seems to work well
    // if (isKeyboard) {
    //     await pressKeys(driver, [...word, Key.ENTER]);
    // } else {
    //     await clickButtons(driver, [...word, 'enter']);
    // }

    for (let i = 0; i < word.length; ++i) {
        const currentChar = word[i];

        if (isKeyboard) {
            await pressKey(driver, currentChar);
        } else {
            await clickButton(driver, currentChar);
        }

        assertStrictEquals(await getInputValue(driver, cells[i]), currentChar);
    }
    
    if (isKeyboard) {
        await pressKey(driver, Key.ENTER);
    } else {
        await clickButton(driver, 'enter');
    }
}

/**
 * 
 * @param {import("selenium-webdriver").WebDriver} driver
 * @returns 
 */
const waitServerResponse = (driver) => driver.sleep(800);// let the server time to response

/**
 * @param {import("selenium-webdriver").WebDriver} driver
 * 
 * */
const cheatAndFindCorrectWord = async (driver) =>
    (await driver.executeScript('return document.getElementById("cheat-answer").content')).replaceAll('$', '');

/** @type {import('./types').TestFunc} */
export async function test({driver, baseUrl, log, actionsEnabled}) {
    await driver.get(baseUrl + '/sverdle');
    await driver.wait(until.titleIs('Sverdle'), 10000);

    await waitForJS(driver);

    percySnapshot(driver, 'Sverdle Initial');

    const howToPlayElement = await driver.findElement(By.css('a[href="/sverdle/how-to-play"]'));
    assertStrictEquals(await howToPlayElement.getText(), "How to play");

    ///////////
    // Check that it accepts valid words
    ///////////

    const grid = await driver.findElement(By.css('div.grid'));
    const rows = await grid.findElements(By.xpath("./child::*"));
    assertStrictEquals(rows.length, 6);

    let currentRow = 0;

    if (actionsEnabled) {
        // an invalid word from the keyboard
        await testSendWord(driver, rows[currentRow], 'abcde', true);
        for (let i = 0; i < 5; ++i) { await pressKey(driver, Key.BACK_SPACE); }

        // an invalid word from the mouse
        await testSendWord(driver, rows[currentRow], 'fghij', true);
        for (let i = 0; i < 5; ++i) { await clickButton(driver, 'backspace'); }

        // valid words from the keyboard
        await testSendWord(driver, rows[currentRow++], 'hello', true);
        await waitServerResponse(driver);

        await testSendWord(driver, rows[currentRow++], 'world', true);
        await waitServerResponse(driver);
    }

    // a valid word from the mouse
    await testSendWord(driver, rows[currentRow++], 'great', false);
    await waitServerResponse(driver);

    // the correct word from the mouse
    const correctWord = await cheatAndFindCorrectWord(driver);
    log("The correct answer is " + correctWord)
    await testSendWord(driver, rows[currentRow++], correctWord, false);
    await waitServerResponse(driver);

    // Check the winning message
    assert((await driver.findElement(By.css(`button[data-key="enter"].restart`)).getText()).indexOf('you won :)') >= 0);

    percySnapshot(driver, 'Sverdle Final');

    ///////////
    ///////////
}