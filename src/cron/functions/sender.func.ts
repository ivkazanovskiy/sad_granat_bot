import { bot } from '../../telegram';
import { db } from '../../telegram/database/database';
import { groupLabel } from '../../telegram/helpers/group-label.helper';
import { EDate, ETime } from '../../telegram/types/date.type';
import { Template } from '../template/Template';

export const send = async (template: number, date: EDate, time: ETime) => {
  const text = await Template.get(template);
  const users = db.getUsersByTime({ data: { date, time } });

  await Promise.all(
    users.map((user) =>
      bot.sendMessage(
        user.tlgId,
        `*Напоминание для группы\n${groupLabel(date, time)}:*\n${text}`,
        { parse_mode: 'Markdown' },
      ),
    ),
  );
};
