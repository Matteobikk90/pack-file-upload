<script lang="ts">
	export let filePath: string;
	export let onClose: () => void;

	const isImage = filePath.match(/\.(png|jpg|jpeg|webp)$/i);
	const isPDF = filePath.endsWith('.pdf');
	const isVideo = /\.(mp4|webm|ogg|mov|mkv)$/i.test(filePath);
</script>

<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
	<div class="relative w-full max-w-4xl rounded-lg bg-white p-4 shadow-lg">
		<button
			class="absolute top-3 right-3 cursor-pointer rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
			on:click={onClose}
		>
			X
		</button>

		<h2 class="mb-4 text-lg font-bold">File Preview</h2>

		{#if isPDF}
			<iframe src={filePath} class="h-[70vh] w-full" title="PDF Preview"></iframe>
		{:else if isImage}
			<img loading="lazy" src={filePath} alt="Preview" class="mx-auto max-h-[70vh]" />
		{:else if isVideo}
			<video src={filePath} controls class="mx-auto max-h-[70vh] w-full rounded bg-black">
				<track kind="captions" />
			</video>
		{:else}
			<a href={filePath} target="_blank" class="text-blue-600 underline">Download File</a>
		{/if}
	</div>
</div>
