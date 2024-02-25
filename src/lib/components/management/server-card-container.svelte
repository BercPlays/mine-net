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

	let dummyData = [
		{
			id: 0,
			name: 'server-1',
			minecraft: {
				version: '1.20'
			},
			software: {
				name: 'paper',
				version: '1.43'
			}
		},
		{
			id: 1,
			name: 'studio-server',
			minecraft: {
				version: '1.12.2'
			},
			software: {
				name: 'magam',
				version: '2.69'
			}
		}
	];
	/**
	 * @param {number} index
	 */
</script>

<div
	class="bg-slate-800 p-4 scroll-px-0 snap-mandatory flex gap-4 overflow-x-auto"
	bind:this={slider}
>
	{#each Array.from({ length: 2 }) as _, i}
		<ServerCard></ServerCard>
	{/each}
</div>
