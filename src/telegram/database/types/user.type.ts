import { EDate, ETime } from '../../types/date.type';
import { ERole } from '../../types/user.type';

export type TUserJson = {
  tlgId: number;
  isAuthorized: boolean;
  subs: { date: EDate; time: ETime }[];
  role: ERole;
};
