import { onMount } from 'svelte';

/**
 * @param {() => void} fn
 * @param {number | undefined} ms
 */
function poll(fn, ms) {
	onMount(() => {
		const interval = setInterval(fn, ms);
		fn();

		return () => clearInterval(interval);
	});
}

export default poll;
