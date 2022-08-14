import * as fs from 'fs/promises';
import TelegramBot from 'node-telegram-bot-api';
import * as path from 'path';
import { db } from '../database/database';
import { errorHandler } from '../error/handler.error';
import { ERole } from '../types/user.type';

export const callbackLogs =
  (bot: TelegramBot) => async (msg: TelegramBot.Message) => {
    const user = db.getUser(msg.chat.id);
    if (!user) {
      return bot
        .sendMessage(
          msg.chat.id,
          'Сначала отправьте запрос на использование бота с помощью команды\n/start',
        )
        .catch((e) => console.log(e.message));
    }
    try {
      if (user.role !== ERole.admin) {
        return bot.sendMessage(
          msg.chat.id,
          'У вас нет прав администратора для выполнения данной команды',
        );
      }

      const dir = await fs.readdir(path.join(__dirname, '../../..'));

      if (!dir.includes('logs.txt')) {
        return bot
          .sendMessage(msg.chat.id, 'Логи не найдены')
          .catch((e) => console.log(e.message));
      }

      bot
        .sendDocument(msg.chat.id, path.join(__dirname, '../../../logs.txt'))
        .catch((e) => console.log(e.message));
    } catch (err) {
      await errorHandler({ bot, user, data: msg, err });
    }
  };
