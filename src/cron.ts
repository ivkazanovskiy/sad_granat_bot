import { CronJob } from 'cron';
import { config } from 'dotenv';
import moment from 'moment-timezone';

config();

const { TIMEZONE } = process.env;
export const cron = () =>
  new CronJob(
    '* * * * * *',
    async () => {
      const now = moment.tz(TIMEZONE!);
      const tomorrow = now.clone().add(1, 'day');
      const afterTomorrow = now.clone().add(2, 'days');
      console.log(now.get('weekday'));
      console.log(now.get('isoWeekday'));

      console.log(TIMEZONE, moment.tz(TIMEZONE!).get('hours'));
    },
    null,
    true,
    TIMEZONE,
  );
