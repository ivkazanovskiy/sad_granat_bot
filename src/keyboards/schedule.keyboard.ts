import { InlineKeyboardButton } from 'node-telegram-bot-api';
import { EDate, ETime, Translator } from '../types/date.type';
import { EEvent } from '../types/query-data.type';
import { UserDoc } from '../models/user.model';
import { sortSubs } from '../helpers/sort-subs.helper';
import { quitButton } from './quit.button';

const unsubButton = (date: EDate, time: ETime) => ({
  text: `${Translator[date]} | ${Translator[time]}`,
  callback_data: JSON.stringify({
    event: EEvent.unsubscribeTime,
    date,
    time,
  }),
});

export const scheduleKeyboard = (user: UserDoc): InlineKeyboardButton[][] => {
  sortSubs(user.subs);
  return [
    ...user.subs.map((sub) => [unsubButton(sub.date, sub.time)]),
    quitButton,
  ];
};
