import TelegramBot from 'node-telegram-bot-api';
import * as path from 'path';
import { db } from '../database/database';
import { ERole } from '../types/user.type';

export const callbackDump =
  (bot: TelegramBot) => async (msg: TelegramBot.Message) => {
    const user = db.getUser(msg.chat.id);
    if (!user) {
      return bot.sendMessage(
        msg.chat.id,
        'Сначала отправьте запрос на использование бота с помощью команды\n/start',
      );
    }

    if (user.role !== ERole.admin) {
      return bot.sendMessage(
        msg.chat.id,
        'У вас нет прав администратора для выполнения данной команды.',
      );
    }

    bot
      .sendDocument(msg.chat.id, path.join(__dirname, '../database/users.json'))
      .catch((e) => console.log(e.message));
  };