import { EEvent } from '../types/query-data.type';
import { quitButton } from './quit.button';

export const deleteKeyboard = [
  [
    {
      text: 'Удалить профиль и отписаться',
      callback_data: JSON.stringify({
        event: EEvent.delete,
      }),
    },
  ],
  quitButton,
];
