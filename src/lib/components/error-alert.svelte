<script>
	import { getRandom } from '$lib/math/getRandom';
	import { onMount } from 'svelte';

	export let status = 404;
	export let message = '';

	let errorQuote = '...';

	let errorQuotes = [
		'idk',
		'what is bro doing 💀',
		'how does cirno do that???',
		'legalize nuclear bombs',
		'is this the SHADOW REALM?',
		'funky 😎',
		'did the website blow up?',
		'I CANT TAKE THIS ANYMORE 😡😡',
		'clinically insane',
		'welcome to moms basement',
		'right behind you',
		'unlock the front door 👉👈🥺',
		'npm install plshelpmeimtrappedinthebasement-js',
		'STOP, wait a minute...',
		'no maidens??'
	];

	onMount(() => {
		errorQuote = errorQuotes[getRandom(0, errorQuotes.length - 1)];
	});
</script>

<div class="wintry-surface-500 shadow-2xl rounded px-5 py-5 pb-">
	<div class="flex flex-col">
		<strong class="text-xl text-center p-0">{status} : {message}</strong>
		<p class="text-xs text-center text-white/70 mb-2 quote">
			{errorQuote}
		</p>
		<div class="flex justify-center w-full">
			<img class="w-16 h-16" src="/cirno.gif" alt="" />
		</div>
	</div>
</div>

<style>
	p.quote {
		quotes: '“' '”' '‘' '’';
		font-style: italic;
	}
	p.quote:before {
		content: open-quote;
	}
	p.quote:after {
		content: close-quote;
	}
</style>
