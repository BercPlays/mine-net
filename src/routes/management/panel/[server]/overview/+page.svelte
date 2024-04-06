<script>
	import { getModalStore, popup } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();

	import { page } from '$app/stores';
	import deleteServer from '$lib/apiInterface/deleteServer';
	import { goto } from '$app/navigation';
	import { startServer } from '$lib/apiInterface/startServer';

	/** @type {import('./$types').PageData} */
	export let data;
	/**
	 * @type {import('@skeletonlabs/skeleton').PopupSettings}
	 */
	const popupClick = {
		event: 'click',
		target: 'popupClick',
		placement: 'bottom'
	};

	/**
	 * @type {import('@skeletonlabs/skeleton').ModalSettings}
	 */
	const modal = {
		type: 'prompt',
		// Data
		title: 'Delete server?',
		body: `Enter the server name to delete it. (${$page.url.pathname.split('/')[3]})`,
		value: '',
		valueAttr: { type: 'text', minlength: 1, maxlength: 32, required: true },
		/**
		 * @param {String | Boolean} r
		 */
		response: async (r) => {
			if (r === false) return;
			if (r != $page.url.pathname.split('/')[3]) return;
			// @ts-ignore
			const res = await deleteServer(r);
			if (res == 'error') return;
			goto('/');
		}
	};
</script>

<div
	class="bg-slate-800 w-full h-36 rounded-md p-2 bg-gradient-to-t from-red-500/30 flex items-center flex-col relative"
>
	<button class="btn absolute left-0 bottom-0" use:popup={popupClick}>
		<span class="material-symbols-rounded relative p-0 m-0">settings</span>
	</button>

	<p class="w-full text-center text-xl"><strong>exampleip.ddns.net</strong></p>
	<p class="w-full text-center text-md pb-10 text-red-500">Offline</p>
	<button
		class="btn btn-sm variant-ghost-primary px-6"
		on:click={() => {
			startServer($page.url.pathname.split('/')[3]);
		}}>Launch Server</button
	>
</div>

<!-- Popup -->
<div class="card p-4 max-w-sm" data-popup="popupClick">
	<div class="grid grid-cols-1 gap-2">
		<button
			class="btn variant-ghost-error"
			on:click={() => {
				modalStore.trigger(modal);
			}}>Delete server</button
		>
	</div>
	<div class="arrow bg-surface-100-800-token" />
</div>
