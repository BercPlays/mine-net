import { getDataBasedOnValue } from '../database/databaseActions';

/**
 *
 * @param {String} username
 */
const getFtpCredentials = async (username) => {
	return await getDataBasedOnValue('ftpCredentials', 'username', username);
};

export default getFtpCredentials;
