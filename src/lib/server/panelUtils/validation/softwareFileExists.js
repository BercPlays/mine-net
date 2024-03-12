import { getLocalSoftwares } from '$lib/server/pageData/getLocalSoftwares';

const softwareFileExists = (/** @type {string} */ softwareFileName) => {
	// @ts-ignore
	return new Promise((resolve) => {
		if (softwareFileName.length <= 0) resolve(false);
		if (softwareFileName.length > 32) resolve(false);
		if (getLocalSoftwares().includes(softwareFileName)) resolve(true);
		resolve(true);
	});
};

export default softwareFileExists;
