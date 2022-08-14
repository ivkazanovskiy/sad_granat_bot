import TelegramBot from 'node-telegram-bot-api';
import { db } from '../database/database';
import { errorHandler } from '../error/handler.error';
import { scheduleKeyboard } from '../keyboards/schedule.keyboard';
import { User } from '../models/user.model';

export const callbackUnsubscribe =
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
      if (!user.isAuthorized) {
        return bot.sendMessage(
          msg.chat.id,
          `Попросите администратора авторизовать ваш профиль: ${msg.chat.username}`,
        );
      }

      if (!user.subs.length) {
        return bot.sendMessage(msg.chat.id, 'У вас нет активных подписок');
      }

      await bot.sendMessage(
        msg.chat.id,
        'Выберите дни от которых хотите отписаться',
        {
          reply_markup: {
            inline_keyboard: scheduleKeyboard(user),
          },
        },
      );
    } catch (err) {
      await errorHandler({ bot, user, data: msg, err });
    }
  };
