class GlobalContainers {
	/**
	 * @param {import('dockerode').Container} container
	 * @param {String} containerName
	 */
	static addContainer(container, containerName) {
		this.containers[containerName] = container;
	}

	/**
	 * @param {String} containerName
	 */
	static removeContainer(containerName) {
		delete this.containers[containerName];
	}
	/**
	 * @param {String} containerName
	 * @returns {import('dockerode').Container}
	 */
	static getContainer(containerName) {
		return this.containers[containerName];
	}
}

/**
 * @type {Object.<string,import('dockerode').Container>}
 */
GlobalContainers.containers = {};

export default GlobalContainers;
