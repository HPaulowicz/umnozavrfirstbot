import { Telegraf } from "telegraf";
import configs from "../config";

const bot = new Telegraf(configs.telegram.token);

bot.catch((error: any, ctx) => {
	console.error("Global Error:", error?.message);
	ctx.reply("An unexpected error occurred.");
});

export { bot };
export default bot;
