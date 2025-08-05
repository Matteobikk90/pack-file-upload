<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { Toaster } from 'svelte-french-toast';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Pack File Upload</title>
</svelte:head>

<Toaster position="top-center" />

{@render children?.()}
