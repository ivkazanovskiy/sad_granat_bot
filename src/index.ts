import { config } from 'dotenv';
import mongoose from 'mongoose';
import TelegramBot from 'node-telegram-bot-api';
import { adminCommands, defaultCommands } from './commands';
import { callbackQuery } from './functions/callback-query';
import { sortSubs } from './helpers/sort-subs.helper';
import { authKeyboard } from './keyboards/auth.keyboard';
import { dateKeyboard } from './keyboards/date.keyboard';
import { notifyKeyboard } from './keyboards/notify.keyboard';
import { scheduleKeyboard } from './keyboards/schedule.keyboard';
import { User } from './models/user.model';
import { ECommand } from './types/comands.type';
import { Translator } from './types/date.type';
import { ERole } from './types/user.type';

config();
/**
 * chat_id : expected message id
 */
export const notifyCache = new Map<
  number,
  { message_id: number; text?: string }
>();

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN!, { polling: true });
async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');

  // await bot.setMyCommands(defaultCommands, { scope: { type: 'default' } });

  bot.onText(new RegExp(ECommand.start), async (msg) => {
    console.log(msg);
    try {
      const user = await User.findOne({ tlgId: msg.chat.id });
      if (!user) {
        await User.create({ tlgId: msg.chat.id, username: msg.chat.username });
        await bot.sendMessage(
          msg.chat.id,
          'Вы добавленны в базу данных.\nПопросите администратора авторизовать ваш профиль:',
        );

        return bot.sendMessage(msg.chat.id, `${msg.chat.id}`);
      }

      if (user.isAuthorized) {
        return bot.sendMessage(
          msg.chat.id,
          'Вы авторизованый пользователь. Можете использовать все команды доступные в меню.',
        );
      }

      // if not authorized
      await bot.sendMessage(
        msg.chat.id,
        'Попросите администратора авторизовать ваш профиль:',
      );
      return bot.sendMessage(msg.chat.id, `${msg.chat.id}`);
    } catch (e: any) {
      console.log(e.message);
      bot.sendMessage(msg.chat.id, 'Проблемы с подключением к базе данных.');
    }
  });

  bot.onText(new RegExp(ECommand.subscribe), async (msg) => {
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
  });

  bot.onText(new RegExp(ECommand.unsubscribe), async (msg) => {
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

    if (!user.subs.length) {
      return bot.sendMessage(msg.chat.id, 'У вас нет активных подписок.');
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

  bot.onText(new RegExp(ECommand.schedule), async (msg) => {
    try {
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

      if (!user.subs.length) {
        return bot.sendMessage(msg.chat.id, 'У вас нет активных подписок.');
      }

      await bot.sendMessage(msg.chat.id, 'Вы подписаны на следующие занятия:');

      sortSubs(user.subs);

      return bot.sendMessage(
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

  bot.on('callback_query', callbackQuery(bot));

  bot.on('error', (msg) => {
    console.log(msg);
  });

  bot.onText(new RegExp(ECommand.authorize), async (msg) => {
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
  });

  bot.onText(new RegExp(ECommand.notify), async (msg) => {
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
    notifyCache.set(msg.chat.id, { message_id: msg.message_id + 2 });
    return bot.sendMessage(msg.chat.id, 'Введите текст сообщения');
  });

  bot.on('message', async (msg) => {
    if (msg.text === 'I am an admin') {
      const user = await User.findOne({ tlgId: msg.chat.id });
      if (!user) {
        return bot.sendMessage(msg.chat.id, `Нажмите ${ECommand.start}`);
      }

      user.isAuthorized = true;
      user.role = ERole.admin;
      await user.save();
      await bot.setMyCommands(adminCommands, {
        scope: { type: 'chat', chat_id: msg.chat.id },
      });
      return bot.sendMessage(
        msg.chat.id,
        'Теперь вы администратор. Для обновления списка команд перезапустите приложение.',
      );
    }

    if (msg.text === 'test') {
      console.log(msg);
      bot.sendMessage(msg.chat.id, '1');
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
  });
}

// bot.getChat(369908047).then((data) => {
//   console.log(data);
// });

main();
