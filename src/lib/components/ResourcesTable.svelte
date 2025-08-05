<script lang="ts">
	import { columns } from '$lib/constants/table';
	import { useResources } from '$lib/hooks/useResources';
	import { onMount } from 'svelte';
	import Table from 'svelte-table';

	const { resources, fetchResources, handleRowClick } = useResources();

	onMount(fetchResources);
</script>

<div class="rounded-md border shadow">
	<Table {columns} rows={$resources} />
</div>
