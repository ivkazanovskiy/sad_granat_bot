import { InlineKeyboardButton } from 'node-telegram-bot-api';
import { EDate, EGroupTime, ETime } from '../types/date.type';
import { EEvent } from '../types/query-data.type';
import { quitButton } from './quit.button';

export const timeWorkdayKeyboard = (chosenDate: EDate) => [
  [
    {
      text: EGroupTime.Morning,
      callback_data: JSON.stringify({
        event: EEvent.subscribeTime,
        time: ETime.Mrn,
        date: chosenDate,
      }),
    },
  ],
  [
    {
      text: EGroupTime.Afternoon,
      callback_data: JSON.stringify({
        event: EEvent.subscribeTime,
        time: ETime.Aft,
        date: chosenDate,
      }),
    },
  ],
  [
    {
      text: EGroupTime.Evening,
      callback_data: JSON.stringify({
        event: EEvent.subscribeTime,
        time: ETime.Evn,
        date: chosenDate,
      }),
    },
  ],
  quitButton,
];

export const timeWeekendKeyboard = (date: EDate): InlineKeyboardButton[][] => [
  [
    {
      text: EGroupTime.WholeDay,
      callback_data: JSON.stringify({
        event: EEvent.subscribeTime,
        time: ETime.Whl,
        date,
      }),
    },
  ],
  quitButton,
];
