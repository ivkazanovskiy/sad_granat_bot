import TelegramBot from 'node-telegram-bot-api';
import { db } from '../database/database';
import { errorHandler } from '../error/handler.error';
import { sortSubs } from '../helpers/sort-subs.helper';
import { Translator } from '../types/date.type';

export const callbackSchedule =
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
        return await bot.sendMessage(
          msg.chat.id,
          `Попросите администратора авторизовать ваш профиль: ${msg.chat.username}`,
        );
      }

      if (!user.subs.length) {
        return await bot.sendMessage(
          msg.chat.id,
          'У вас нет активных подписок.',
        );
      }

      await bot.sendMessage(msg.chat.id, 'Вы подписаны на следующие занятия:');

      sortSubs(user.subs);

      return await bot.sendMessage(
        msg.chat.id,
        user.subs
          .map((sub) => `${Translator[sub.date]} | ${Translator[sub.time]}`)
          .join('\n'),
      );
    } catch (err) {
      await errorHandler({ bot, user, data: msg, err });
    }
  };
