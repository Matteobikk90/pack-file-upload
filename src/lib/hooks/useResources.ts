import type { ResourceType } from '$lib/types/resources';
import { writable } from 'svelte/store';

export function useResources() {
	const resources = writable([]);
	const loading = writable(false);
	const error = writable('');

	async function fetchResources() {
		loading.set(true);
		try {
			const res = await fetch('/api/resources');
			const data = await res.json();
			resources.set(data.resources);
		} catch {
			error.set('Failed to load resources');
		} finally {
			loading.set(false);
		}
	}

	function handleRowClick(event: CustomEvent<{ row: ResourceType }>) {
		const rowData = event.detail.row;
		console.log(rowData);
	}

	return { resources, loading, error, fetchResources, handleRowClick };
}
