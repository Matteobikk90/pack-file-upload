<script lang="ts">
	export let name = '';
	export let type = 'text';
	export let placeholder = '';
	export let maxlength: number | undefined = undefined;
	export let required: boolean = false;
</script>

<input class="form-input" {name} {type} {placeholder} {maxlength} {required} />
