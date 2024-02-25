<script>
	export const name = 'Test server';
	export const software = 'Paper 433';
	export const version = '1.12.2';
</script>

<div
	class="card w-72 h-96 bg-center bg-cover snap-center overflow-clip shrink-0 hover:shadow-2xl hover:scale-105 transition ease-out"
	id="card"
>
	<div class="h-full w-full bg-gradient-to-tr from-green-500">
		<div class="h-full w-full flex flex-col justify-end p-4">
			<strong class="text-2xl">{name}</strong>
			<p class="text-xs text-white/70">Minecraft {version}</p>
			<p class="text-xs text-white/70">{software}</p>
		</div>
	</div>
</div>

<style>
	#card {
		background-image: url('/panel/card-bg.webp');
	}
</style>
