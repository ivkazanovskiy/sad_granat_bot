import TelegramBot from 'node-telegram-bot-api';
import { db } from '../database/database';
import { errorHandler } from '../error/handler.error';

export const callbackStart =
  (bot: TelegramBot) => async (msg: TelegramBot.Message) => {
    const user = db.getUser(msg.chat.id);
    if (!user) {
      await db.addUser(msg.chat.id);
      await bot.sendMessage(
        msg.chat.id,
        'Вы добавленны в базу данных.\nПопросите администратора авторизовать ваш профиль:',
      );

      return bot
        .sendMessage(msg.chat.id, `${msg.chat.id}`)
        .catch((e) => console.log(e.message));
    }

    try {
      if (user.isAuthorized) {
        return await bot.sendMessage(
          msg.chat.id,
          'Вы авторизованый пользователь. Можете использовать все команды доступные в меню.',
        );
      }

      // if not authorized
      await bot.sendMessage(
        msg.chat.id,
        'Попросите администратора авторизовать ваш профиль:',
      );
      return await bot.sendMessage(msg.chat.id, `${msg.chat.id}`);
    } catch (err) {
      await errorHandler({ bot, user, data: msg, err });
    }
  };
