import { ESubDate, ESubTime } from './groups.type';

export enum ERole {
  user = 'user',
  admin = 'admin',
}

export type TUser = {
  tlgId: number;
  subs: { date: ESubDate; time: ESubTime }[];
  role: ERole;
};
