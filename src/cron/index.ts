import { CronJob } from 'cron';
import { scheduleLogic } from './functions/schedule.func';

export const cron = () =>
  new CronJob(process.env.CRON!, scheduleLogic, null, true, process.env.TZ!);
