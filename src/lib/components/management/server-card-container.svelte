<script>
	import ServerCard from './server-card.svelte';
	import { onMount } from 'svelte';

	/** @type {HTMLElement} */
	let slider;
	let isDown = false;
	/** @type {number} */
	let startX;
	/** @type {number} */
	let scrollLeft;

	/**
	 * @type {string | any[]}
	 */
	export let serverData = [];

	onMount(() => {
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
	{#if serverData.length == 0}
		<p class="text-white">No available servers!</p>
		<p class="text-white/70">Click the 'Create Server' button to get started!</p>
	{:else}
		{#each serverData as item}
			<ServerCard name={item.serverName} software={item.softwareFile} online={item.online}
			></ServerCard>
		{/each}
	{/if}
</div>
