<script>
	import ServerCreation from '$lib/components/management/create/server-creation.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
	$: jarsPath = data.jarsPath;
	$: softwares = data.softwares;
	$: javaVersions = data.javaVersions;
</script>

<div class="h-full w-full grid place-items-center">
	<div class="pb-32">
		<ServerCreation {jarsPath} {softwares} {javaVersions}></ServerCreation>
	</div>
</div>
