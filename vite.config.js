import { sveltekit } from '@sveltejs/kit/vite';
import legacy from '@vitejs/plugin-legacy';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		legacy({
			targets: ['ie >= 11'],
			additionalLegacyPolyfills: [
				'custom-event-polyfill',
				'core-js/modules/es.promise.js',
				'whatwg-fetch',
				// 'global-this' should be used so 'regenerator-runtime' wouldn't do CSP issues
				'core-js/proposals/global-this',
				'regenerator-runtime/runtime',
				'unorm'
			],
			modernPolyfills: ['es.promise.finally']
		}),
	]
};

export default config;
