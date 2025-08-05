import { DEFAULT_FORM } from '$lib/constants/form';
import type { ApiOptionsResponse, SelectOption, UIFormValues } from '$lib/types/options';
import { toSelect } from '$lib/utils/formatter';
import { FormSchema } from '$lib/validation/file-upload.schema';
import { writable } from 'svelte/store';

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
		validateForm
	};
}
