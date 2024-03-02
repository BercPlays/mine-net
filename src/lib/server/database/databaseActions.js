import DataBaseController from '$lib/server/database/databaseController';

/**
 * @param {String} tableName
 * @param {Object} dataSet
 */
export const createTable = (tableName, dataSet) => {
	const props = Object.entries(dataSet)
		.map(([key, value]) => `${key} ${value.type} ${value.flags}`)
		.join(',');

	return DataBaseController.run(`CREATE TABLE IF NOT EXISTS ${tableName}(${props})`);
};

/**
 * @param {String} tableName
 */
export const getTableCount = (tableName) => {
	return new Promise((resolve) => {
		DataBaseController.get(`SELECT COUNT(*) AS count FROM ${tableName}`).then((row) => {
			resolve(row.count);
		});
	});
};

/**
 * @param {String} tableName
 * @param {Object} dataSet
 */
export const insertIntoTable = (tableName, dataSet) => {
	const dataFields = Object.entries(dataSet)
		.map(([key]) => `${key}`)
		.join(',');

	const dataValues = Object.entries(dataSet)
		// eslint-disable-next-line no-unused-vars
		.map(([_, value]) => (typeof value == 'string' ? `"${value}"` : value))
		.join(',');
	return DataBaseController.run(`INSERT INTO ${tableName}(${dataFields}) VALUES(${dataValues})`);
};

/**
 * @param {String} tableName
 */
export const deleteEntriesInTable = (tableName) => {
	return DataBaseController.run(`DELETE FROM ${tableName}`)
};
