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
  'templates' = 'tmp',
  'openTemplate' = 'opTmp',
  'editTemplate' = 'edTmp',
  'editWeek' = 'edWk',
  'setWeek' = 'stWk',
  'delete' = 'del',
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
    }
  | {
      event: EEvent.templates;
      i: number;
    }
  | {
      event: EEvent.openTemplate;
      i: number;
    }
  | {
      event: EEvent.editTemplate;
      i: number;
    }
  | {
      event: EEvent.editWeek;
    }
  | {
      event: EEvent.setWeek;
      i: number;
    }
  | {
      event: EEvent.delete;
    };
