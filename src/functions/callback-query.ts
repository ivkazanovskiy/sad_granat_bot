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
import { User } from '../models/user.model';
import { ECommand } from '../types/comands.type';
import { EDate } from '../types/date.type';
import { EEvent, TQueryData } from '../types/query-data.type';

export const callbackQuery =
  (bot: TelegramBot) => async (query: TelegramBot.CallbackQuery) => {
    console.log('🖨️ ~ query', query);
    if (!query.message || !query.data) return;

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
      try {
        const user = await User.findOne({ tlgId: query.from.id });
        if (!user) {
          return bot.sendMessage(query.from.id, 'Сначала зарегистрируйтесь');
        }

        const prevSubscription = user.subs.find(
          (sub) => sub.date === data.date && sub.time === data.time,
        );
        if (!prevSubscription) {
          user.subs.push({ date: data.date, time: data.time });
          await user.save();
        }
      } catch (e: any) {
        console.log(e.message);
        return bot.sendMessage(
          query.from.id,
          'Проблемы с подключением к базе данных.',
        );
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
      try {
        const user = await User.findOne({ tlgId: query.from.id });
        if (!user) {
          return bot.sendMessage(query.from.id, 'Сначала зарегистрируйтесь');
        }
        user.subs = user.subs.filter(
          (sub) => !(sub.date === data.date && sub.time === data.time),
        );
        await user.save();

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
          return bot.answerCallbackQuery(query.id);
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
      } catch (e: any) {
        console.log(e.message);
        return bot.sendMessage(
          query.from.id,
          'Проблемы с подключением к базе данных.',
        );
      }
    }

    if (data.event === EEvent.quit) {
      await bot.deleteMessage(
        query.message.chat.id,
        String(query.message.message_id),
      );
      await bot.answerCallbackQuery(query.id);
    }

    if (data.event === EEvent.auth) {
      try {
        // delete message before showing result
        await bot.deleteMessage(
          query.message.chat.id,
          String(query.message.message_id),
        );

        const user = await User.findOne({ tlgId: data.tlgId });
        if (!user) {
          return bot.sendMessage(
            query.from.id,
            'Данного пользователя не существует.',
          );
        }

        user.isAuthorized = true;
        await user.save();
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
      } catch (e: any) {
        console.log(e.message);
        return bot.sendMessage(
          query.from.id,
          'Проблемы с подключением к базе данных.',
        );
      }
    }

    if (data.event === EEvent.notifyAll) {
      try {
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

        const users = await User.find({
          tlgId: { $ne: query.message.chat.id },
        });

        await Promise.all(
          users.map((user) => bot.sendMessage(user.tlgId, text)),
        );

        await bot.sendMessage(query.message.chat.id, 'Сообщения отправлены.');
        await bot.answerCallbackQuery(query.id);
      } catch (e: any) {
        console.log(e.message);
        return bot.sendMessage(
          query.from.id,
          'Проблемы с подключением к базе данных.',
        );
      }
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

      const users = await User.find({
        tlgId: { $ne: query.message.chat.id },
        subs: { $elemMatch: { date: data.date, time: data.time } },
      });

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

      await Promise.all(users.map((user) => bot.sendMessage(user.tlgId, text)));

      await bot.sendMessage(query.message.chat.id, 'Сообщения отправлены.');
      await bot.answerCallbackQuery(query.id);
    }
  };
