import { EEvent } from '../types/query-data.type';

export const quitButton = [
  {
    text: 'Закрыть меню',
    callback_data: JSON.stringify({
      event: EEvent.quit,
    }),
  },
];
