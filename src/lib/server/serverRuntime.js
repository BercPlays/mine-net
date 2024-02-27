import path from 'path';
import {
	mineNetJarsFolder,
	mineNetJavaVersionsFolder,
	mineNetServersFolder
} from './importantDirs';
import { copyFile, mkdir, writeFile } from 'fs/promises';
import { mnprint } from './mnPrint';
import {
	DEFAULT_MAX_MEM,
	DEFAULT_MIN_MEM,
	JAVA_EXECUTABLE,
	USE_OPTIMIZED_FLAGS
} from '$env/static/private';
import { readFileSync } from 'fs';
import { exec } from 'child_process';
import ansiColors from 'ansi-colors';

const optimizedFlags = `-XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1NewSizePercent=30 -XX:G1MaxNewSizePercent=40 -XX:G1HeapRegionSize=8M -XX:G1ReservePercent=20 -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:InitiatingHeapOccupancyPercent=15 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 -Dusing.aikars.flags=https://mcflags.emc.gs -Daikars.new.flags=true`;

/**
 * @param {String} command
 * @param {String} cwd
 */
async function qExec(command, cwd) {
	exec(
		command,
		{
			cwd: cwd
		},
		(error, stdout, stderr) => {
			if (error) {
				mnprint(
					`${ansiColors.green('[MCServer]')} ${ansiColors.bgRed('[ERROR]')} ${ansiColors.bgRed(error.message)}`
				);
				return;
			}

			mnprint(`${ansiColors.green('[MCServer]')} ${stdout}`);
			mnprint(
				`${ansiColors.green('[MCServer]')} ${ansiColors.bgYellow('[WARN]')} ${ansiColors.bgYellow(stderr)}`
			);
		}
	);
}

/**
 * @param {String} serverFile
 * @param {String} javaVersion
 * @param {String} minMem
 * @param {String} maxMem
 * @param {boolean} useOptimizedFlags
 */

export const getServerLaunchCommand = (
	serverFile,
	javaVersion,
	minMem,
	maxMem,
	useOptimizedFlags
) => {
	const javaPath = javaVersion === 'AUTO' ? 'java' : `"${javaVersion}"`;
	const flags = useOptimizedFlags === true ? optimizedFlags : '';
	console.log(`${javaPath} -Xmx${minMem}M -Xms${maxMem}M ${flags} -jar "${serverFile}" --nogui`);

	return `${javaPath} -Xmx${maxMem}M -Xms${minMem}M ${flags} -jar "${serverFile}" --nogui`.replaceAll(
		'/\\/',
		'/'
	);
};

/**
 * @param {string} serverName
 * @param {string} softwareFile
 * @param {() => void} callback
 */
export const createBaseServerFileSystem = (serverName, softwareFile, callback) => {
	const serverFolderPath = path.join(mineNetServersFolder, serverName);
	const softwareFilePath = path.join(mineNetJarsFolder, softwareFile);
	const mnsInfoPath = path.join(serverFolderPath, 'mns-info.json');

	const mnsInfo = {
		serverName: serverName,
		softwareFile: softwareFile
	};
	mkdir(serverFolderPath).then(() => {
		mnprint(`Making directory for server ${serverName}`);
		writeFile(mnsInfoPath, JSON.stringify(mnsInfo)).then(() => {
			mnprint(`Wrote mns-info.json to server ${serverName}`);
			copyFile(softwareFilePath, path.join(serverFolderPath, softwareFile)).then(() => {
				mnprint(`Copied ${softwareFile} to server ${serverName}`);
				if (callback) callback();
			});
		});
	});
};

/**
 * @param {string} serverName
 * @param {string} javaVersion
 */
export const generateFilesForServer = (serverName, javaVersion) => {
	const serverFolderPath = path.join(mineNetServersFolder, serverName);
	const mnsInfo = JSON.parse(readFileSync(path.join(serverFolderPath, 'mns-info.json'), 'utf8'));
	const softwareFile = mnsInfo['softwareFile'];

	qExec(
		getServerLaunchCommand(
			path.join(serverFolderPath, softwareFile),
			path.join(
				mineNetJavaVersionsFolder,
				javaVersion,
				'bin',
				JAVA_EXECUTABLE.toUpperCase() === 'JAVA' ? 'java.exe' : 'javaw.exe'
			),
			DEFAULT_MIN_MEM,
			DEFAULT_MAX_MEM,
			USE_OPTIMIZED_FLAGS.toUpperCase() === 'TRUE' ? true : false
		),
		serverFolderPath
	);
};