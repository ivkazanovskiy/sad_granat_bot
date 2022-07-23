import { InlineKeyboardButton } from 'node-telegram-bot-api';
import { EGroupDate, ESubDate } from '../types/groups.type';
import { EEvent } from '../types/query-data.type';
import { quitButton } from './quit.button';

export const dateKeyboard: InlineKeyboardButton[][] = [
  [
    {
      text: EGroupDate.Mon_Wed,
      callback_data: JSON.stringify({
        event: EEvent.subscribeDate,
        date: ESubDate.subMon,
      }),
    },
  ],
  [
    {
      text: EGroupDate.Tue_Thu,
      callback_data: JSON.stringify({
        event: EEvent.subscribeDate,
        date: ESubDate.subTue,
      }),
    },
  ],
  [
    {
      text: EGroupDate.Sat,
      callback_data: JSON.stringify({
        event: EEvent.subscribeDate,
        date: ESubDate.subSat,
      }),
    },
    {
      text: EGroupDate.Sun,
      callback_data: JSON.stringify({
        event: EEvent.subscribeDate,
        date: ESubDate.subSun,
      }),
    },
  ],
  quitButton,
];
