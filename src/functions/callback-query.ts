/* eslint-disable indent */
import TelegramBot from 'node-telegram-bot-api';
import { scheduleKeyboard } from '../keyboards/schedule.keyboard';
import {
  timeWeekendKeyboard,
  timeWorkdayKeyboard,
} from '../keyboards/time.keyboard';
import { User } from '../models/user.model';
import { ECommand } from '../types/comands.type';
import { ESubDate } from '../types/groups.type';
import { EEvent, TQueryData } from '../types/query-data.type';

export const callbackQuery =
  (bot: TelegramBot) => async (query: TelegramBot.CallbackQuery) => {
    console.log('🖨️ ~ query', query);
    if (!query.message || !query.data) return;

    const data: TQueryData = JSON.parse(query.data);

    if (data.event === EEvent.subscribeDate) {
      if ([ESubDate.subMon, ESubDate.subTue].includes(data.date)) {
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
  };
