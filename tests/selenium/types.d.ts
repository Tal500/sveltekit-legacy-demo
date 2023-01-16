import type { WebDriver } from 'selenium-webdriver';

export interface Context {
    baseUrl: string;
    driver: WebDriver;
    log: (message: string) => void;
};

export type TestFunc = (context: Context) => Promise<void>;