import TelegramBot from 'node-telegram-bot-api';
import { db } from '../database/database';

export const callbackStart =
  (bot: TelegramBot) => async (msg: TelegramBot.Message) => {
    try {
      const user = db.getUser(msg.chat.id);
      if (!user) {
        await db.addUser(msg.chat.id);
        await bot.sendMessage(
          msg.chat.id,
          'Вы добавленны в базу данных.\nПопросите администратора авторизовать ваш профиль:',
        );

        return await bot.sendMessage(msg.chat.id, `${msg.chat.id}`);
      }

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
    } catch (e: any) {
      console.log(e.message);
      bot.sendMessage(msg.chat.id, 'Проблемы с подключением к базе данных.');
    }
  };
