export const serverExists = async (
	/** @type {string} */ name,
	/** @type {((arg0: string, arg1: { method: string; body: string; headers: { 'content-type': string; }; }) => any)} */ fetch
) => {
	const response = await fetch('/api/panel/serverExists', {
		method: 'POST',
		body: JSON.stringify({ serverName: name }),
		headers: {
			'content-type': 'application/json'
		}
	});
	const json = await response.json();
	return json;
};
