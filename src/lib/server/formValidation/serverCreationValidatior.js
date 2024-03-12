import javaVersionExists from '../panelUtils/validation/javaVersionExists';
import { serverExists } from '../panelUtils/validation/serverExists';
import softwareFileExists from '../panelUtils/validation/softwareFileExists';

const serverCreationValidatior = (
	/** @type {string} */ serverName,
	/** @type {string} */ serverFile,
	/** @type {string} */ javaVersion
) => {
	return new Promise((resolve) => {
		Promise.all([
			javaVersionExists(javaVersion),
			softwareFileExists(serverFile),
			serverExists(serverName)
		]).then((chainedValues) => {
			resolve(!chainedValues[2] && chainedValues[0] && chainedValues[1]);
		});
	});
};

export default serverCreationValidatior;
