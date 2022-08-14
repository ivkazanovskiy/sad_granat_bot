import { bot } from '../../telegram';
import { db } from '../../telegram/database/database';
import { EDate, ETime } from '../../telegram/types/date.type';
import { Template } from '../template/Template';

export const send = async (template: number, date: EDate, time: ETime) => {
  const text = await Template.get(template);
  const users = db.getUsersByTime({ data: { date, time } });

  await Promise.all(users.map((user) => bot.sendMessage(user.tlgId, text)));
};
