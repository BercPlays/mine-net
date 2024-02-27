<script>
	import '../app.postcss';

	import { page } from '$app/stores';

	/** @type {import('./$types').PageData} */
	export let data;

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { AppBar, AppShell, storePopup } from '@skeletonlabs/skeleton';

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

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
					{#if !($page.url.pathname == '/management')}
						<a href="/management">
							<button class="btn btn-sm variant-ghost-primary px-6">Server List</button>
						</a>
					{/if}
					<a href="/management/create">
						<button class="btn btn-sm variant-ghost-secondary px-6">Create Server</button>
					</a>

					<form action="/api/logout" method="POST">
						<button class="btn btn-sm variant-ghost-error px-6">Logout</button>
					</form>
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
