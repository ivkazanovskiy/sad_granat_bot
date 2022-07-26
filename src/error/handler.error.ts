import TelegramBot from 'node-telegram-bot-api';
import * as fs from 'fs/promises';
import * as path from 'path';
import { TUserJson } from '../database/types/user.type';

export const errorHandler = async ({
  bot,
  user,
  data,
  err,
}: {
  bot: TelegramBot;
  user: TUserJson;
  data: any;
  err: any;
}) => {
  await fs.appendFile(
    path.join(__dirname, 'logs.txt'),
    `${err.message}\n${JSON.stringify(data, null, 2)}\n\n`,
  );
  bot.sendMessage(user.tlgId, 'Непредвиденная ошибка сервера');
};
