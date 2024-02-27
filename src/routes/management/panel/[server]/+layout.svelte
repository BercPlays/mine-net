<script>
	import { AppRail, AppRailAnchor, AppRailTile } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';

	/** @type {String} */
	const serverName = $page.params.server;

	/** @type {number} */
	let currentTile = 0;

	let anchors = [
		{
			icon: 'lan',
			title: 'Panel',
			href: '/'
		}
	];
</script>

<div class="flex h-full">
	<AppRail>
		<svelte:fragment slot="lead">
			<div class="w-full my-3 flex flex-col">
				<p class="material-symbols-rounded text-center text-2xl">deployed_code</p>
				<p class="text-center text-xs">{serverName}</p>
			</div>
		</svelte:fragment>
		<!-- --- -->
		{#each anchors as anchor}
			<AppRailAnchor href={anchor.href} target="_blank" title={anchor.title}>
				<svelte:fragment slot="lead">
					<span class="material-symbols-rounded">{anchor.icon}</span>
				</svelte:fragment>
				<span>{anchor.title}</span>
			</AppRailAnchor>
		{/each}
	</AppRail>
	<slot />
</div>
