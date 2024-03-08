export const getFtpCredentials = async (
	/** @type {string} */ username,
	/** @type {((arg0: string, arg1: { method: string; body: string; headers: { 'content-type': string; }; }) => any)} */ fetch
) => {
	const response = await fetch('/management/api/panel/getFtpCredentials', {
		method: 'POST',
		body: JSON.stringify({ username: username }),
		headers: {
			'content-type': 'application/json'
		}
	});
	const json = await response.json();
	return json;
};

export default getFtpCredentials;
