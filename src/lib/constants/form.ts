import type { OptionItem } from '$lib/types/options';
import type { FormValues } from '$lib/validation/file-upload.schema';

export const EMPTY_OPTIONS: OptionItem[] = [];

export const DEFAULT_FORM: FormValues = {
	title: '',
	description: '',
	category: '',
	language: '',
	provider: '',
	roles: [],
	file: null
};
