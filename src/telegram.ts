import { config } from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import { callbackAuthorize } from './functions/authorize.func';
import { callbackMessage } from './functions/message.func';
import { callbackNotify } from './functions/notify.func';
import { callbackQuery } from './functions/query.func';
import { callbackSchedule } from './functions/schedule.func';
import { callbackStart } from './functions/start.func';
import { callbackSubscribe } from './functions/subscribe.func';
import { callbackUnsubscribe } from './functions/unsubscribe.func';
import { ECommand } from './types/comands.type';

config();

/**
 * chat_id : expected message_id
 */
export const notifyCache = new Map<
  number,
  { message_id: number; text?: string }
>();

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN!, { polling: true });

export async function telegram() {
  // await bot.setMyCommands(defaultCommands, { scope: { type: 'default' } });

  bot.onText(new RegExp(ECommand.start), callbackStart(bot));

  bot.onText(new RegExp(ECommand.subscribe), callbackSubscribe(bot));

  bot.onText(new RegExp(ECommand.unsubscribe), callbackUnsubscribe(bot));

  bot.onText(new RegExp(ECommand.schedule), callbackSchedule(bot));

  bot.onText(new RegExp(ECommand.authorize), callbackAuthorize(bot));

  bot.onText(new RegExp(ECommand.notify), callbackNotify(bot));

  bot.on('callback_query', callbackQuery(bot));

  bot.on('message', callbackMessage(bot));
}
