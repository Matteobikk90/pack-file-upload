<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import { useFileUpload } from '$lib/hooks/useFileUpload';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import SvelteSelect from 'svelte-select';

	const { handleUploadSuccess, onClose } = $props();

	const {
		categories,
		languages,
		providers,
		roles,
		form,
		errors,
		fileName,
		isFormValid,
		fetchOptions,
		validateForm,
		handleFileChange,
		handleSubmit
	} = useFileUpload();

	onMount(fetchOptions);

	$effect(() => {
		validateForm($form);
	});

	async function submitAndHandle(e: Event) {
		const result = await handleSubmit(e);
		if (result.success) {
			toast.success('Resource uploaded successfully!');
			handleUploadSuccess('success');
			onClose();
		} else {
			toast.error(result.message || 'Upload failed.');
		}
	}
</script>

<form
	class="relative m-auto flex w-full max-w-2xl flex-col gap-4 rounded-xl bg-white p-8 shadow-lg"
	autocomplete="off"
	onsubmit={submitAndHandle}
>
	<h2 class="mb-1 text-xl font-semibold">Upload Resource</h2>
	<button
		type="button"
		class="absolute top-4 right-4 cursor-pointer text-2xl text-gray-400 hover:text-gray-700"
		onclick={onClose}
		aria-label="Close"
	>
		✕
	</button>

	<div class="flex flex-col gap-1">
		<Input name="title" placeholder="Title*" maxlength={200} required bind:value={$form.title} />
		{#if $errors.title}
			<div class="text-sm text-red-600">{$errors.title}</div>
		{/if}
	</div>

	<div class="flex flex-col gap-1">
		<Input
			name="description"
			placeholder="Description*"
			maxlength={1000}
			required
			bind:value={$form.description}
		/>
		{#if $errors.description}
			<div class="text-sm text-red-600">{$errors.description}</div>
		{/if}
	</div>

	<SvelteSelect bind:value={$form.category} items={$categories} placeholder="Category*" required />
	<SvelteSelect bind:value={$form.language} items={$languages} placeholder="Language*" required />
	<SvelteSelect bind:value={$form.provider} items={$providers} placeholder="Provider*" required />
	<SvelteSelect bind:value={$form.roles} items={$roles} placeholder="Roles*" multiple required />

	<div class="flex items-center gap-3">
		<input
			id="file-upload"
			name="file"
			type="file"
			required
			class="hidden"
			onchange={handleFileChange}
		/>
		<label
			for="file-upload"
			class="cursor-pointer rounded-md border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700 hover:bg-orange-100"
		>
			Select file
		</label>
		<span class="text-gray-500">{$fileName}</span>
	</div>

	<button
		type="submit"
		class="mt-2 ml-auto cursor-pointer rounded-md bg-orange-500 px-4 py-2 font-semibold text-white shadow transition hover:bg-orange-600 disabled:opacity-60"
		disabled={!$isFormValid}
	>
		Upload
	</button>
</form>
