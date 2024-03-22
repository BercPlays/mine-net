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
}
DockerApi._api = new dockerApi({
	socketPath: '/var/run/docker.sock'
});

export default DockerApi;
