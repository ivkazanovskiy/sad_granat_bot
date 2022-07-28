import { CronJob } from 'cron';
import { config } from 'dotenv';
import { Counter } from './counter/Counter';

config();

export const cron = () =>
  new CronJob(
    '*/1 * * * * *',
    async () => {
      Counter.nextTick();
    },
    null,
    true,
    process.env.TZ,
  );
