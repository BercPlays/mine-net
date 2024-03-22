<script>
	import { page } from '$app/stores';
	import getFtpCredentials from '$lib/apiInterface/getFtpCredentials';
	import getFtpLink from '$lib/apiInterface/getFtpLink';
	import { clipboard, getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	const toastStore = getToastStore();
	const modelStore = getModalStore();

	function copied() {
		toastStore.trigger({
			message: 'Copied to clipboard 📋'
		});
	}
	function ftpHelp() {
		modelStore.trigger({
			type: 'alert',
			title: 'FTP Active',
			body: 'Try setting the ftp connection to "Active" in your ftp client.'
		});
	}
	/**@type {String}*/
	let username;
	/**@type {String}*/
	let password;
	/**@type {String}*/
	let ftpLink;

	const promiseChain = Promise.all([
		getFtpCredentials($page.url.pathname.split('/')[3], fetch),
		getFtpLink(fetch)
	]);

	onMount(async () => {
		const resultPromiseChain = await promiseChain;
		let ftpCredentials = await resultPromiseChain[0];
		username = ftpCredentials.username;
		password = ftpCredentials.password;

		ftpLink = await resultPromiseChain[1];
	});
</script>

<div class="bg-slate-800 w-full h-full rounded-md p-2">
	<label class="label">
		<span>Username</span>
		<div class="flex items-center">
			<input
				class="input"
				type="text"
				placeholder="Fetching info..."
				bind:value={username}
				readonly
			/>
			<button use:clipboard={username} on:click={copied} class="btn variant-ghost-primary ml-3 px-8"
				>Copy</button
			>
		</div>
	</label>
	<label class="label">
		<span>Password</span>
		<div class="flex items-center">
			<input
				class="input"
				type="text"
				placeholder="Fetching info..."
				bind:value={password}
				readonly
			/>
			<button use:clipboard={password} on:click={copied} class="btn variant-ghost-primary ml-3 px-8"
				>Copy</button
			>
		</div>
	</label>
	{#await promiseChain}
		<p>Fetching link...</p>
	{:then}
		<a href="ftp://{ftpLink}" target="_blank">
			<button class="btn variant-ghost-primary mt-2">Open FTP application</button>
		</a>
		<button class="btn text-yellow-500" on:click={ftpHelp}>Cant connect to FTP?</button>
	{/await}
</div>
