import TelegramBot from 'node-telegram-bot-api';
import { db } from '../database/database';
import { errorHandler } from '../error/handler.error';
import { notifyKeyboard } from '../keyboards/notify.keyboard';
import { notifyCache, templateCache } from '..';
import { ECommand } from '../types/comands.type';
import { Template } from '../../cron/template/Template';

export const callbackMessage =
  (bot: TelegramBot) => async (msg: TelegramBot.Message) => {
    const user = db.getUser(msg.chat.id);
    if (!user) {
      if (msg.text !== ECommand.start) {
        return bot
          .sendMessage(msg.chat.id, `Нажмите ${ECommand.start}`)
          .catch((e) => console.log(e.message));
      }
      return;
    }
    try {
      if (msg.text === 'I am the admin') {
        await db.setUserAsAdmin(user);
        return bot.sendMessage(
          msg.chat.id,
          'Теперь вы администратор. Для обновления списка команд перезапустите приложение.',
        );
      }

      if (
        msg.text &&
        msg.text[0] !== '/' &&
        notifyCache.get(msg.chat.id)?.message_id === msg.message_id
      ) {
        notifyCache.set(msg.chat.id, {
          message_id: msg.message_id,
          text: msg.text,
        });

        return bot.sendMessage(msg.chat.id, 'Выберите параметры оповещений', {
          reply_markup: {
            inline_keyboard: notifyKeyboard,
          },
        });
      }

      if (
        msg.text &&
        msg.text[0] !== '/' &&
        templateCache.get(msg.chat.id)?.message_id === msg.message_id
      ) {
        const cacheData = templateCache.get(msg.chat.id);
        if (!cacheData) return;

        await Template.set(cacheData.templateIndex, msg.text);

        return bot.sendMessage(
          msg.chat.id,
          `Изменения сохранены. Для работы с другими сообщения введите команду ${ECommand.templates}`,
        );
      }

      // clear the cache
      notifyCache.delete(msg.chat.id);
      templateCache.delete(msg.chat.id);
    } catch (err) {
      await errorHandler({ bot, user, data: msg, err });
    }
  };
