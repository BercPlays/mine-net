<script>
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import {
		AppBar,
		AppShell,
		Drawer,
		Modal,
		Toast,
		initializeStores,
		storePopup,
		getDrawerStore
	} from '@skeletonlabs/skeleton';
	initializeStores();
	const drawerStore = getDrawerStore();

	import '../app.postcss';

	import { page } from '$app/stores';
	import Navigation from '$lib/components/navigation.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	function drawerOpen() {
		drawerStore.open({
			id: 'nav',
			width: 'w-[280px] md:w-[480px]',
			padding: 'p-4',
			bgBackdrop: 'bg-gradient-to-tr from-blue-500/20 via-cyan-500/20 to-zinc-500/20',
			rounded: 'rounded-xl'
		});
	}
</script>

<Toast />
<Drawer position="right">
	<Navigation />
</Drawer>
<Modal />

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/">
					<img class="h-12 w-12 min-h-12 min-w-12" src="/favicon.png" alt="Website icon" />
				</a>
			</svelte:fragment>

			<strong class="text-xl">MineNet</strong>

			<p class=" text-sm text-zinc-500">Software by zsigsza</p>
			<svelte:fragment slot="trail">
				{#if data.isLoggedIn}
					<button on:click={drawerOpen} class="btn">
						<span class="material-symbols-rounded">menu</span>
					</button>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft"></svelte:fragment>
	<svelte:fragment slot="sidebarRight"></svelte:fragment>
	<svelte:fragment slot="pageHeader"></svelte:fragment>
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter"></svelte:fragment>
	<svelte:fragment slot="footer"></svelte:fragment>
</AppShell>
