# SvelteKit Legacy Demo
[![CI](https://github.com/Tal500/sveltekit-legacy-demo/actions/workflows/CI.yml/badge.svg)](https://github.com/Tal500/sveltekit-legacy-demo/actions/workflows/CI.yml)
[![BrowserStack Status](https://automate.browserstack.com/badge.svg?badge_key=c01OSnhhOFFzV2pJSk9xWEU5OHBySkR1bnB5dFpMQ3VyWjFzem1DWDZ0VT0tLWpTdldrT1JwNkxMa2wwRDBVaDJYNHc9PQ==--52695c8ffd2e564444549394e327820ed6f4e3d6)](https://automate.browserstack.com/public-build/c01OSnhhOFFzV2pJSk9xWEU5OHBySkR1bnB5dFpMQ3VyWjFzem1DWDZ0VT0tLWpTdldrT1JwNkxMa2wwRDBVaDJYNHc9PQ==--52695c8ffd2e564444549394e327820ed6f4e3d6)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/732c6ff4/sveltekit-legacy-demo)

This is a demo for the proposed legacy support of SvelteKit, introduced in PR sveltejs/kit#6265.

This demo is based on `create-svelte`, and was addapted to support legacy browsers.

Currently it's tested manually only on IE11 (and works as well on modern browsers of course).

More info are in the referenced PR.

# Online Preview

An online demonstration is available at https://sveltekit-legacy-demo.pages.dev .

## Developing

Once you've cloned the project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Test

This project is tested with BrowserStack.
You can see the build status on [the BrowserStack dashboard](https://automate.browserstack.com/public-build/c01OSnhhOFFzV2pJSk9xWEU5OHBySkR1bnB5dFpMQ3VyWjFzem1DWDZ0VT0tLWpTdldrT1JwNkxMa2wwRDBVaDJYNHc9PQ==--52695c8ffd2e564444549394e327820ed6f4e3d6), and you can see some of the automation results on the [Percy page](https://percy.io/732c6ff4/sveltekit-legacy-demo).
