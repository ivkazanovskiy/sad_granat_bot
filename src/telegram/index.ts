import { config } from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import { db } from './database/database';
import { callbackAuthorize } from './functions/authorize.func';
import { callbackDrop } from './functions/droplogs.funс';
import { callbackDump } from './functions/dump.func';
import { callbackLogs } from './functions/logs.func';
import { callbackMessage } from './functions/message.func';
import { callbackNotify } from './functions/notify.func';
import { callbackQuery } from './functions/query.func';
import { callbackSchedule } from './functions/schedule.func';
import { callbackStart } from './functions/start.func';
import { callbackSubscribe } from './functions/subscribe.func';
import { callbackTemplates } from './functions/templates.func';
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
export const templateCache = new Map<
  number,
  {
    templateIndex: number;
    message_id: number;
  }
>();

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN!, { polling: true });

export async function telegram() {
  db.initData().then(() => {
    // await bot.setMyCommands(defaultCommands, { scope: { type: 'default' } });

    bot.onText(new RegExp(ECommand.start), callbackStart(bot));

    bot.onText(new RegExp(ECommand.subscribe), callbackSubscribe(bot));

    bot.onText(new RegExp(ECommand.unsubscribe), callbackUnsubscribe(bot));

    bot.onText(new RegExp(ECommand.schedule), callbackSchedule(bot));

    bot.onText(new RegExp(ECommand.authorize), callbackAuthorize(bot));

    bot.onText(new RegExp(ECommand.notify), callbackNotify(bot));

    bot.onText(new RegExp(ECommand.dump), callbackDump(bot));

    bot.onText(new RegExp(ECommand.logs), callbackLogs(bot));

    bot.onText(new RegExp(ECommand.drop), callbackDrop(bot));

    bot.onText(new RegExp(ECommand.templates), callbackTemplates(bot));

    bot.on('callback_query', callbackQuery(bot));

    bot.on('message', callbackMessage(bot));
  });
}
