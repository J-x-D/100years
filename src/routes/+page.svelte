<script lang="ts">
	import Week from '$lib/components/Week.svelte';
	import DateInput from '$lib/components/DateInput.svelte';
	import Modal from 'svelte-simple-modal';
	import dayjs from 'dayjs';

	const weeksOfYear = Array.from({ length: 52 }).map((_, index) => index);
	const hundredYears = Array.from({ length: 100 }).fill(weeksOfYear);

	let date = new Date('1995-03-07');
</script>

<div class="p-5 grid place-items-center">
	<div class="mb-5  grid place-items-center">
		<h1 class="text-red-500 uppercase mb-2">A Lifetime</h1>
		<DateInput bind:date />
	</div>
	<div class="flex gap-1">
		{#each hundredYears as weeks, yearIndex}
			<div class="flex  flex-col gap-1">
				{#each weeks as week, index}
					<Modal>
						<Week {date} weekNumber={index} yearNumber={yearIndex} />
					</Modal>
				{/each}
			</div>
		{/each}
	</div>
</div>
