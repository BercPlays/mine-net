export const getSystemDetails = async (
	/** @type {((arg0: string, arg1: { method: string; body: string; headers: { 'content-type': string; }; }) => any)} */ fetch
) => {
	const response = await fetch('/management/api/panel/getSystemDetails', {
		method: 'POST',
		body: JSON.stringify({}),
		headers: {
			'content-type': 'application/json'
		}
	});
	const json = await response.json();
	return json;
};

export default getSystemDetails;
