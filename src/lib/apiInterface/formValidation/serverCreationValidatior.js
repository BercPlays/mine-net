/**
 *
 * @param {String} serverName
 * @param {String} serverFile
 * @param {String} javaVersion
 */

const serverCreationValidatior = async (serverName, serverFile, javaVersion) => {
	const response = await fetch('/management/api/formValidation/serverCreationValidatior', {
		method: 'POST',
		body: JSON.stringify({
			serverName,
			serverFile,
			javaVersion
		}),
		headers: {
			'content-type': 'application/json'
		}
	});
	const json = await response.json();
	return json;
};

export default serverCreationValidatior;
