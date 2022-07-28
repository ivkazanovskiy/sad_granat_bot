import { InlineKeyboardButton } from 'node-telegram-bot-api';
import { EDate, ETime, Translator } from '../types/date.type';
import { EEvent } from '../types/query-data.type';
import { sortSubs } from '../helpers/sort-subs.helper';
import { quitButton } from './quit.button';
import { TUserJson } from '../database/types/user.type';

const unsubButton = (date: EDate, time: ETime) => ({
  text: `${Translator[date]} | ${Translator[time]}`,
  callback_data: JSON.stringify({
    event: EEvent.unsubscribeTime,
    date,
    time,
  }),
});

export const scheduleKeyboard = (user: TUserJson): InlineKeyboardButton[][] => {
  sortSubs(user.subs);
  return [
    ...user.subs.map((sub) => [unsubButton(sub.date, sub.time)]),
    quitButton,
  ];
};
