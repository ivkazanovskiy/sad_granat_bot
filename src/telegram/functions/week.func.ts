import * as fs from 'fs/promises';
import TelegramBot from 'node-telegram-bot-api';
import * as path from 'path';
import { Counter } from '../../cron/counter/Counter';
import { TCounterData } from '../../cron/counter/types/counter-data.type';
import { db } from '../database/database';
import { errorHandler } from '../error/handler.error';
import { weekOptionsKeyboard } from '../keyboards/week.keyboard';
import { ERole } from '../types/user.type';

export const callbackWeek =
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
      if (user.role !== ERole.admin) {
        return bot.sendMessage(
          msg.chat.id,
          'У вас нет прав администратора для выполнения данной команды.',
        );
      }
      const counterData = await Counter.get();
      if (!counterData) {
        throw new Error('counterData is absent');
      }

      const message = counterData.tick
        ? `Текущая неделя цикла: ${counterData.tick}`
        : 'Отправка уведомлений приостановлена';

      return bot.sendMessage(msg.chat.id, message, {
        reply_markup: {
          inline_keyboard: weekOptionsKeyboard,
        },
      });
    } catch (err) {
      await errorHandler({ bot, user, data: msg, err });
    }
  };
