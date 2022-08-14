import { InlineKeyboardButton } from 'node-telegram-bot-api';
import { EEvent } from '../types/query-data.type';
import { quitButton } from './quit.button';

export const weekOptionsKeyboard: InlineKeyboardButton[][] = [
  [
    {
      text: 'Изменить номер текущей недели',
      callback_data: JSON.stringify({
        event: EEvent.editWeek,
      }),
    },
  ],
  quitButton,
];

const weekButton = (i: number): InlineKeyboardButton => ({
  text: i.toString(),
  callback_data: JSON.stringify({
    event: EEvent.setWeek,
    i,
  }),
});

const weekPauseButton: InlineKeyboardButton = {
  text: 'Поставить на паузу.',
  callback_data: JSON.stringify({
    event: EEvent.setWeek,
    i: 0,
  }),
};

export const weeksKeyboard = (): InlineKeyboardButton[][] => {
  const keyboard: InlineKeyboardButton[][] = [];
  const row: InlineKeyboardButton[] = [];
  for (let i = 1; i <= 6; i += 1) {
    row.push(weekButton(i));
    if (i % 3 === 0) {
      keyboard.push([...row]);
      row.length = 0;
    }
  }
  keyboard.push([weekPauseButton]);
  keyboard.push(quitButton);
  return keyboard;
};
