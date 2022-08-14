import { readFile } from 'fs/promises';
import * as path from 'path';
import { bot } from '../../telegram';
import { db } from '../../telegram/database/database';
import { EDate, ETime } from '../../telegram/types/date.type';

export const send = async (template: number, date: EDate, time: ETime) => {
  const text = await readFile(
    path.join(__dirname, `../../../templates/${template}.txt`),
    'utf8',
  );
  const users = db.getUsersByTime({ data: { date, time } });

  await Promise.all(users.map((user) => bot.sendMessage(user.tlgId, text)));
};
