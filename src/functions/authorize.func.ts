import TelegramBot from 'node-telegram-bot-api';
import { db } from '../database/database';
import { errorHandler } from '../error/handler.error';
import { authKeyboard } from '../keyboards/auth.keyboard';
import { ERole } from '../types/user.type';

export const callbackAuthorize =
  (bot: TelegramBot) => async (msg: TelegramBot.Message) => {
    const user = db.getUser(msg.chat.id);

    if (!user || user.role !== ERole.admin) {
      return bot
        .sendMessage(
          msg.chat.id,
          'У вас нет прав администратора для выполнения данной команды.',
        )
        .catch((e) => console.log(e.message));
    }
    try {
      const requests = db.getUnauthorizedUsers();

      if (!requests.length) {
        return bot.sendMessage(msg.chat.id, 'Входящие заявки отсутствуют.');
      }
      await bot.sendMessage(msg.chat.id, 'Авторизировать пользователей:', {
        reply_markup: {
          inline_keyboard: authKeyboard(requests),
        },
      });
    } catch (err) {
      await errorHandler({ bot, user, data: msg, err });
    }
  };
