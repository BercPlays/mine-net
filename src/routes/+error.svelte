<script>
	import { page } from '$app/stores';
	import ErrorAlert from '$lib/components/error-alert.svelte';
	import { onMount } from 'svelte';

	onMount(async () => {
		var audio = await new Audio('/funky.ogg');
		audio.play();
	});
</script>

<div class="h-full w-full grid place-items-center">
	<div class="pb-32">
		<ErrorAlert status={$page.status} message={$page.error?.message}></ErrorAlert>
	</div>
</div>
