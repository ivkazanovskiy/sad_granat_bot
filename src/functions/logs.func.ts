import * as fs from 'fs/promises';
import TelegramBot from 'node-telegram-bot-api';
import * as path from 'path';
import { db } from '../database/database';
import { ERole } from '../types/user.type';

export const callbackLogs =
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

    const dir = await fs.readdir(path.join(__dirname, '../error'));

    if (!dir.includes('logs.txt')) {
      return bot
        .sendMessage(msg.chat.id, 'Логи не найдены.')
        .catch((e) => console.log(e.message));
    }

    bot
      .sendDocument(msg.chat.id, path.join(__dirname, '../error/logs.txt'))
      .catch((e) => console.log(e.message));
  };
