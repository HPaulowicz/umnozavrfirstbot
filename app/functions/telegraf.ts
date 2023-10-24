import { Telegraf } from 'telegraf';
import configs from '@config';

const bot = new Telegraf(configs.telegram.token);

export { bot };
export default bot;
