import * as fs from 'fs/promises';
import TelegramBot from 'node-telegram-bot-api';
import * as path from 'path';
import { db } from '../database/database';
import { errorHandler } from '../error/handler.error';
import { templatesKeyboard } from '../keyboards/templates.keyboard';
import { ERole } from '../types/user.type';

export const callbackTemplates =
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
          'У вас нет прав администратора для выполнения данной команды.',
        );
      }

      const dir = await fs.readdir(path.join(__dirname, '../../../templates'));

      for (let i = 1; i <= 12; i += 1) {
        if (!dir.includes(`${i}.txt`)) {
          await fs.writeFile(
            path.join(__dirname, `../../../templates/${i}.txt`),
            `Здесь должен быть текст ${i} сообщения`,
          );
        }
      }

      return bot.sendMessage(msg.chat.id, 'Выберите сообщение:', {
        reply_markup: {
          inline_keyboard: templatesKeyboard(),
        },
      });
    } catch (err) {
      await errorHandler({ bot, user, data: msg, err });
    }
  };
