import { InlineKeyboardButton } from 'node-telegram-bot-api';
import { EDate, EGroupTime, ETime } from '../types/date.type';
import { EEvent } from '../types/query-data.type';
import { quitButton } from './quit.button';

const templateButton = (i: number): InlineKeyboardButton => ({
  text: i.toString(),
  callback_data: JSON.stringify({
    event: EEvent.templates,
    i,
  }),
});

export const templatesKeyboard = (): InlineKeyboardButton[][] => {
  const keyboard: InlineKeyboardButton[][] = [];
  const row: InlineKeyboardButton[] = [];
  for (let i = 1; i <= 14; i += 1) {
    row.push(templateButton(i));
    if (i % 3 === 0) {
      keyboard.push([...row]);
      row.length = 0;
    }
  }
  if (row.length) keyboard.push([...row]);
  keyboard.push(quitButton);
  return keyboard;
};

export const templateOptionsKeyboard = (
  i: number,
): InlineKeyboardButton[][] => [
  [
    {
      text: 'Просмотреть сообщение',
      callback_data: JSON.stringify({
        event: EEvent.openTemplate,
        i,
      }),
    },
  ],
  [
    {
      text: 'Редактировать сообщение',
      callback_data: JSON.stringify({
        event: EEvent.editTemplate,
        i,
      }),
    },
  ],
  quitButton,
];
