const pattern = /^[a-zA-Z-]+$/;
/**
 * @param {String} name
 */
export const isValidServerName = (name) => {
	return pattern.test(name);
};

/**
 * @param {String} name
 */
export const converToValidServerName = (name) => {
	return name
		.trim()
		.replace(/[^a-zA-Z0-9\s]/g, '-')
		.replace(/-+/g, '-')
		.replace(/\s+/g, '-')
		.replace(/^-+|-+$/g, '');
};
