import TelegramBot from 'node-telegram-bot-api';
import { dateKeyboard } from '../keyboards/date.keyboard';
import { User } from '../models/user.model';

export const callbackSubscribe =
  (bot: TelegramBot) => async (msg: TelegramBot.Message) => {
    const user = await User.findOne({ tlgId: msg.chat.id });
    if (!user) {
      return bot.sendMessage(
        msg.chat.id,
        'Сначала отправьте запрос на использование бота с помощью команды\n/start',
      );
    }

    if (!user.isAuthorized) {
      return bot.sendMessage(
        msg.chat.id,
        `Попросите администратора авторизовать ваш профиль: ${msg.chat.username}`,
      );
    }

    await bot.sendMessage(
      msg.chat.id,
      'Выберите дни на которые хотите подписаться',
      {
        reply_markup: {
          inline_keyboard: dateKeyboard,
        },
      },
    );
  };
