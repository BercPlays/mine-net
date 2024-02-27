<script>
	import { onMount } from 'svelte';

	export let name = 'Error';
	export let software = 'Error';
	export let online = false;

	/**
	 * @type {HTMLElement}
	 */
	let cardHtml;
	onMount(() => {
		cardHtml.classList.remove('from-zinc-500');
		online ? cardHtml.classList.add('from-green-500') : cardHtml.classList.add('from-red-500');
	});
</script>

<div
	class="card w-72 h-96 bg-center bg-cover snap-center overflow-clip shrink-0 hover:shadow-2xl hover:scale-105 transition ease-out"
	id="card"
>
	<div class="h-full w-full bg-gradient-to-tr from-zinc-500" bind:this={cardHtml}>
		<a href="/management/panel/{name}">
			<div class="h-full w-full flex flex-col justify-end p-4">
				<strong class="text-2xl">{name}</strong>
				<p class="text-xs text-white/70">Using {software}</p>
			</div>
		</a>
	</div>
</div>

<style>
	#card {
		background-image: url('/panel/card-bg.webp');
	}
</style>
