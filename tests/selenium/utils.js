import assert from 'assert';

/** @type {(lhs: any, rhs: any, message?: string) => void} */
export const assertStrictEquals = (lhs, rhs, message = undefined) =>
    assert(lhs === rhs, `Assertation of strict equal (${JSON.stringify(lhs)} === ${JSON.stringify(rhs)}) failed!${
        message != null ? ` Message: ${message}` : ''}`)

/** @type {(driver: import('selenium-webdriver').WebDriver) => Promise<void>} */
export async function waitForJS(driver) {
    while (await driver.executeScript('return document.readyState') !== 'complete') {
        console.log('Waiting for JS to be loaded...');
        await driver.sleep(100);
    }
}