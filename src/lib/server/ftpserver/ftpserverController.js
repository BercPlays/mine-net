import { FTP_HOST, FTP_PORT } from '$env/static/private';

import * as ftp from 'ftp-srv';
const { FtpSrv, GeneralError } = ftp;
import resolverFunction from './resolver';
import { mnprint } from '../mnPrint';
import { assert } from 'console';
import { mineNetServersFolder } from '../importantDirs';

class FTPServerController {
	static _start() {
		assert(!this._started, 'FTP Server is already running!');
		this._baseServer = new FtpSrv({
			url: `ftp://${this._host}:${this._port}`,
			// @ts-ignore
			pasv_url: resolverFunction,
			greeting: 'Welcome to MineNet ftp!',
			anonymous: false,
			whitelist: [
				'USER',
				'PASS',
				'PWD',
				'LIST',
				'DELE',
				'PASV',
				'CWD',
				'STOR',
				'MKD',
				'ABOR',
				'TYPE',
				'RETR'
			]
		});
		this._started = true;

		this._baseServer.on('login', ({ connection, username, password }, resolve, reject) => {
			if (username === 'anonymous' && password === 'anonymous') {
				return resolve({ root: mineNetServersFolder });
			}
			return reject(new GeneralError('Invalid username or password', 401));
		});

		this._baseServer.listen().then(() => {
			mnprint('Launching ftp server...');
		});
	}
	static _shutdown() {
		if (!this._started) return;
		mnprint('Stopping ftp server...');
		this._baseServer?.close();
		this._started = false;
	}
}

FTPServerController._started = false;
FTPServerController._port = FTP_PORT;
FTPServerController._host = FTP_HOST;

export default FTPServerController;
