<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import Select from '$lib/components/Select.svelte';
	import type { OptionItem } from '$lib/types/options';
	import { onMount } from 'svelte';

	let categories: OptionItem[] = [];
	let languages: OptionItem[] = [];
	let providers: OptionItem[] = [];
	let roles: OptionItem[] = [];

	onMount(async () => {
		const res = await fetch('/api/options');
		const data = await res.json();
		categories = data.categories;
		languages = data.languages;
		providers = data.providers;
		roles = data.roles;
	});
</script>

<form
	method="POST"
	enctype="multipart/form-data"
	action="/api/upload"
	class="flex w-full max-w-lg flex-col gap-5 rounded-xl bg-white px-8 py-8 shadow-lg"
	autocomplete="off"
>
	<h2 class="mb-1 text-xl font-semibold">Upload Resource</h2>
	<Input name="title" placeholder="Title*" maxlength={200} required />
	<Input name="description" placeholder="Description*" maxlength={1000} required />

	<Select name="category" options={categories} required placeholder="Category*" />
	<Select name="language" options={languages} required placeholder="Language*" />
	<Select name="provider" options={providers} required placeholder="Provider*" />
	<Select name="roles" options={roles} multiple required />

	<input
		id="file-upload"
		name="file"
		type="file"
		required
		class="block w-full text-gray-900 file:mr-4 file:rounded-md file:border-0 file:bg-orange-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-orange-700 hover:file:bg-orange-100"
	/>

	<button
		type="submit"
		class="mt-2 w-full rounded-md bg-orange-500 py-2 font-semibold text-white shadow transition hover:bg-orange-600"
	>
		Upload
	</button>
</form>
