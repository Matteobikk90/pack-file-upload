<script lang="ts">
	export let name = '';
	export let required: boolean = false;
	export let multiple: boolean = false;
	export let options: { id: string; name: string }[] = [];
	export let placeholder = '';
</script>

<select class="form-input" {name} {required} {multiple}>
	{#if placeholder}
		<option value="" disabled selected>{placeholder}</option>
	{/if}
	{#each options as { id, name }}
		<option value={id}>{name}</option>
	{/each}
</select>
