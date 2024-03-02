/**
 * @param {Uint8Array} bytes
 * @returns {String}
 */
const bytesToHex = (bytes) => {
	return Array.from(bytes)
		.map((byte) => ('0' + byte.toString(16)).slice(-2))
		.join('');
};

export default bytesToHex;
