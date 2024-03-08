import { DNS, FTP_HOST, FTP_PORT } from '$env/static/private';

/**
 * @returns {String}
 */
const getFtpLink = () => {
	return `${DNS === 'NONE' ? FTP_HOST : DNS}:${FTP_PORT}`;
};

export default getFtpLink;
