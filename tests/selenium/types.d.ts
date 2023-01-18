import type { WebDriver } from 'selenium-webdriver';

import type { default as BrowserStackCapsList } from './browser-stack-caps.js';

export interface ExtraCaps {
    // BrowserStack have issues with driver actions, so disable it.
    // Notice that IE11&Chrome14 is being tested locally,
    //  so we shouldn't be worry about that we can't use driver actions on BrowserStack.
    actionsEnabled: boolean;
}

export interface BrowserStackCaps {
    browserName: string,
    'bstack:options' : {
        os: string;
        osVersion: string;
        browserVersion: string;
        sessionName: string;
        idleTimeout?: number;
        sendKeys?: 'true' | 'false';
        local?: boolean;
        networkLogs?: boolean;
        consoleLogs?: 'disable' | 'errors' | 'warnings' | 'info' | 'verbose';
        projectName?: string;
        buildName?: string;
        localIdentifier?: string;
    },
    extraCaps?: Partial<ExtraCaps>;
};

export interface Context {
    baseUrl: string;
    driver: WebDriver;
    log: (message: string) => void;
    extraCaps: ExtraCaps;
};

export type TestFunc = (context: Context) => Promise<void>;