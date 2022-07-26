import { TUserJson } from '../database/types/user.type';
import { EEvent } from '../types/query-data.type';
import { quitButton } from './quit.button';

export const authKeyboard = (users: TUserJson[]) => [
  ...users.map((user) => [
    {
      text: user.tlgId.toString(),
      callback_data: JSON.stringify({
        event: EEvent.auth,
        tlgId: user.tlgId,
      }),
    },
  ]),
  quitButton,
];
