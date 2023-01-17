import type { WebDriver } from 'selenium-webdriver';

import type { default as BrowserStackCapsList } from './browser-stack-caps.js';

export type BrowserStackCaps = (typeof BrowserStackCapsList)[number] & {
    'bstack:options'? : {
        local?: boolean;
        projectName?: string;
        buildName?: string;
        localIdentifier?: string;
    }
};

export interface Context {
    baseUrl: string;
    driver: WebDriver;
    log: (message: string) => void;
    actionsEnabled: boolean;
};

export type TestFunc = (context: Context) => Promise<void>;