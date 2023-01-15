<script lang="ts">
	import Week from '$lib/components/Week.svelte';
	import DateInput from '$lib/components/DateInput.svelte';
	import Modal from 'svelte-simple-modal';
	import dayjs from 'dayjs';
	import weekYear from 'dayjs/plugin/weekYear';
	import weekOfYear from 'dayjs/plugin/weekOfYear';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	dayjs.extend(weekOfYear);
	dayjs.extend(weekYear);

	const weeksOfYear = Array.from({ length: 52 }).map((_, index) => index);

	const hundredYears = Array.from({ length: 100 }).fill(weeksOfYear);

	let date = new Date('1995-03-07');
	let usedFromStore = false;

	$: {
		const weeks = dayjs(date).week();
		const numberOfWeeks = Array.from({ length: 52 - weeks + 1 }).map(
			(_, index) => index + weeks - 1
		);
		hundredYears[0] = numberOfWeeks;
		hundredYears[99] = Array.from({ length: weeks }).map((_, index) => index);

		if (browser && usedFromStore) {
			localStorage.setItem('date', date.toISOString());
		}
	}

	onMount(() => {
		const storedDate = localStorage.getItem('date');
		console.log(storedDate);
		if (storedDate) {
			date = new Date(storedDate);
			usedFromStore = true;
		}
	});
</script>

<div class="lg:p-5 py-10 grid place-items-center">
	<div class="mb-10 grid place-items-center">
		<h1 class="text-red-500 italic mb-5">
			"The bad news is time flies. The good news is you're the pilot."
		</h1>
		<DateInput bind:date />
	</div>
	<div class="flex flex-col gap-1 lg:flex-row">
		{#each hundredYears as weeks, yearIndex}
			<div class="flex flex-row gap-1 lg:flex-col custom_year">
				{#each weeks as week, index}
					<Modal>
						<Week {date} weekNumber={week} yearNumber={yearIndex} />
					</Modal>
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	.custom_year:first-child {
		justify-content: flex-end;
	}
</style>
