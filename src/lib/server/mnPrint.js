import ansiColors from 'ansi-colors';

/**
 * @param {String} message
 * @returns {void}
 */
export function mnprint(message) {
	const now = new Date();
	now.getMinutes();

	const minutes = String(now.getMinutes()).padStart(2, '0');
	const hours = String(now.getHours()).padStart(2, '0');

	const currentTime = `${hours}:${minutes}`;

	console.log(
		`${ansiColors.yellowBright(`[${currentTime}]`)} ${ansiColors.green('[MINE-NET]')} ${message}`
	);
}
