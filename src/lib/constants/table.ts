import { formatColumn } from '$lib/utils/formatter';

export const columns = [
	formatColumn('title', 'Content Title'),
	formatColumn('description', 'Description'),
	formatColumn('category', 'Path'),
	formatColumn('provider', 'Provider'),
	formatColumn('language', 'Type'),
	formatColumn('actions', '')
];
