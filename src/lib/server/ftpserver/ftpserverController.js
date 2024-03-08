import { FTP_HOST, FTP_PORT } from '$env/static/private';

import * as ftp from 'ftp-srv';
const { FtpSrv } = ftp;
import * as errors from 'ftp-srv/src/errors';
import resolverFunction from './resolver';
import { mnprint } from '../mnPrint';
import { assert } from 'console';
import { mineNetServersFolder } from '../importantDirs';
import { getDataBasedOnValue } from '../database/databaseActions';
import path from 'path';

class FTPServerController {
	static start() {
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

		this._baseServer.on('login', async ({ connection, username, password }, resolve, reject) => {
			try {
				const credentialData = await getDataBasedOnValue('ftpCredentials', 'username', username);
				if (!credentialData) throw new Error();
				if (credentialData.password != password) throw new Error();
				return resolve({ root: path.join(mineNetServersFolder, credentialData.username) });
			} catch (error) {
				return reject(new errors.GeneralError('Invalid username or password', 401));
			}
		});

		this._baseServer.listen().then(() => {
			mnprint('Launching ftp server...');
		});
	}
	static shutdown() {
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
