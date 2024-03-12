<script>
	// @ts-nocheck

	import { onMount } from 'svelte';

	export let name = 'Error';
	export let software = 'Error';
	export let online = 'CREATING';

	const statusClasses = {
		CREATING: 'from-zinc-500',
		OFFLINE: 'from-red-500',
		ONLINE: 'from-green-500'
	};
</script>

<div
	class="card w-72 h-96 bg-center bg-cover snap-center overflow-clip shrink-0 hover:shadow-2xl hover:scale-105 transition ease-out"
	id="card"
>
	<div class="h-full w-full bg-gradient-to-tr {statusClasses[online]}">
		{#if online == 'CREATING'}
			<div class="h-full w-full flex flex-col justify-end p-4">
				<strong class="text-2xl">{name}</strong>
				<p class="text-xs text-white/70">Creating server...</p>
			</div>
		{:else}
			<a href="/management/panel/{name}">
				<div class="h-full w-full flex flex-col justify-end p-4">
					<strong class="text-2xl">{name}</strong>
					<p class="text-xs text-white/70">Using {software}</p>
				</div>
			</a>
		{/if}
	</div>
</div>

<style>
	#card {
		background-image: url('/panel/card-bg.webp');
	}
</style>
