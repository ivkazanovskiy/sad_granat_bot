import { config } from 'dotenv';
import mongoose from 'mongoose';
import TelegramBot from 'node-telegram-bot-api';
import { callbackQuery } from './functions/callback-query';
import { sortSubs } from './helpers/sort-subs.helper';
import { dateKeyboard } from './keyboards/date.keyboard';
import { scheduleKeyboard } from './keyboards/schedule.keyboard';
import { User } from './models/user.model';
import { ECommand } from './types/comands.type';
import { Translator } from './types/groups.type';

config();

// const cacheDate = new Map<number, EGroupDate>();

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN!, { polling: true });
async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');

  // await bot.setMyCommands(
  //   [
  //     { command: ECommand.start, description: 'Начать пользоваться чатботом' },
  //     {
  //       command: ECommand.schedule,
  //       description: 'Посмотреть свои подписки.',
  //     },
  //     {
  //       command: ECommand.subscribe,
  //       description: 'Подписаться на рассылку уведомлений',
  //     },
  //     {
  //       command: ECommand.unsubscribe,
  //       description: 'Отписаться от рассылки уведомлений',
  //     },
  //   ],
  //   { scope: { type: 'default' } },
  // );

  bot.onText(new RegExp(ECommand.start), async (msg) => {
    console.log(msg);
    try {
      const user = await User.findOne({ tlgId: msg.chat.id });
      if (!user) {
        await User.create({ tlgId: msg.chat.id }); // FIXME: add is authorized
      }
      bot.sendMessage(
        msg.chat.id,
        `Вы добавленны в базу данных.\nПопросите администратора авторизовать ваш профиль ${msg.chat.username}`,
      );
    } catch (e: any) {
      console.log(e.message);
      bot.sendMessage(msg.chat.id, 'Проблемы с подключением к базе данных.');
    }
  });

  bot.onText(new RegExp(ECommand.subscribe), async (msg) => {
    await bot.sendMessage(
      msg.chat.id,
      'Выберите дни на которые хотите подписаться',
      {
        reply_markup: {
          inline_keyboard: dateKeyboard,
        },
      },
    );
  });

  bot.onText(new RegExp(ECommand.unsubscribe), async (msg) => {
    const user = await User.findOne({ tlgId: msg.chat.id });
    if (!user) {
      return bot.sendMessage(
        msg.chat.id,
        'Сначала отправьте запрос на использование бота с помощью команды\n/start',
      );
    }
    await bot.sendMessage(
      msg.chat.id,
      'Выберите дни от которых хотите отписаться',
      {
        reply_markup: {
          inline_keyboard: scheduleKeyboard(user),
        },
      },
    );
  });

  bot.on('callback_query', callbackQuery(bot));

  bot.onText(new RegExp(ECommand.schedule), async (msg) => {
    try {
      const user = await User.findOne({ tlgId: msg.chat.id });
      if (!user) {
        return bot.sendMessage(
          msg.chat.id,
          'Сначала отправьте запрос на использование бота с помощью команды\n/start',
        );
      }
      bot.sendMessage(msg.chat.id, 'Вы подписаны на следующие занятия:');
      // FIXME: add sort of subs

      sortSubs(user.subs);

      bot.sendMessage(
        msg.chat.id,
        user.subs
          .map((sub) => `${Translator[sub.date]} | ${Translator[sub.time]}`)
          .join('\n'),
      );
    } catch (e: any) {
      console.log(e.message);
      bot.sendMessage(msg.chat.id, 'Проблемы с подключением к базе данных.');
    }
  });

  // // Object.values(EGroupDate).join('|')
  // bot.onText(
  //   new RegExp(`${EGroupDate.Mon_Wed}|${EGroupDate.Tue_Thu}`),
  //   (msg) => {
  //     cacheDate.set(msg.chat.id, msg.text as EGroupDate);
  //     bot.sendMessage(msg.chat.id, 'Выберите время занятия', {
  //       reply_markup: {
  //         keyboard: [
  //           [{ text: EGroupTime.Morning }],
  //           [{ text: EGroupTime.Afternoon }],
  //           [{ text: EGroupTime.Evening }],
  //         ],
  //       },
  //     });
  //   },
  // );

  // bot.onText(
  //   new RegExp(`${EGroupDate.Sat}|${EGroupDate.Sun}`),
  //   (msg, match) => {
  //     if (
  //       msg.text !== EGroupDate.Sat.toString() ||
  //       msg.text !== EGroupDate.Sun.toString()
  //     ) {
  //       return;
  //     }

  //     cacheDate.set(msg.chat.id, msg.text as EGroupDate);
  //     bot.sendMessage(msg.chat.id, 'Выберите время занятия', {
  //       reply_markup: {
  //         keyboard: [[{ text: EGroupTime.WholeDay }]],
  //       },
  //     });
  //   },
  // );

  // bot.onText(new RegExp(Object.values(EGroupTime).join('|')), async (msg) => {
  //   const chosenDate = cacheDate.get(msg.chat.id);
  //   if (!chosenDate) {
  //     return bot.sendMessage(msg.chat.id, 'Сначала выберите дни.\n/subscribe', {
  //       reply_markup: { remove_keyboard: true },
  //     });
  //   }
  //   const chosenTime = msg.text as EGroupTime;
  //   const user = await User.findOne({ tlgId: msg.chat.id });
  //   if (!user) {
  //     cacheDate.delete(msg.chat.id);
  //     return bot.sendMessage(
  //       msg.chat.id,
  //       'Не знаю как ты сюда попал, но сначала попроси админа тебя авторизовать',
  //       { reply_markup: { remove_keyboard: true } },
  //     );
  //   }

  //   const prevSubscription = user.subs.find(
  //     (sub) => sub.date === chosenDate && sub.time === chosenTime,
  //   );
  //   if (!prevSubscription) {
  //     user.subs.push({ date: chosenDate, time: chosenTime });
  //     await user.save();
  //   }
  //   cacheDate.delete(msg.chat.id);
  //   bot.sendMessage(
  //     msg.chat.id,
  //     `Подписка оформлена на:\n${chosenDate}\n${msg.text}`,
  //     { reply_markup: { remove_keyboard: true } },
  //   );
  // });

  // bot.onText(new RegExp(ECommand.unsubscribe), async (msg) => {
  //   const user = await User.findOne({ tlgId: msg.chat.id });
  //   if (!user) {
  //     return bot.sendMessage(
  //       msg.chat.id,
  //       'Сначала отправьте запрос на использование бота с помощью команды\n/start',
  //     );
  //   }
  //   bot.sendMessage(msg.chat.id, 'Выберите дни от которых хотите отписаться', {
  //     reply_markup: {
  //       keyboard: user.subs.map((sub) => [
  //         { text: `Отписаться: ${sub.date}\n${sub.time}` },
  //       ]),
  //     },
  //   });
  // });

  // console.log('🖨️ ~ bot.onText ~ match', match);
  // console.log('🖨️ ~ bot.onText ~ msg', msg);
  // const { from: tlgUser } = msg;
  // if (!tlgUser) return;
  // const { id: userId } = tlgUser;
  // console.log('🖨️ ~ bot.onText ~ userId', userId);

  // Listen for any kind of message. There are different kinds of
  // messages.
  bot.on('message', (msg) => {
    console.log('🖨️ ~ bot.on ~ msg', msg);
  });
}

// bot.getChat(369908047).then((data) => {
//   console.log(data);
// });

main();
