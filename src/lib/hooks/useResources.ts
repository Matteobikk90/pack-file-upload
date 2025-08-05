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

	return { resources, loading, error, fetchResources };
}
