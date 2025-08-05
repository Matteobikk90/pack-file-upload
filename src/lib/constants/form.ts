import type { SelectOption, UIFormValues } from '$lib/types/options';

export const EMPTY_OPTIONS: SelectOption[] = [];

export const DEFAULT_FORM: UIFormValues = {
	title: '',
	description: '',
	category: null,
	language: null,
	provider: null,
	roles: [],
	file: null
};
