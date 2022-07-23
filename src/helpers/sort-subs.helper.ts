import { ESubDate, ESubTime } from '../types/groups.type';
import { TUser } from '../types/user.type';

export const sortSubs = (subs: TUser['subs']): void => {
  subs
    .sort(
      (a, b) =>
        Object.values(ESubTime).indexOf(a.time) -
        Object.values(ESubTime).indexOf(b.time),
    )
    .sort(
      (a, b) =>
        Object.values(ESubDate).indexOf(a.date) -
        Object.values(ESubDate).indexOf(b.date),
    );
};
