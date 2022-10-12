import type { WebDriver } from 'selenium-webdriver';

export interface Context {
    baseUrl: string;
    driver: WebDriver;
};

export type TestFunc = (context: Context) => Promise<void>;