<script>
	import { page } from '$app/stores';
	import ErrorAlert from '$lib/components/error-alert.svelte';
</script>

<div class="pt-2">
	<ErrorAlert status={$page.status} message={$page.error?.message}></ErrorAlert>
</div>
