import bot from './telegraf';
import config from '@config';
import fs from 'fs';
import localtunnel from 'localtunnel';

const launchPolling = (): void => {
	bot.launch();
};

const launchSelfSigned = async (webhookUrl: string, secretPath: string) => {
	const { port, domain } = config.webhook;
	const path = `${process.cwd()}/certs`;
	const cert = fs.readFileSync(`${path}/PUBLIC.pem`);
	const pk = fs.readFileSync(`${path}/PK.key`);
	const tlsOptions = {
		key: pk,
		cert: cert,
	};
	await bot.launch({
		webhook: {
			port,
			domain,
			tlsOptions,
			hookPath: secretPath,
		},
	});
	bot.telegram.setWebhook(`${webhookUrl}${secretPath}`, {
		certificate: {
			source: cert,
		},
	});
};

const launchLocalTunnel = async (secretPath: string, port: number) => {
	const tunnel = await localtunnel({ port });
	bot.launch({
		webhook: {
			port,
			domain: tunnel.url,
			hookPath: secretPath,
		},
	});
};

const launchWebhook = async (): Promise<void> => {
	const { port, url, selfSigned } = config.webhook;
	const secretPath = `/telegraf/${bot.secretPathComponent()}`;

	// Set telegram webhook
	// this runs localtunnel to develop the bot on localhost
	// acts as a reverse proxy for telegrm calls to our websocket
	const webhookUrl = url;
	if (config.debug) {
		return launchLocalTunnel(secretPath, port);
	} else if (selfSigned) {
		return launchSelfSigned(webhookUrl, secretPath);
	} else {
		return bot.launch({
			webhook: {
				port,
				domain: webhookUrl,
				hookPath: secretPath,
			},
		});
	}
};

export { launchPolling, launchWebhook };
