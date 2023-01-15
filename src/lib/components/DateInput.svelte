<script>
	import { onMount } from 'svelte';
	import dayjs from 'dayjs';

	export let format = 'YYYY-MM-DD';
	export let date = new Date();

	let internal;

	const input = (x) => (internal = dayjs(x).format(format));
	const output = (x) => (date = dayjs(x, format).toDate());

	$: input(date);
	$: output(internal);
</script>

<input bind:value={internal} type="date" class="form-input px-4 py-3 w-80 rounded-full" />
