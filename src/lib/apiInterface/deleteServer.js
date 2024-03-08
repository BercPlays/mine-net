/**
 *
 * @param {String} serverName
 */

const deleteServer = async (serverName) => {
	const response = await fetch('/management/api/panel/deleteServer', {
		method: 'POST',
		body: JSON.stringify({ serverName: serverName }),
		headers: {
			'content-type': 'application/json'
		}
	});
	const json = await response.json();
	return json;
};

export default deleteServer;
