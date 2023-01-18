import type { WebDriver } from 'selenium-webdriver';

import type { default as BrowserStackCapsList } from './browser-stack-caps.js';

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
    actionsEnabled?: boolean;
};

export interface Context {
    baseUrl: string;
    driver: WebDriver;
    log: (message: string) => void;
    actionsEnabled: boolean;
};

export type TestFunc = (context: Context) => Promise<void>;