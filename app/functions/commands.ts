import { Markup } from "telegraf";
import jwt from "jsonwebtoken";
import bot from "./telegraf";
import config from "../config";
import translate from "../i18n/translations";
import dataSource from "./database";
import { launchPolling } from "./launcher";

// command: /quit
const commands = async (): Promise<void> => {
	bot.command("quit", (ctx) => {
		ctx.telegram.leaveChat(ctx.message.chat.id);
		ctx.leaveChat();
	});

	bot.start(async (ctx) => {
		const {
			update: {
				message: {
					from: { id, first_name, username, language_code },
				},
			},
		} = ctx;
		await dataSource.query(
			"INSERT INTO users (telegram_id, username, first_name, language_code) VALUES ($1, $2, $3, $4) ON CONFLICT (telegram_id) DO NOTHING",
			[`${id}`, username, first_name, language_code],
		);
		// Why JWT token? Because we need to transfer user id and get data by that id from telegram to browser
		// meanwhile we need to be sure that the id is not changed and the link has some expiration time
		const token = jwt.sign({ telegram_id: id, first_name, language_code }, config.jwtsecret, {
			expiresIn: "5m",
		});
		console.log(token);
		const urlButton = Markup.button.url(
			translate("welcome_button", {}, language_code),
			`${config.homepage}?token=${token}`,
		);
		const keyboard = Markup.inlineKeyboard([urlButton]);
		ctx.telegram.sendMessage(
			ctx.message.chat.id,
			translate("welcome_message", { name: first_name }, language_code),
			keyboard,
		);
	});

	bot.command("report", (ctx) => {
		ctx.reply("Here can be a support / report handling, which is out of scope of this task");
	});
};

// command: /adminhello
const adminCommands = async (): Promise<void> => {
	const hasPermissions = async (ctx: any, next: any) => {
		const {
			command,
			message: {
				from: { id, language_code },
			},
		} = ctx;
		const [admin] = await dataSource.query(
			"SELECT telegram_id, permissions, valid_from, valid_to FROM admins WHERE telegram_id = $1 AND (valid_to > CURRENT_TIMESTAMP OR valid_to IS NULL) AND valid_from <= CURRENT_TIMESTAMP AND deleted_at IS NULL",
			[id],
		);
		if (admin && admin.permissions.includes(command)) {
			next();
		} else {
			ctx.reply(translate("unauthorized_error_message", { command }, language_code));
		}
	};

	bot.command("adminhello", hasPermissions, (ctx) => {
		const {
			payload,
			message: {
				from: { language_code },
			},
		} = ctx;
		const [adminTelegramId, message] = payload.split(" ");
		if (!adminTelegramId) {
			ctx.reply(translate("empty_user_error_message", {}, language_code));
		}
		ctx.telegram.sendMessage(adminTelegramId, message || "");
	});

	bot.command("adminadd", hasPermissions, async (ctx) => {
		const {
			payload,
			message: {
				from: { language_code },
			},
		} = ctx;
		const [adminTelegramId] = payload.split(" ");
		if (!adminTelegramId) {
			ctx.reply(translate("empty_user_error_message", {}, language_code));
		}
		const [user] = await dataSource.query(
			"SELECT telegram_id, language_code FROM users WHERE telegram_id = $1 AND deleted_at IS NULL",
			[adminTelegramId],
		);
		await dataSource.query(
			'INSERT INTO admins (telegram_id, permissions) VALUES ($1, \'["adminhello", "adminadd"]\') ON CONFLICT (telegram_id) DO NOTHING',
			[adminTelegramId],
		);
		ctx.reply(`Added id "${adminTelegramId}" to administrators`);
		try {
			ctx.telegram.sendMessage(adminTelegramId, translate("added_to_admins", {}, user?.language_code));
		} catch (error) {
			ctx.reply(`Unable to send a notification to "${adminTelegramId}"`);
		}
	});
};

const launch = async (): Promise<void> => launchPolling();

export { launch, commands, adminCommands };
export default launch;
