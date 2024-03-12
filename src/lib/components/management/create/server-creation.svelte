<script>
	import { goto } from '$app/navigation';
	import serverCreationValidatior from '$lib/apiInterface/formValidation/serverCreationValidatior';
	import { converToValidServerName } from '$lib/nameUtils';
	import { Autocomplete, getModalStore, popup } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();
	let version = '';
	let inputedServerName = '';
	let inputedJavaVersion = '';

	/** @type {String} */
	export let jarsPath = '';
	/** @type {String[]} */
	export let softwares = [];
	/** @type {String[]} */
	export let javaVersions = [];

	/** @type {import('@skeletonlabs/skeleton').AutocompleteOption<String>[]} */
	const versionOptions = [];
	/** @type {import('@skeletonlabs/skeleton').AutocompleteOption<String>[]} */
	const javaVersionOptions = [];

	softwares.forEach((software) => {
		if (software.split('.').pop() != 'jar') {
			return;
		}
		versionOptions.push({
			label: software,
			value: software
		});
	});

	javaVersions.forEach((javaVersion) => {
		javaVersionOptions.push({
			label: javaVersion,
			value: javaVersion
		});
	});
	/** @type {import('@skeletonlabs/skeleton').PopupSettings} */
	let popupSettingsFile = {
		event: 'focus-click',
		target: 'popupAutocompleteFile',
		placement: 'bottom'
	};
	/** @type {import('@skeletonlabs/skeleton').PopupSettings} */
	let popupSettingsJavaVersion = {
		event: 'focus-click',
		target: 'popupAutocompleteJavaVersion',
		placement: 'bottom'
	};
	/**
	 * @param {CustomEvent<import('@skeletonlabs/skeleton').AutocompleteOption<string>>} event
	 * @returns {void}
	 */
	function onVersionSelection(event) {
		version = event.detail.label;
	}
	/**
	 * @param {CustomEvent<import('@skeletonlabs/skeleton').AutocompleteOption<string>>} event
	 * @returns {void}
	 */
	function onJavaVersionSelection(event) {
		inputedJavaVersion = event.detail.label;
	}

	/**
	 * @param {String} version
	 * @param {String} serverName
	 * @param {String} javaVersion
	 */
	async function createServer(serverName, version, javaVersion) {
		const response = await fetch('/management/api/define', {
			method: 'POST',
			body: JSON.stringify({ serverName, version, javaVersion }),
			headers: {
				'content-type': 'application/json'
			}
		});
	}
	function triggerModal() {
		modalStore.trigger({
			type: 'alert',
			title: 'Invalid data',
			body: 'Please recheck your inputed data.'
		});
	}
</script>

<div class="wintry-surface-500 shadow-2xl rounded px-5 py-5 w-72 h-[120]">
	<div class="text-center">
		<strong class="text-xl">Create new server</strong>
	</div>
	<p class="text-md text-white/70">Server Name</p>
	<input
		class="input px-5 mb-2"
		title="username"
		name="username"
		type="text"
		bind:value={inputedServerName}
		autocomplete="off"
		placeholder="Name"
		maxlength="16"
	/>

	<!-- Server File -->
	<p class="text-md text-white/70">Server File</p>

	<input
		class="input mb-2"
		type="search"
		name="file"
		bind:value={version}
		use:popup={popupSettingsFile}
		autocomplete="off"
		placeholder="Versions"
		maxlength="32"
	/>

	<div
		class="card w-full max-w-60 max-h-36 p-1 overflow-y-auto"
		tabindex="-1"
		data-popup="popupAutocompleteFile"
	>
		<Autocomplete bind:input={version} options={versionOptions} on:selection={onVersionSelection} />
	</div>
	<!-- Server File -->

	<!-- Server Java Version -->
	<p class="text-md text-white/70">Server Java Version</p>
	<input
		class="input mb-2"
		type="search"
		name="file"
		bind:value={inputedJavaVersion}
		use:popup={popupSettingsJavaVersion}
		autocomplete="off"
		placeholder="Java Versions"
		maxlength="32"
	/>
	<div
		class="card w-full max-w-60 max-h-36 p-1 overflow-y-auto"
		tabindex="-1"
		data-popup="popupAutocompleteJavaVersion"
	>
		<Autocomplete
			bind:input={inputedJavaVersion}
			options={javaVersionOptions}
			on:selection={onJavaVersionSelection}
		/>
	</div>

	<!-- Server Java Version -->
	<p class="text-md text-white/70">
		Don't see your favourite server software? Ask the site provider.
	</p>
	<button
		class="btn btn-sm variant-ghost-primary mt-2 mb-2 px-6"
		on:click={async () => {
			if (
				converToValidServerName(inputedServerName).trim().length <= 0 ||
				inputedJavaVersion.length <= 0 ||
				version.length <= 0
			) {
				triggerModal();
				return;
			}

			if (await serverCreationValidatior(inputedServerName, version, inputedJavaVersion)) {
				await createServer(inputedServerName, version, inputedJavaVersion);
				goto('/');
				return;
			}
			triggerModal();
		}}>Create</button
	>
	<p class="text-xs text-white/70 mb-2">16 char limit on name field!</p>
</div>
