export const getAuth = (/** @type {import("@sveltejs/kit").Cookies} */ cookies) => {
	const session = cookies.get('minenet-session-auth');

	const username = session?.split(';')[0];
	const password = session?.split(';')[1];

	return {
		username: username,
		password: password,
		session: session
	};
};
