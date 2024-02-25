import { getAuth } from './getAuth';

export const isUserLoggedIn = (/** @type {import("@sveltejs/kit").Cookies} */ cookies) => {
	const authObject = getAuth(cookies);

	// @ts-ignore
	if (authObject.session) {
		return true;
	}
	return false;
};
