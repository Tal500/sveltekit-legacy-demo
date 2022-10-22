import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { sveltekit } from '@sveltejs/kit/vite';
import legacy from '@vitejs/plugin-legacy';

// The recommended way to list the legacy browsers is by putting this on a file named '.browserslistrc'.
// Sadly, babel preset plugin (the one that is being used by vite legacy plugin) doesn't read this file automatically,
// and from the other hand, postcssPresetEnv can't read the value passed to vite legacy plugin.
// This is why we don't specify the browser list explicitly in this vite config, but rather added this utility function
//  to read the browser list from the file.
const readBrowsersList = () => /** @type {string} */(readFileSync("./.browserslistrc", 'UTF-8'))
	.split(/\r?\n/) // Split it to lines
	.map((line) => {
		const trimmedLine = line.trim();
		return (trimmedLine.length === 0 || trimmedLine[0] === "#") ? undefined : trimmedLine;
	})
	.filter((query) => query !== undefined)
	.join(', ');

const __dirname = dirname(fileURLToPath(import.meta.url));
/**
 * 
 * @param {string} path 
 * @returns 
 */
const localPath = (path) => JSON.stringify(resolve(__dirname, path)).slice(1, -1);

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		legacy({
			// For complete list of available options, see:
			// https://www.npmjs.com/package/@vitejs/plugin-legacy#Options
			targets: readBrowsersList(),
			additionalLegacyPolyfills: [
				'custom-event-polyfill',
				'core-js/modules/es.promise.js',
				'whatwg-fetch',
				// 'global-this' should be used so 'regenerator-runtime' wouldn't do CSP issues
				'core-js/proposals/global-this',
				'regenerator-runtime/runtime',
				'unorm',
				'path-composedpath-polyfill',
				localPath('polyfills/initKeyboardeventKeyPolyfill.js'),
				localPath('polyfills/formdata.js')
			],
			//modernPolyfills: ['es.promise.finally'] // You may add modern polyfills too!
		}),
	]
};

export default config;
