import { ESubDate, ESubTime } from './groups.type';

export enum EEvent {
  'subscribeDate' = 'subDate',
  'subscribeTime' = 'subTime',
  'unsubscribeTime' = 'unsubTime',
  'quit' = 'quit',
}

export type TQueryData =
  | {
      event: EEvent.subscribeDate;
      date: ESubDate;
    }
  | {
      event: EEvent.subscribeTime;
      time: ESubTime;
      date: ESubDate;
    }
  | {
      event: EEvent.unsubscribeTime;
      time: ESubTime;
      date: ESubDate;
    }
  | {
      event: EEvent.quit;
    };
