import { getAllEntriesInTable } from '../database/databaseActions';

const getAllServers = async () => {
	return await getAllEntriesInTable('servers');
};

export default getAllServers;
