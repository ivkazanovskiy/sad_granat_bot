import TelegramBot from 'node-telegram-bot-api';
import { db } from '../database/database';
import { notifyCache } from '../telegram';
import { ERole } from '../types/user.type';

export const callbackNotify =
  (bot: TelegramBot) => async (msg: TelegramBot.Message) => {
    const user = db.getUser(msg.chat.id);
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
    notifyCache.set(msg.chat.id, { message_id: msg.message_id + 2 });
    return bot.sendMessage(msg.chat.id, 'Введите текст сообщения');
  };
