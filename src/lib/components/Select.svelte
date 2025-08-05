<script lang="ts">
	export let name = '';
	export let required: boolean = false;
	export let multiple: boolean = false;
	export let options: { id: string; name: string }[] = [];
	export let placeholder = '';
	export let value: string | string[] = '';
</script>

{#if multiple}
	<select class="form-input" {name} {required} multiple bind:value>
		{#each options as { id, name }}
			<option value={id}>{name}</option>
		{/each}
	</select>
{:else}
	<select class="form-input" {name} {required} bind:value>
		{#if placeholder}
			<option value="" disabled selected>{placeholder}</option>
		{/if}
		{#each options as { id, name }}
			<option value={id}>{name}</option>
		{/each}
	</select>
{/if}
