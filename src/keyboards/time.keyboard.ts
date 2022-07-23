import { InlineKeyboardButton } from 'node-telegram-bot-api';
import { EGroupTime, ESubDate, ESubTime } from '../types/groups.type';
import { EEvent } from '../types/query-data.type';
import { quitButton } from './quit.button';

export const timeWorkdayKeyboard = (chosenDate: ESubDate) => [
  [
    {
      text: EGroupTime.Morning,
      callback_data: JSON.stringify({
        event: EEvent.subscribeTime,
        time: ESubTime.subMrn,
        date: chosenDate,
      }),
    },
  ],
  [
    {
      text: EGroupTime.Afternoon,
      callback_data: JSON.stringify({
        event: EEvent.subscribeTime,
        time: ESubTime.subAft,
        date: chosenDate,
      }),
    },
  ],
  [
    {
      text: EGroupTime.Evening,
      callback_data: JSON.stringify({
        event: EEvent.subscribeTime,
        time: ESubTime.subEvn,
        date: chosenDate,
      }),
    },
  ],
  quitButton,
];

export const timeWeekendKeyboard = (
  date: ESubDate,
): InlineKeyboardButton[][] => [
  [
    {
      text: EGroupTime.WholeDay,
      callback_data: JSON.stringify({
        event: EEvent.subscribeTime,
        time: ESubTime.subWhl,
        date,
      }),
    },
  ],
  quitButton,
];
