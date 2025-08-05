import type { SelectOption } from '$lib/types/options';
import type { ResourceType } from '$lib/types/resources';

export const toSelect = ({ id, name }: { id: string; name: string }): SelectOption => ({
	value: id,
	label: name
});

export const formatColumn = (key: keyof ResourceType, title: string) => {
	return { key, title, value: (row: ResourceType) => row[key] };
};
