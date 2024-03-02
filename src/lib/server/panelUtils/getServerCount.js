import { getTableCount } from '../database/databaseActions';

const getServerCount = () => {
	return getTableCount('servers');
};

export default getServerCount;
