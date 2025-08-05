import type { SelectOption } from '$lib/types/options';

export const toSelect = ({ id, name }: { id: string; name: string }): SelectOption => ({
	value: id,
	label: name
});
