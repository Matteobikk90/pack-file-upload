import { DEFAULT_FORM } from '$lib/constants/form';
import type { ApiOptionsResponse, SelectOption, UIFormValues } from '$lib/types/options';
import { toSelect } from '$lib/utils/formatter';
import { FormSchema } from '$lib/validation/file-upload.schema';
import toast from 'svelte-french-toast';
import { get, writable } from 'svelte/store';

export function useFileUpload() {
	const categories = writable<SelectOption[]>([]);
	const languages = writable<SelectOption[]>([]);
	const providers = writable<SelectOption[]>([]);
	const roles = writable<SelectOption[]>([]);
	const form = writable<UIFormValues>({ ...DEFAULT_FORM });
	const errors = writable<Record<string, string>>({});
	const fileName = writable('No file selected*');
	const isFormValid = writable(false);

	async function fetchOptions() {
		const res = await fetch('/api/options');
		const data: ApiOptionsResponse = await res.json();
		categories.set(data.categories.map(toSelect));
		languages.set(data.languages.map(toSelect));
		providers.set(data.providers.map(toSelect));
		roles.set(data.roles.map(toSelect));
	}

	function validateForm($form: UIFormValues) {
		const toValidate = {
			...$form,
			category: $form.category?.value ?? '',
			language: $form.language?.value ?? '',
			provider: $form.provider?.value ?? '',
			roles: Array.isArray($form.roles) ? $form.roles.map((r) => r.value) : [],
			file: $form.file
		};
		const result = FormSchema.safeParse(toValidate);
		isFormValid.set(result.success);
		const newErrors: Record<string, string> = {};
		if (!result.success) {
			for (const issue of result.error.issues) {
				const key = issue.path[0];
				if (typeof key === 'string') newErrors[key] = issue.message;
			}
		}
		errors.set(newErrors);
	}

	function handleFileChange(event: Event) {
		const input = event.currentTarget as HTMLInputElement;
		form.update((f) => {
			f.file = input.files?.[0] ?? null;
			return f;
		});
		fileName.set(input.files?.[0]?.name ?? 'No file selected*');
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		const $form = get(form);
		const formData = new FormData();
		formData.set('title', $form.title);
		formData.set('description', $form.description);
		formData.set('category', $form.category?.value ?? '');
		formData.set('language', $form.language?.value ?? '');
		formData.set('provider', $form.provider?.value ?? '');
		($form.roles || []).forEach((role) => {
			formData.append('roles', role.value);
		});
		if ($form.file) formData.set('file', $form.file);

		try {
			const res = await fetch('/api/upload', {
				method: 'POST',
				body: formData
			});
			const data = await res.json();

			if (data.success) {
				toast.success('Resource uploaded successfully!');
				form.set({ ...DEFAULT_FORM });
				fileName.set('No file selected*');
			} else {
				toast.error(data.message || 'Upload failed.');
			}
		} catch {
			toast.error('Something went wrong. Please try again.');
		}
	}

	return {
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
	};
}
