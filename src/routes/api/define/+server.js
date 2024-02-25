// Create a server

import { redirect } from '@sveltejs/kit';
import { exec } from 'child_process';

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
				console.error('Error:', error);
				return;
			}

			console.log('stdout:', stdout);
			console.log('stderr:', stderr);
		}
	);
}

export const POST = async ({ request }) => {
	// @ts-ignore
	const { serverName, version } = await request.json();
	const command =
		'"C:/Program Files/Java/jdk-17/bin/java.exe" -Xms2G -Xmx4G -XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1NewSizePercent=30 -XX:G1MaxNewSizePercent=40 -XX:G1HeapRegionSize=8M -XX:G1ReservePercent=20 -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:InitiatingHeapOccupancyPercent=15 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 -Dusing.aikars.flags=https://mcflags.emc.gs -Daikars.new.flags=true -jar "paper-1.19.4.jar" --nogui';

	// qExec(command, 'C:/Projects/MCServers/1.19.4-papermc');
	console.log(`ServerName: ${serverName}`);
	console.log(`Version: ${serverName}`);
	redirect(303, '/');
};
