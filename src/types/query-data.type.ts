import { EDate, ETime } from './date.type';

export enum EEvent {
  'subscribeDate' = 'subDate',
  'subscribeTime' = 'subTime',
  'unsubscribeTime' = 'unsubTime',
  'quit' = 'quit',
  'auth' = 'auth',
  'notifyAll' = 'notAll',
  'notifyGroup' = 'notGroup',
  'notifyGroupTime' = 'notGrTm',
}

export type TQueryData =
  | {
      event: EEvent.subscribeDate;
      date: EDate;
    }
  | {
      event: EEvent.subscribeTime;
      time: ETime;
      date: EDate;
    }
  | {
      event: EEvent.unsubscribeTime;
      time: ETime;
      date: EDate;
    }
  | {
      event: EEvent.quit;
    }
  | {
      event: EEvent.auth;
      tlgId: number;
    }
  | {
      event: EEvent.notifyAll;
    }
  | {
      event: EEvent.notifyGroup;
    }
  | {
      event: EEvent.notifyGroupTime;
      time: ETime;
      date: EDate;
    };
