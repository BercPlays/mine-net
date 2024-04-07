import { DOCKER_IMAGE } from '$env/static/private';
import dockerApi from 'dockerode';

class DockerApi {
	static getVolumes() {
		return new Promise((resolve) => {
			this._api.listVolumes((_, data) => {
				resolve(data);
			});
		});
	}
	/**
	 *
	 * @param {String} volumeName
	 */
	static createVolume(volumeName) {
		return new Promise((resolve) => {
			// @ts-ignore
			this._api.createVolume({ Name: volumeName, Labels: null, DriverOpts: null }, () => {
				resolve(undefined);
			});
		});
	}
	/**
	 * @param {((event: *) => void) | undefined} onProgress
	 */
	static pullImage(onProgress) {
		return new Promise((resolve) => {
			this._api.pull(
				DOCKER_IMAGE,
				(/** @type {Error} */ _, /** @type {NodeJS.ReadableStream} */ stream) => {
					// @ts-ignore
					this._api.modem.followProgress(stream, onFinished, onProgress);

					/**
					 * @param {Error} _
					 * @param {[]} output
					 */
					function onFinished(_, output) {
						resolve(output);
					}
				}
			);
		});
	}
	static listImages() {
		return new Promise((resolve) => {
			this._api.listImages((err, data) => {
				resolve(data);
			});
		});
	}
	static listVolumes() {
		return new Promise((resolve) => {
			this._api.listVolumes((err, data) => {
				resolve(data);
			});
		});
	}
	/**
	 * @param {String} containerName
	 * @param {import('dockerode').PortMap | undefined} portBindings
	 * @param {String[] | undefined} binds
	 * @param {String[]} cmd
	 * @param {String} cwd
	 * @returns {Promise<import('dockerode').Container>}
	 */
	static createContainer(containerName, portBindings, binds, cwd, cmd) {
		//EXPOSED PORT
		//VOLUMES
		//SERVER VOLUME
		//REMOVE AFTER CONTAINER EXIT
		return new Promise((resolve) => {
			this._api
				.createContainer({
					name: containerName,
					Image: DOCKER_IMAGE,
					AttachStdin: false,
					AttachStdout: true,
					AttachStderr: true,
					Tty: true,
					WorkingDir: cwd,

					HostConfig: {
						Binds: binds,
						// Mounts: [
						// 	{
						// 		Target: '/app/jvs',
						// 		Source: mineNetJavaVersionsFolder,
						// 		Type: 'volume',
						// 		ReadOnly: false
						// 	},
						// 	{
						// 		Target: '/app/jfs',
						// 		Source: mineNetJarsFolder,
						// 		Type: 'volume',
						// 		ReadOnly: false
						// 	}
						// ],
						AutoRemove: true,

						PortBindings: portBindings
					},

					Cmd: cmd,
					OpenStdin: false,
					StdinOnce: false
				})
				.then(resolve);
		});
	}
	/**
	 * @param {String} containerName
	 * @param {import('dockerode').PortMap | undefined} portBindings
	 * @param {String[] | undefined} binds
	 * @param {String[]} cmd
	 * @param {String} cwd
	 * @returns {Promise<import('dockerode').Container>}
	 */
	static run(containerName, portBindings, binds, cwd, cmd) {
		return new Promise((resolve) => {
			this._api
				.run(DOCKER_IMAGE, cmd, process.stdout, {
					name: containerName,
					AttachStdin: false,
					AttachStdout: true,
					AttachStderr: true,
					Tty: true,
					WorkingDir: cwd,
					HostConfig: {
						Binds: binds,
						AutoRemove: true,
						PortBindings: portBindings
					},
					Cmd: cmd,
					OpenStdin: false,
					StdinOnce: false
				})
				.then(function (data) {
					var container = data[1];
					resolve(container);
				});
		});
	}
}
DockerApi._api = new dockerApi({
	socketPath: '/var/run/docker.sock'
});
DockerApi.updatingImage = true;

export default DockerApi;
