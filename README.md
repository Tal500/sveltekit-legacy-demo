# SvelteKit Legacy Demo
[![CI](https://github.com/Tal500/sveltekit-legacy-demo/actions/workflows/CI.yml/badge.svg)](https://github.com/Tal500/sveltekit-legacy-demo/actions/workflows/CI.yml)

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
