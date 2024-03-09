import { exec } from 'child_process';

const getWindowsServices = () => {
	return new Promise((resolve) => {
		exec('sc query state= all', function (err, stdout) {
			var lines = stdout
				.toString()
				.split('\r\n')
				.filter(function (line) {
					return line.indexOf('SERVICE_NAME') !== -1;
				})
				.map(function (line) {
					return line.replace('SERVICE_NAME: ', '');
				});
			resolve(lines);
		});
	});
};

export default getWindowsServices;
