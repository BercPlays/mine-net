import { WEB_PASSWORD, WEB_USERNAME } from '$env/static/private';

export const validateUser = (/** @type {string} */ user, /** @type {string} */ pass) => {
	return WEB_USERNAME == user && WEB_PASSWORD == pass;
};
