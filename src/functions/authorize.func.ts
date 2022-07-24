import TelegramBot from 'node-telegram-bot-api';
import { authKeyboard } from '../keyboards/auth.keyboard';
import { User } from '../models/user.model';
import { ERole } from '../types/user.type';

export const callbackAuthorize =
  (bot: TelegramBot) => async (msg: TelegramBot.Message) => {
    const user = await User.findOne({ tlgId: msg.chat.id });
    if (!user) {
      return bot.sendMessage(
        msg.chat.id,
        'Сначала отправьте запрос на использование бота с помощью команды\n/start',
      );
    }

    if (user.role !== ERole.admin) {
      return bot.sendMessage(
        msg.chat.id,
        'У вас нет прав администратора для выполнения данной команды.',
      );
    }

    const requests = await User.find({ isAuthorized: false });

    if (!requests.length) {
      return bot.sendMessage(msg.chat.id, 'Входящие заявки отсутствуют.');
    }
    await bot.sendMessage(msg.chat.id, 'Авторизировать пользователей:', {
      reply_markup: {
        inline_keyboard: authKeyboard(requests),
      },
    });
  };
