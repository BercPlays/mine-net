<script>
	import HostInfo from '$lib/components/management/host-info.svelte';
	import ServerCardContainer from '$lib/components/management/server-card-container.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
	$: serverData = data.serverData;
</script>

<div class="mt-2">
	<ServerCardContainer {serverData}></ServerCardContainer>
	<HostInfo></HostInfo>
</div>
