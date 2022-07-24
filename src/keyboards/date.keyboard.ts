import { InlineKeyboardButton } from 'node-telegram-bot-api';
import { EDate, EGroupDate } from '../types/date.type';
import { EEvent } from '../types/query-data.type';
import { quitButton } from './quit.button';

export const dateKeyboard: InlineKeyboardButton[][] = [
  [
    {
      text: EGroupDate.Mon_Wed,
      callback_data: JSON.stringify({
        event: EEvent.subscribeDate,
        date: EDate.Mon,
      }),
    },
  ],
  [
    {
      text: EGroupDate.Tue_Thu,
      callback_data: JSON.stringify({
        event: EEvent.subscribeDate,
        date: EDate.Tue,
      }),
    },
  ],
  [
    {
      text: EGroupDate.Sat,
      callback_data: JSON.stringify({
        event: EEvent.subscribeDate,
        date: EDate.Sat,
      }),
    },
    {
      text: EGroupDate.Sun,
      callback_data: JSON.stringify({
        event: EEvent.subscribeDate,
        date: EDate.Sun,
      }),
    },
  ],
  quitButton,
];
