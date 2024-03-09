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
	return DataBaseController.run(`DELETE FROM ${tableName}`);
};
/**
 * @param {String} tableName
 * @param {number} id
 */
export const getDataBasedOnId = (tableName, id) => {
	return new Promise((resolve, reject) => {
		DataBaseController.get(`SELECT * FROM ${tableName} WHERE id = ?`, [id]).then((row) => {
			if (!row) reject('No row exists');
			resolve(row);
		});
	});
};

/**
 * @param {String} tableName
 * @param {String} value
 * @param {String} fieldName
 */
export const getDataBasedOnValue = (tableName, fieldName, value) => {
	return new Promise((resolve, reject) => {
		DataBaseController.get(`SELECT * FROM ${tableName} WHERE ${fieldName} = ?`, [value]).then(
			(row) => {
				if (!row) reject('No row exists');
				resolve(row);
			}
		);
	});
};

/**
 * @param {String} tableName
 * @param {String} value
 * @param {String} fieldName
 */
export const deleteTableBasedOnValue = (tableName, fieldName, value) => {
	return DataBaseController.run(`DELETE FROM ${tableName} WHERE ${fieldName} = ?`, [value]);
};

/**
 * @param {String} tableName
 * @param {String} value
 * @param {String} fieldName
 * @param {String} modifyColumn
 * @param {String | number} modifyValue
 */
export const modifyBasedOnValue = (tableName, fieldName, value, modifyColumn, modifyValue) => {
	return DataBaseController.run(
		`UPDATE ${tableName} SET ${modifyColumn} = ${typeof modifyValue == 'string' ? `'${modifyValue}'` : modifyValue} WHERE ${fieldName} = ?`,
		[value]
	);
};

/**
 *
 * @param {String} tableName
 */
export const getAllEntriesInTable = (tableName) => {
	// @ts-ignore
	return new Promise((resolve, reject) => {
		DataBaseController.all(`SELECT * FROM ${tableName}`).then((row) => {
			if (!row) reject('No row exists');
			resolve(row);
		});
	});
};
