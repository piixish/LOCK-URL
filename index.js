const chalk = require("chalk");
const discord = require("discord.js-selfbot-v13");
const fetch = require("node-fetch-commonjs");
const readline = require("readline");
const input = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const client = new discord.Client({
	checkUpdate: false
});

input.question(chalk.blue("[+] What is your token ? "), (token) => {
	client.login(token).then(() => {
		input.question(chalk.blue("[+] What is the Guild ID ? "), (id) => {
			const guild = client.guilds.cache.get(id);
			if (!guild) {
				console.log(chalk.blue("[+] Please ensure that the Guild ID you have provided is valid :)"));
				console.log(chalk.blue("[+] Thanks for using the LockURL - Made by mizuki :)"));
				input.close();
			} else {
				input.question(chalk.blue("[+] What is the Vanity URL ? "), (url) => {
					console.log(chalk.blue("[+] Please wait... :)"));
					setVanityURL(id, url, token);
				});
			}
		});
	}).catch(() => {
		console.log(chalk.blue("[+] Please ensure that the token you have provided is valid :)"));
		console.log(chalk.blue("[+] Thanks for using the LockURL - Made by mizuki :)"));
		input.close();
	});
});

async function setVanityURL(guildID, vanityURL, token) {
	const retryInterval = 5000;
	let attempt = 0;
	let rateLimitedAttempts = 0;

	while (true) {
		attempt++;

		const response = await fetch(`https://discord.com/api/v9/guilds/${guildID}/vanity-url`, {
			method: 'PATCH',
			headers: {
				Authorization: `${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ code: vanityURL }),
		});

		if (response.ok) {
		} else if (response.status === 429) {
			const retryAfter = response.headers.get('Retry-After');
			const retryAfterSeconds = parseInt(retryAfter, 10);

			if (!isNaN(retryAfterSeconds)) {
				const hours = Math.floor(retryAfterSeconds / 3600);
				const remainingSeconds = retryAfterSeconds % 3600;
				const minutes = Math.floor(remainingSeconds / 60);

				console.log(chalk.blue("[+] Rate limited the vanity " + vanityURL + " for " + hours + " hours and " + minutes + " minutes. (" + (attempt - 1) + ") :)"));
				console.log(chalk.blue("[+] Retrying in " + hours + " hours and " + minutes + " minutes... :)"));
				console.log(chalk.blue("[+] Thanks for using the LockURL - Made by mizuki :)"));
				attempt = 0;
				rateLimitedAttempts = 0;
				await new Promise(resolve => setTimeout(resolve, retryAfterSeconds * 1000));
			} else {
				return;
			}
		} else {
			console.error(chalk.blue("[+] Failed to set Vanity URL (" + response.statusText + ")"));
			console.log(chalk.blue("[+] Thanks for using the LockURL - Made by mizuki :)"));
			await new Promise(resolve => setTimeout(resolve, retryInterval));
		}
	}
}
