import { Markup } from 'telegraf';
import bot from '@app/functions/telegraf';
import config from '@config';
import translate from '@app/i18n/translations';
import dataSource from '@app/functions/database';
import { launchPolling, launchWebhook } from './launcher';

// command: /quit
const quit = async (): Promise<void> => {
	bot.command('quit', (ctx) => {
		ctx.telegram.leaveChat(ctx.message.chat.id);
		ctx.leaveChat();
	});
};

// command: /start
const start = async (): Promise<void> => {
	bot.start(async (ctx) => {
		const { update: { message: { from: { id, first_name, username, language_code }}}} = ctx;
		await dataSource.query('INSERT INTO users (telegram_id, username, first_name, language_code) VALUES ($1, $2, $3, $4) ON CONFLICT (telegram_id) DO NOTHING', [
			`${id}`, username, first_name, language_code
		]);

		const urlButton = Markup.button.url(translate('welcome_button', {}, language_code), 'https://example.com');
		const keyboard = Markup.inlineKeyboard([urlButton]);
		ctx.telegram.sendMessage(ctx.message.chat.id, translate('welcome_message', { name: first_name }, language_code), keyboard);
	});
};

// command: /adminhello
const adminhello = async (): Promise<void> => {
	const admins = await dataSource.query('SELECT telegram_id, permissions, valid_from, valid_to FROM admins WHERE (valid_to > CURRENT_TIMESTAMP OR valid_to IS NULL) AND valid_from <= CURRENT_TIMESTAMP AND deleted_at IS NULL');
	const adminsMap = new Map();
	for (const i in admins) {
		adminsMap.set(admins[i].telegram_id, admins[i]);
	}

	const hasPermissions = (ctx: any, next: Function) => {
		const { command, message: { from: { id, language_code }}} = ctx;
		const adminObject = adminsMap.get(`${id}`);
		if (adminObject && adminObject.permissions.includes(command)) {
			next();
		} else {
			ctx.reply(translate('unauthorized_error_message', { command }, language_code))
		}
	}

	bot.command('adminhello', hasPermissions, (ctx) => {
		const { payload } = ctx;
		const [ recipientId, message ] = payload.split(' ');
		
		ctx.telegram.sendMessage(recipientId, message);
	});
};

// command: /report
const report = async (): Promise<void> => {
	bot.command('report', (ctx) => {
		ctx.reply('Here can be a support / report handling, which is out of scope of this task');
	});
};

const launch = async (): Promise<void> => {
	const mode = config.mode;
	if (mode === 'webhook') {
		launchWebhook();
	} else {
		launchPolling();
	}
};

export { launch, quit, start, adminhello, report };
export default launch;
