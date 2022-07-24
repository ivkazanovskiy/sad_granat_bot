import TelegramBot from 'node-telegram-bot-api';
import { User } from '../models/user.model';

export const callbackStart =
  (bot: TelegramBot) => async (msg: TelegramBot.Message) => {
    try {
      const user = await User.findOne({ tlgId: msg.chat.id });
      if (!user) {
        await User.create({ tlgId: msg.chat.id, username: msg.chat.username });
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
