import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { resolve as importResolve } from 'import-meta-resolve';
import { sveltekit } from '@sveltejs/kit/vite';
import legacy from '@vitejs/plugin-legacy';

const __dirname = dirname(fileURLToPath(import.meta.url));
/**
 * 
 * @param {string} path 
 * @returns 
 */
const localPath = (path) => JSON.stringify(resolve(__dirname, path)).slice(1, -1);

const kitIndexPath = await importResolve('@sveltejs/kit', import.meta.url);
const kitWord = '/kit';
const kitPathUnnormalized = kitIndexPath.slice(0, kitIndexPath.lastIndexOf(kitWord) + kitWord.length);
const filePrefix = 'file:///';
const kitPath = kitPathUnnormalized.startsWith(filePrefix) ? kitPathUnnormalized.slice(filePrefix.length) : kitPathUnnormalized;

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		legacy({
			// For complete list of available options, see:
			// https://www.npmjs.com/package/@vitejs/plugin-legacy#Options
			targets: ['ie >= 11'],
			additionalLegacyPolyfills: [
				'custom-event-polyfill',
				'core-js/modules/es.promise.js',
				'whatwg-fetch',
				// 'global-this' should be used so 'regenerator-runtime' wouldn't do CSP issues
				'core-js/proposals/global-this',
				'regenerator-runtime/runtime',
				'unorm',
				'path-composedpath-polyfill',
				localPath('polyfills/formdata.js')
			],
			//modernPolyfills: ['es.promise.finally'] // You may add modern polyfills too!
		}),
	],

	server: {
		fs: {
			allow: [kitPath]
		}
	}
};

export default config;
