<script lang="ts">
	import FilePreviewModal from '$lib/components/FilePreviewModal.svelte';
	import { columns } from '$lib/constants/table';
	import type { ResourceType } from '$lib/types/resources';

	const { resources } = $props();

	let previewFile = $state<string | null>(null);

	function openPreview(row: ResourceType) {
		if (!row.filePath) return;
		previewFile = `/uploads/${row.filePath}`;
	}
</script>

<article class="mx-auto w-full max-w-6xl overflow-x-auto rounded-md">
	<table class="min-w-full table-auto divide-y divide-gray-200 text-sm">
		<thead class="text-left font-semibold">
			<tr>
				{#each columns as col}
					<th class="p-3 whitespace-nowrap">{col.title}</th>
				{/each}
			</tr>
		</thead>
		<tbody class="divide-y divide-gray-200 text-sm font-light">
			{#each resources as r}
				<tr
					class="cursor-pointer text-gray-500 transition-colors hover:bg-orange-500 hover:text-white"
					onclick={() => openPreview(r)}
				>
					<td class="p-3">{r.title}</td>
					<td class="p-3">{r.description}</td>
					<td class="p-3">{r.category}</td>
					<td class="p-3">{r.provider}</td>
					<td class="p-3">{r.language}</td>
					<td class="p-3">
						<span class="text-md cursor-pointer" title="Preview"> 👁️ </span>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</article>

{#if previewFile}
	<FilePreviewModal filePath={previewFile} onClose={() => (previewFile = null)} />
{/if}
