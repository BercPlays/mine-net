<script>
	import { page } from '$app/stores';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	const drawerStore = getDrawerStore();
	function drawerClose() {
		drawerStore.close();
	}
</script>

<nav class="list-nav p-4">
	<ul>
		<!-- {#if !($page.url.pathname == '/management')}
			
		{/if} -->
		<li><a on:click={drawerClose} href="/management">Server List 📃</a></li>

		<li><a on:click={drawerClose} href="/management/create">Create Server 🔨</a></li>
		<form action="/management/api/logout" method="POST">
			<li><button class="w-full">Logout 🚪</button></li>
		</form>
	</ul>
</nav>
