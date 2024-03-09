import { MAIN_DB_PATH } from '$env/static/private';
import sqlite3 from 'sqlite3';
const { Database, OPEN_READWRITE } = sqlite3.verbose();

class DataBaseController {
	/**
	 * @param {((arg0: Error | null) => void) | undefined} [callback]
	 */
	static _connect(callback) {
		this._baseDb = new Database(MAIN_DB_PATH, OPEN_READWRITE, (err) => {
			if (callback) callback(err);
		});
	}
	/**
	 * @param {((arg0: Error | null) => void) | undefined} [callback]
	 */
	static _disconnect(callback) {
		this._baseDb?.close((err) => {
			if (callback) callback(err);
		});
	}
	/**
	 * Performs a POST on the database
	 * @param {string} command
	 * @param {any[] | undefined} [params]
	 */
	static run(command, params) {
		return new Promise((resolve, reject) => {
			DataBaseController._connect();
			DataBaseController._baseDb?.get(command, params, (err) => {
				if (err) reject(err.message);
				resolve(undefined);
			});
		});
	}

	/**
	 * Performs a GET on the database
	 * @param {string} command
	 * @param {any[] | undefined} [params]
	 */
	static get(command, params) {
		return new Promise((resolve, reject) => {
			DataBaseController._connect();
			DataBaseController._baseDb?.get(command, params, (err, row) => {
				if (err) reject(err.message);
				resolve(row);
			});
			DataBaseController._disconnect();
		});
	}
	/**
	 * Performs a database Query
	 * @param {string} command
	 * @param {any[] | undefined} [params]
	 */
	static all(command, params) {
		return new Promise((resolve, reject) => {
			DataBaseController._connect();
			DataBaseController._baseDb?.all(command, params, (err, row) => {
				if (err) reject(err.message);
				resolve(row);
			});
			DataBaseController._disconnect();
		});
	}
}

/** @type {import('sqlite3').Database} */
DataBaseController._baseDb;

export default DataBaseController;
