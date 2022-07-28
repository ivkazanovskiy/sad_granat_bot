/* eslint-disable indent */
import TelegramBot from 'node-telegram-bot-api';
import { notifyCache } from '..';
import { userCommands } from '../commands';
import { notifyGroupKeyboard } from '../keyboards/notify.keyboard';
import { scheduleKeyboard } from '../keyboards/schedule.keyboard';
import {
  timeWeekendKeyboard,
  timeWorkdayKeyboard,
} from '../keyboards/time.keyboard';
import { ECommand } from '../types/comands.type';
import { EDate, Translator } from '../types/date.type';
import { EEvent, TQueryData } from '../types/query-data.type';
import { db } from '../database/database';
import { errorHandler } from '../error/handler.error';

export const callbackQuery =
  (bot: TelegramBot) => async (query: TelegramBot.CallbackQuery) => {
    if (!query.message || !query.data) return;
    const user = db.getUser(query.from.id);
    if (!user) {
      return bot.sendMessage(query.from.id, 'Сначала зарегистрируйтесь');
    }
    try {
      const data: TQueryData = JSON.parse(query.data);

      if (data.event === EEvent.subscribeDate) {
        if ([EDate.Mon, EDate.Tue].includes(data.date)) {
          // case of workday schedule
          await bot.editMessageReplyMarkup(
            {
              inline_keyboard: timeWorkdayKeyboard(data.date),
            },
            {
              message_id: query.message.message_id,
              chat_id: query.message.chat.id,
            },
          );

          return bot.answerCallbackQuery(query.id);
        }

        // case of weekend schedule
        await bot.editMessageReplyMarkup(
          {
            inline_keyboard: timeWeekendKeyboard(data.date),
          },
          {
            message_id: query.message.message_id,
            chat_id: query.message.chat.id,
          },
        );

        return bot.answerCallbackQuery(query.id);
      }

      if (data.event === EEvent.subscribeTime) {
        const prevSubscription = user.subs.find(
          (sub) => sub.date === data.date && sub.time === data.time,
        );
        if (!prevSubscription) {
          user.subs.push({ date: data.date, time: data.time });
          await db.saveUser(user);
        }

        await bot.answerCallbackQuery(query.id);

        // delete message before showing result
        await bot.deleteMessage(
          query.message.chat.id,
          String(query.message.message_id),
        );

        return bot.sendMessage(
          query.message.chat.id,
          `Вы успешно подписались на рассылку.\nСписок всех подписок доступен по команде ${ECommand.schedule}`,
        );
      }

      if (data.event === EEvent.unsubscribeTime) {
        user.subs = user.subs.filter(
          (sub) => !(sub.date === data.date && sub.time === data.time),
        );
        await db.saveUser(user);

        if (!user.subs.length) {
          // delete message before showing result
          await bot.deleteMessage(
            query.message.chat.id,
            String(query.message.message_id),
          );
          await bot.sendMessage(
            query.from.id,
            `У вас нет активных подписок.\nПодписаться на оповещения можно по команде ${ECommand.subscribe}`,
          );
          return await bot.answerCallbackQuery(query.id);
        }

        await bot.editMessageReplyMarkup(
          {
            inline_keyboard: scheduleKeyboard(user),
          },
          {
            message_id: query.message.message_id,
            chat_id: query.message.chat.id,
          },
        );
        await bot.answerCallbackQuery(query.id);
      }

      if (data.event === EEvent.quit) {
        await bot.deleteMessage(
          query.message.chat.id,
          String(query.message.message_id),
        );
        await bot.answerCallbackQuery(query.id);
      }

      if (data.event === EEvent.auth) {
        // delete message before showing result
        await bot.deleteMessage(
          query.message.chat.id,
          String(query.message.message_id),
        );

        if (!(await db.authorizeUser(data.tlgId))) {
          return bot.sendMessage(query.from.id, 'Пользователь не найден.');
        }

        await bot.setMyCommands(userCommands, {
          scope: {
            type: 'chat',
            chat_id: user.tlgId,
          },
        });

        await bot.sendMessage(
          data.tlgId,
          'Теперь вы авторизованны администратором.',
        );

        await bot.answerCallbackQuery(query.id);
        return bot.sendMessage(
          query.from.id,
          `Пользователь ${user.tlgId} авторизован.`,
        );
      }

      if (data.event === EEvent.notifyAll) {
        const text = notifyCache.get(query.message.chat.id)?.text;
        if (!text) {
          return bot.sendMessage(
            query.message.chat.id,
            'Текст сообщения отсутствует.',
          );
        }
        // delete message before showing result
        await bot.deleteMessage(
          query.message.chat.id,
          String(query.message.message_id),
        );

        const users = db.getOtherUsers(user);

        await Promise.all(
          users.map(({ tlgId }) => bot.sendMessage(tlgId, text)),
        );

        await bot.sendMessage(query.message.chat.id, 'Сообщения отправлены.');
        await bot.answerCallbackQuery(query.id);
      }

      if (data.event === EEvent.notifyGroup) {
        await bot.editMessageReplyMarkup(
          {
            inline_keyboard: notifyGroupKeyboard,
          },
          {
            message_id: query.message.message_id,
            chat_id: query.message.chat.id,
          },
        );
        await bot.answerCallbackQuery(query.id);
      }

      if (data.event === EEvent.notifyGroupTime) {
        const text = notifyCache.get(query.message.chat.id)?.text;
        if (!text) {
          return bot.sendMessage(
            query.message.chat.id,
            'Текст сообщения отсутствует.',
          );
        }

        const users = db.getUsersByTime({ admin: user, data });

        // delete message before showing result
        await bot.deleteMessage(
          query.message.chat.id,
          String(query.message.message_id),
        );

        if (!users.length) {
          await bot.sendMessage(
            query.message.chat.id,
            'На данную группу никто не подписан.',
          );
          return bot.answerCallbackQuery(query.id);
        }

        await Promise.all(
          users.map(({ tlgId }) => bot.sendMessage(tlgId, text)),
        );

        await bot.sendMessage(
          query.message.chat.id,
          `Сообщения отправлены группе:\n${Translator[data.date]} | ${
            Translator[data.time]
          }`,
        );
        await bot.answerCallbackQuery(query.id);
      }
    } catch (err) {
      await errorHandler({ bot, user, data: query, err });
    }
  };
