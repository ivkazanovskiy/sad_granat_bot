import { EDate, ETime } from './date.type';

export enum ERole {
  user = 'user',
  admin = 'admin',
}

export type TUser = {
  tlgId: number;
  isAuthorized: boolean;
  subs: { date: EDate; time: ETime }[];
  role: ERole;
};
