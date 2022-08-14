import { CronJob } from 'cron';
import { scheduleLogic } from './functions/schedule.func';

export const cron = () =>
  new CronJob('*/1 * * * * *', scheduleLogic, null, true, process.env.TZ);
