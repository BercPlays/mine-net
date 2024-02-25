<script>
	/**
	 * @type {{ username: any; password: any; }}
	 */
</script>

<form class="wintry-surface-500 shadow-2xl rounded px-5 py-5 w-72" action="?/login" method="POST">
	<div class="text-center">
		<strong class="text-xl">Login</strong>
	</div>
	<input
		class="input mt-2 px-5"
		title="username"
		name="username"
		type="text"
		placeholder="Username"
	/>
	<input
		class="input mt-2 px-5"
		title="password"
		name="password"
		type="password"
		placeholder="Password"
	/>
	<button class="btn btn-sm variant-ghost-primary mt-2 px-6" type="submit">Login</button>
</form>
