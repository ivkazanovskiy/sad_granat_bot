import { EDate, ETime } from '../types/date.type';
import { TUser } from '../types/user.type';

export const sortSubs = (subs: TUser['subs']): void => {
  subs
    .sort(
      (a, b) =>
        Object.values(ETime).indexOf(a.time) -
        Object.values(ETime).indexOf(b.time),
    )
    .sort(
      (a, b) =>
        Object.values(EDate).indexOf(a.date) -
        Object.values(EDate).indexOf(b.date),
    );
};
