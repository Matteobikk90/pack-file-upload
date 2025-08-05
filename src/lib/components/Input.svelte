<script lang="ts">
	export let name = '';
	export let type = 'text';
	export let placeholder = '';
	export let maxlength: number | undefined = undefined;
	export let required: boolean = false;
	export let value: string = '';
	export let className = '';
</script>

<input
	class={`form-input ${className}`}
	{name}
	{type}
	{placeholder}
	{maxlength}
	{required}
	bind:value
/>
