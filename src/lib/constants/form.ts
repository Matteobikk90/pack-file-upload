import type { SelectOption, UIFormValuesType } from '$lib/types/options';

export const EMPTY_OPTIONS: SelectOption[] = [];

export const DEFAULT_FORM: UIFormValuesType = {
	title: '',
	description: '',
	category: null,
	language: null,
	provider: null,
	roles: [],
	file: null
};
