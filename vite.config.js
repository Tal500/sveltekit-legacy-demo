import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { sveltekit } from '@sveltejs/kit/vite';
import legacy from '@vitejs/plugin-legacy';
import packageConfig from './package.json';

const __dirname = dirname(fileURLToPath(import.meta.url));
/**
 * 
 * @param {string} path 
 * @returns 
 */
const localPath = (path) => resolve(__dirname, path);

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		legacy({
			// For complete list of available options, see:
			// https://www.npmjs.com/package/@vitejs/plugin-legacy#Options
			targets: packageConfig.browserslist,
			additionalLegacyPolyfills: [
				'custom-event-polyfill',
				'core-js/modules/es.promise.js',
				'whatwg-fetch',
				// 'global-this' should be used so 'regenerator-runtime' wouldn't do CSP issues
				'core-js/proposals/global-this',
				'regenerator-runtime/runtime',
				'unorm',
				'path-composedpath-polyfill',
				'proxy-polyfill/proxy.min.js',
				localPath('polyfills/initKeyboardeventKeyPolyfill.js'),
				localPath('polyfills/formdata.js')
			],
			//modernPolyfills: ['es.promise.finally'] // You may add modern polyfills too!
		}),
	]
};

export default config;
