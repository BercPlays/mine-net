import os from 'os-utils';
import baseos from 'node:os';

const getCpuPercent = () => {
	return new Promise((resolve) => {
		os.cpuUsage((usage) => {
			resolve(usage);
		});
	});
};

const getSystemDetails = async () => {
	return {
		platform: os.platform(),
		uptime: os.processUptime(),
		sysUptime: os.sysUptime(),
		totalmem: Math.round(os.totalmem()),
		freemem: Math.round(os.freemem()),
		cpuUsage: (Math.floor((await getCpuPercent()) * 100) / 100) * 100,
		cpuCount: os.cpuCount() / 2,
		cpuThreads: os.cpuCount(),
		cpuName: baseos.cpus()[0].model.trim()
	};
};

export default getSystemDetails;
