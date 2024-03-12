<script>
	import getSystemDetails from '$lib/apiInterface/getSystemDetails';
	import poll from '$lib/poll';
	import { onMount } from 'svelte';

	const f = fetch;

	let sysInfo = getSystemDetails(f);

	poll(async function fetchData() {
		sysInfo = await getSystemDetails(f);
	}, 1000);

	/**
	 * @param {number} seconds
	 */
	function formatTime(seconds) {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const remainingSeconds = seconds % 60;

		const formattedTime = `${hours}h ${minutes}m ${remainingSeconds}s`;
		return formattedTime;
	}
</script>

<div class="p-5">
	<div
		class="w-full pl-4 py-3 bg-slate-800 rounded-lg shadow-2xl flex flex-col justify-center"
		id="info-panel"
	>
		{#await sysInfo}
			<strong class="text-2xl">Fetching data...</strong>
		{:then info}
			<strong class="text-2xl">Host machine info</strong>

			<p class="flex flex-row justify-start text-purple-400 text-sm">
				<span class="material-symbols-rounded pr-1 text-purple-400 text-sm">computer</span>System
			</p>
			<p class="flex flex-row justify-start text-purple-400 text-sm">
				- Platform {info.platform}
			</p>
			<p class="flex flex-row justify-start text-purple-400 text-sm">
				- Uptime {formatTime(Math.round(info.sysUptime))}
			</p>
			<p class="flex flex-row justify-start text-purple-400 text-sm">
				- MineNet Uptime {formatTime(Math.round(info.uptime))}
			</p>

			<p class="flex flex-row justify-start text-sky-400 text-sm">
				<span class="material-symbols-rounded pr-1 text-sky-400 text-sm">
					memory</span
				>{info.cpuName}
			</p>

			<p class="flex flex-row justify-start text-sky-400 text-sm">
				- {Math.round(info.cpuUsage)}% usage
			</p>
			<p class="flex flex-row justify-start text-sky-400 text-sm">
				- {info.cpuCount} Cores
			</p>
			<p class="flex flex-row justify-start text-sky-400 text-sm">
				- {info.cpuThreads} Threads
			</p>

			<p class="flex flex-row justify-start text-yellow-400 text-sm">
				<span class="material-symbols-rounded pr-1 text-yellow-400 text-sm">memory_alt</span>
				Memory Used {info.totalmem - info.freemem}mb / {info.totalmem}mb ({Math.round(
					((info.totalmem - info.freemem) / info.totalmem) * 100
				)}%)
			</p>
		{/await}
	</div>
</div>
