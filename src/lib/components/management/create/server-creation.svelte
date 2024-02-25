<script>
	import { goto } from '$app/navigation';
	import { Autocomplete, popup } from '@skeletonlabs/skeleton';
	let version = '';
	let inputedServerName = '';

	/** @type {String} */
	export let jarsPath = '';
	/** @type {String[]} */
	export let softwares = [];

	/** @type {import('@skeletonlabs/skeleton').AutocompleteOption<String>[]} */
	const versionOptions = [];

	softwares.forEach((software) => {
		if (software.split('.').pop() != 'jar') {
			return;
		}
		versionOptions.push({
			label: software,
			value: software
		});
	});
	/** @type {import('@skeletonlabs/skeleton').PopupSettings} */
	let popupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
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
	 * @param {String} version
	 * @param {String} serverName
	 */
	async function createServer(serverName, version) {
		const response = await fetch('/api/define', {
			method: 'POST',
			body: JSON.stringify({ serverName, version }),
			headers: {
				'content-type': 'application/json'
			}
		});
	}
</script>

<form class="wintry-surface-500 shadow-2xl rounded px-5 py-5 w-72 h-[120]" autocomplete="off">
	<div class="text-center">
		<strong class="text-xl">Create new server</strong>
	</div>

	<input
		class="input mt-2 px-5 mb-2"
		title="username"
		name="username"
		type="text"
		bind:value={inputedServerName}
		placeholder="Server name"
	/>
	<p class="text-md text-white/70">Server File</p>
	<input
		class="input mb-2"
		type="search"
		name="file"
		bind:value={version}
		use:popup={popupSettings}
		placeholder="Versions"
	/>
	<p class="text-xs text-white/70 mb-2">{jarsPath}</p>
	<div
		class="card w-full max-w-60 max-h-36 p-1 overflow-y-auto"
		tabindex="-1"
		data-popup="popupAutocomplete"
	>
		<Autocomplete bind:input={version} options={versionOptions} on:selection={onVersionSelection} />
	</div>
	<!-- <p class="text-md text-white/70">Server Software</p> -->
	<!-- <ListBox>
		<ListBoxItem bind:group={softwareSelection} name="medium" value="vanilla">Vanilla</ListBoxItem>
		<ListBoxItem bind:group={softwareSelection} name="medium" value="spigot"
			>Spigot (Plugins)</ListBoxItem
		>
		<ListBoxItem bind:group={softwareSelection} name="medium" value="paper"
			>Paper (Plugins)</ListBoxItem
		>
		<ListBoxItem bind:group={softwareSelection} name="medium" value="purpur"
			>Purpur (Plugins)</ListBoxItem
		>
		<ListBoxItem bind:group={softwareSelection} name="medium" value="fabric"
			>Fabric (Mods)</ListBoxItem
		>
		<ListBoxItem bind:group={softwareSelection} name="medium" value="forge"
			>Forge (Mods)</ListBoxItem
		>
		<ListBoxItem bind:group={softwareSelection} name="medium" value="magma"
			>Magma (Mods, Plugins)</ListBoxItem
		>
	</ListBox> -->
	<p class="text-md text-white/70">
		Don't see your favourite server software? Ask the site provider.
	</p>
	<button
		class="btn btn-sm variant-ghost-primary mt-2 px-6"
		on:click={async () => {
			await createServer(inputedServerName, version);
			console.log('a');
			goto('/');
			console.log('l');
		}}>Create</button
	>
</form>
