import { EDate, EGroupDate, EGroupTime, ETime } from '../types/date.type';
import { EEvent } from '../types/query-data.type';
import { quitButton } from './quit.button';

export const notifyKeyboard = [
  [
    {
      text: 'Отправить всем',
      callback_data: JSON.stringify({
        event: EEvent.notifyAll,
      }),
    },
  ],
  [
    {
      text: 'Отправить группе',
      callback_data: JSON.stringify({
        event: EEvent.notifyGroup,
      }),
    },
  ],
  quitButton,
];

export const notifyGroupKeyboard = [
  [
    {
      text: `${EGroupDate.Mon_Wed} | ${EGroupTime.Morning}`,
      callback_data: JSON.stringify({
        event: EEvent.notifyGroupTime,
        date: EDate.Mon,
        time: ETime.Mrn,
      }),
    },
  ],
  [
    {
      text: `${EGroupDate.Mon_Wed} | ${EGroupTime.Afternoon}`,
      callback_data: JSON.stringify({
        event: EEvent.notifyGroupTime,
        date: EDate.Mon,
        time: ETime.Aft,
      }),
    },
  ],
  [
    {
      text: `${EGroupDate.Mon_Wed} | ${EGroupTime.Evening}`,
      callback_data: JSON.stringify({
        event: EEvent.notifyGroupTime,
        date: EDate.Mon,
        time: ETime.Evn,
      }),
    },
  ],
  [
    {
      text: `${EGroupDate.Tue_Thu} | ${EGroupTime.Morning}`,
      callback_data: JSON.stringify({
        event: EEvent.notifyGroupTime,
        date: EDate.Tue,
        time: ETime.Mrn,
      }),
    },
  ],
  [
    {
      text: `${EGroupDate.Tue_Thu} | ${EGroupTime.Afternoon}`,
      callback_data: JSON.stringify({
        event: EEvent.notifyGroupTime,
        date: EDate.Tue,
        time: ETime.Aft,
      }),
    },
  ],
  [
    {
      text: `${EGroupDate.Tue_Thu} | ${EGroupTime.Evening}`,
      callback_data: JSON.stringify({
        event: EEvent.notifyGroupTime,
        date: EDate.Tue,
        time: ETime.Evn,
      }),
    },
  ],
  [
    {
      text: `${EGroupDate.Sat} | ${EGroupTime.WholeDay}`,
      callback_data: JSON.stringify({
        event: EEvent.notifyGroupTime,
        date: EDate.Sat,
        time: ETime.Whl,
      }),
    },
  ],
  [
    {
      text: `${EGroupDate.Sun} | ${EGroupTime.WholeDay}`,
      callback_data: JSON.stringify({
        event: EEvent.notifyGroupTime,
        date: EDate.Sun,
        time: ETime.Whl,
      }),
    },
  ],
  quitButton,
];
