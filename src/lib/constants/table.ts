import type { ResourceType } from '$lib/types/resources';

export const columns = [
	{ key: 'title', title: 'Title' },
	{ key: 'description', title: 'Description' },
	{ key: 'category', title: 'Category' },
	{ key: 'language', title: 'Language' },
	{ key: 'provider', title: 'Provider' },
	{
		key: 'roles',
		title: 'Roles',
		cell: (row: ResourceType) => row.roles?.join(', ')
	},
	{ key: 'filePath', title: 'File' }
];
