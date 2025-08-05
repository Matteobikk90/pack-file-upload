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

<header class="container my-12">
	<h1 class="text-2xl font-bold">Resources</h1>
	<button class="upload-btn" onclick={() => (showUploadModal = true)}> Upload </button>
</header>
<main class="container gap-8">
	{#if showUploadModal}
		<div class="modal-container">
			<UploadForm {handleUploadSuccess} onClose={() => (showUploadModal = false)} />
		</div>
	{/if}

	{#if $loading}
		<div>Loading...</div>
	{:else if $resources.length === 0}
		<div class="m-auto flex flex-col gap-4 py-12 text-center text-gray-400">
			<div class="text-5xl">📂</div>
			<h2>No resources uploaded yet.</h2>
			<p>Click upload button to add your first!</p>
		</div>
	{:else}
		<ResourcesTable resources={$resources} />
	{/if}
</main>
