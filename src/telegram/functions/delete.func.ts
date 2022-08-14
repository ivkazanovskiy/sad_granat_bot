import TelegramBot from 'node-telegram-bot-api';
import { db } from '../database/database';
import { errorHandler } from '../error/handler.error';
import { deleteKeyboard } from '../keyboards/delete.keyboard';

export const callbackDelete =
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
      return bot.sendMessage(msg.chat.id, 'Выберите действие:', {
        reply_markup: {
          inline_keyboard: deleteKeyboard,
        },
      });
    } catch (err) {
      await errorHandler({ bot, user, data: msg, err });
    }
  };
