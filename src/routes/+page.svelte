<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import Select from '$lib/components/Select.svelte';
	import { DEFAULT_FORM, EMPTY_OPTIONS } from '$lib/constants/form';
	import type { OptionItem } from '$lib/types/options';
	import { FormSchema, type FormValues } from '$lib/validation/file-upload.schema';
	import { onMount } from 'svelte';

	let categories: OptionItem[] = [...EMPTY_OPTIONS];
	let languages: OptionItem[] = [...EMPTY_OPTIONS];
	let providers: OptionItem[] = [...EMPTY_OPTIONS];
	let roles: OptionItem[] = [...EMPTY_OPTIONS];

	let form: FormValues = { ...DEFAULT_FORM };
	let file: File | null = null;
	let fileName = 'No file selected*';
	let errors: Record<string, string> = {};
	let isFormValid = false;

	$: {
		const toValidate = { ...form, file };
		const result = FormSchema.safeParse(toValidate);
		isFormValid = result.success;

		errors = {};
		if (!result.success) {
			for (const issue of result.error.issues) {
				const key = issue.path[0];
				if (typeof key === 'string') {
					errors[key] = issue.message;
				}
			}
		}
	}

	onMount(async () => {
		const res = await fetch('/api/options');
		const data = await res.json();
		categories = data.categories;
		languages = data.languages;
		providers = data.providers;
		roles = data.roles;
	});

	function handleFileChange(event: Event) {
		const target = event.target as HTMLInputElement;
		file = target.files?.[0] ?? null;
		fileName = file?.name ?? 'No file selected*';
	}
</script>

<form
	method="POST"
	enctype="multipart/form-data"
	action="/api/upload"
	class="m-auto flex w-full max-w-2xl flex-col gap-4 rounded-xl bg-white p-8 shadow-lg"
	autocomplete="off"
>
	<h2 class="mb-1 text-xl font-semibold">Upload Resource</h2>

	<div class="flex flex-col gap-1">
		<Input name="title" placeholder="Title*" maxlength={200} required bind:value={form.title} />
		{#if errors.title}
			<div class="text-sm text-red-600">{errors.title}</div>
		{/if}
	</div>

	<div class="flex flex-col gap-1">
		<Input
			name="description"
			placeholder="Description*"
			maxlength={1000}
			required
			bind:value={form.description}
		/>
		{#if errors.description}
			<div class="text-sm text-red-600">{errors.description}</div>
		{/if}
	</div>

	<Select
		name="category"
		options={categories}
		required
		placeholder="Category*"
		bind:value={form.category}
	/>
	<Select
		name="language"
		options={languages}
		required
		placeholder="Language*"
		bind:value={form.language}
	/>
	<Select
		name="provider"
		options={providers}
		required
		placeholder="Provider*"
		bind:value={form.provider}
	/>
	<Select
		name="roles"
		options={roles}
		required
		placeholder="Role*"
		bind:value={form.roles}
		multiple={true}
	/>

	<div class="flex items-center gap-3">
		<input
			id="file-upload"
			name="file"
			type="file"
			required
			class="hidden"
			on:change={handleFileChange}
		/>
		<label
			for="file-upload"
			class="cursor-pointer rounded-md border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700 hover:bg-orange-100"
		>
			Select file
		</label>
		<span class="text-gray-500">{fileName}</span>
	</div>

	<button
		type="submit"
		class="mt-2 ml-auto cursor-pointer rounded-md bg-orange-500 px-4 py-2 font-semibold text-white shadow transition hover:bg-orange-600 disabled:opacity-60"
		disabled={!isFormValid}
	>
		Upload
	</button>
</form>
