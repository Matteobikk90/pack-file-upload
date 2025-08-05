<script lang="ts">
	import ResourcesTable from '$lib/components/ResourcesTable.svelte';
	import UploadForm from '$lib/components/UploadForm.svelte';
	import { useResources } from '$lib/hooks/useResources';
	import { onMount } from 'svelte';

	let showUploadModal = false;

	const { resources, fetchResources, loading } = useResources();

	onMount(fetchResources);

	function handleUploadSuccess() {
		fetchResources();
		showUploadModal = false;
	}
</script>

<main class="m-auto mt-12 flex max-w-6xl flex-col gap-8 p-4">
	<div class="flex justify-between">
		<h1 class="text-2xl font-bold">Resources</h1>
		<button
			class="cursor-pointer rounded-md bg-orange-500 px-4 py-2 font-semibold text-white shadow hover:bg-orange-600"
			onclick={() => (showUploadModal = true)}
		>
			+ Upload
		</button>
	</div>

	{#if showUploadModal}
		<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
			<UploadForm {handleUploadSuccess} onClose={() => (showUploadModal = false)} />
		</div>
	{/if}

	{#if $loading}
		<div>Loading...</div>
	{:else if $resources.length === 0}
		<div class="flex flex-col gap-4 py-12 text-center text-gray-400">
			<div class="text-5xl">📂</div>
			<h2>No resources uploaded yet.</h2>
			<p>Click upload button to add your first!</p>
		</div>
	{:else}
		<ResourcesTable resources={$resources} />
	{/if}
</main>
