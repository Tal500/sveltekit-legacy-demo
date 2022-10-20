<script lang="ts">
	// Loading first polyfills that are shared between for legacy&modern browsers.
	import 'abortcontroller-polyfill';

	import Header from './Header.svelte';
	import './styles.css';
</script>

<Header />

<!-- Having the main container be flex causes issues on IE11 -->
<main style={import.meta.env.LEGACY ? "display: block" : undefined}>
	<slot />
</main>

<footer>
	<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
</footer>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
