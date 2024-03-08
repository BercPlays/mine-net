<script>
	import { AppRail, AppRailAnchor, AppRailTile } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';

	/** @type {import('./$types').PageData} */
	export let data;

	/** @type {String} */
	const serverName = $page.params.server;

	let anchors = [
		{
			icon: 'lan',
			title: 'Overview',
			href: 'overview'
		},
		{
			icon: 'terminal',
			title: 'Console',
			href: 'console',
			baseLayout: true
		},
		{
			icon: 'settings',
			title: 'Settings',
			href: 'settings'
		},
		{
			icon: 'cloud_done',
			title: 'Backups',
			href: 'backups'
		},
		{
			icon: 'folder_shared',
			title: 'FTP',
			href: 'ftp'
		}
	];
	/**
	 * @param {String} href
	 */
	function hasBaseLayout(href) {
		for (const anchor of anchors) {
			if (anchor.href === href) {
				return anchor.baseLayout === true;
			}
		}

		return false;
	}
</script>

<div class="flex h-full w-full relative">
	<div class="fixed h-full">
		<AppRail>
			<svelte:fragment slot="lead">
				<div class="w-full my-3 flex flex-col">
					<p class="material-symbols-rounded text-center text-2xl">deployed_code</p>
					<p class="text-center text-xs">{serverName}</p>
				</div>
			</svelte:fragment>
			{#each anchors as anchor}
				<AppRailAnchor
					href="/management/panel/{serverName}/{anchor.href}"
					title={anchor.title}
					selected={$page.url.pathname === `/management/panel/${serverName}/${anchor.href}`}
					on:click={() => {}}
				>
					<svelte:fragment slot="lead">
						<span class="material-symbols-rounded">{anchor.icon}</span>
					</svelte:fragment>
					<span>{anchor.title}</span>
				</AppRailAnchor>
			{/each}
		</AppRail>
	</div>
	{#if hasBaseLayout($page.url.pathname.split('/')[4])}
		<div class="h-full w-full pl-[5rem]">
			<slot />
		</div>
	{:else}
		<div class="h-full w-full p-8 pl-28">
			<div class="h-full w-full bg-slate-800/30 rounded-lg shadow-2xl">
				<div class="w-full h-8 rounded-t-lg bg-slate-800 flex items-center p-2">
					<span class="material-symbols-rounded text-sm">description</span>
					<p class="text-xs text-white/70 pl-2">{$page.url.pathname.split('/')[4]}.exe</p>
					<div class="w-full flex justify-end">
						<span class="material-symbols-rounded text-sm">close</span>
					</div>
				</div>

				<div class="w-full min-h-full p-5 overflow-y overflow-auto">
					<slot />
				</div>
			</div>
		</div>
	{/if}
</div>
