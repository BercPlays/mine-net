<script>
	import getAllServers from '$lib/apiInterface/getAllServers';
	import poll from '$lib/poll';
	import ServerCard from './server-card.svelte';
	import { onMount } from 'svelte';

	const f = fetch;
	/** @type {HTMLElement} */
	let slider;
	let isDown = false;
	/** @type {number} */
	let startX;
	/** @type {number} */
	let scrollLeft;

	/**
	 * @type {Object | any}
	 */
	let serverDataPromise = getAllServers(f);

	poll(async function fetchData() {
		serverDataPromise = await getAllServers(f);
	}, 6500);

	onMount(async () => {
		slider.addEventListener('mousedown', (e) => {
			isDown = true;
			startX = e.pageX - slider.offsetLeft;
			scrollLeft = slider.scrollLeft;
		});

		slider.addEventListener('mouseleave', () => {
			isDown = false;
		});

		slider.addEventListener('mouseup', () => {
			isDown = false;
		});

		// @ts-ignore
		slider.addEventListener('mousemove', (e) => {
			if (!isDown) return;
			e.preventDefault();
			const x = e.pageX - slider.offsetLeft;
			const walk = (x - startX) * 1.5;
			slider.scrollLeft = scrollLeft - walk;
		});
	});
</script>

<div
	class="bg-slate-800 p-4 scroll-px-0 snap-mandatory flex gap-4 overflow-x-auto"
	bind:this={slider}
>
	{#await serverDataPromise}
		<p class="text-white">Fetching data...</p>
	{:then serverData}
		{#if serverData.length == 0}
			<p class="text-white">No available servers!</p>
			<p class="text-white/70">Click the 'Create Server' button to get started!</p>
		{:else}
			{#each serverData as item}
				<ServerCard name={item.name} software={item.software} online={item.status}></ServerCard>
			{/each}
		{/if}
	{/await}
</div>
