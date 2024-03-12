import getWindowsServices from './getWindowsServices';

/**
 * @param {String} serviceName
 */
const windowsServiceExists = async (serviceName) => {
	return (await getWindowsServices()).includes(serviceName);
};
export default windowsServiceExists;
