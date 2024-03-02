/**
 * @param {number} length
 * @returns {Uint8Array}
 */
const generateRandomBytes = (length) => {
	return crypto.getRandomValues(new Uint8Array(length));
};

export default generateRandomBytes;
