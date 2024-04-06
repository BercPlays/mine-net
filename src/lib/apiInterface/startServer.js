export const startServer = async (/** @type {string} */ name) => {
	const response = await fetch('/management/api/panel/startServer', {
		method: 'POST',
		body: JSON.stringify({ serverName: name }),
		headers: {
			'content-type': 'application/json'
		}
	});
	const json = await response.json();
	return json;
};
