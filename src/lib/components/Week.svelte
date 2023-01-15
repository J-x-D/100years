<script lang="ts">
	import dayjs from 'dayjs';
	import weekYear from 'dayjs/plugin/weekYear';
	import weekOfYear from 'dayjs/plugin/weekOfYear';
	import Modal from 'svelte-simple-modal';
	import { getContext } from 'svelte';
	import Popup from './Popup.svelte';

	dayjs.extend(weekOfYear);
	dayjs.extend(weekYear);

	export let weekNumber;
	export let yearNumber;
	export let date;

	let isBefore = false;
	let isToday = false;
	$: {
		const birthday = date;

		const birthdayWeek = dayjs(birthday).week();
		const birthdayYear = dayjs(birthday).year();

		const year = yearNumber + birthdayYear;

		isBefore =
			dayjs().year() > year || (dayjs().year() >= year && dayjs().week() >= weekNumber + 1);

		isToday = dayjs().week() === weekNumber + 1 && dayjs().year() === year;
	}

	const { open } = getContext('simple-modal');
	const showSurprise = () =>
		open(Popup, {
			message: `${weekNumber} ${year}`
		});
</script>

<div>
	<span on:click={showSurprise} class="flex h-3 w-3">
		<span
			class="absolute inline-flex h-3 w-3 rounded-full opacity-75"
			class:bg-sky-900={isBefore && !isToday}
			class:animate-ping={isToday}
			class:bg-red-400={isToday}
		/>
		<span
			class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"
			class:bg-sky-900={isBefore && !isToday}
			class:bg-red-400={isToday}
		/>
	</span>
</div>
