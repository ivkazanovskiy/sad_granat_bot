import { CronJob } from 'cron';
import { config } from 'dotenv';
import moment from 'moment-timezone';
import { User } from './models/user.model';

config();

const { TIMEZONE } = process.env;
export const cron = () =>
  new CronJob(
    '*/5 * * * * *',
    async () => {
      const users = await User.find();
      console.log('🖨️ ~ users', users);
      const now = moment.tz(TIMEZONE!);
      const tomorrow = now.clone().add(1, 'day');
      const afterTomorrow = now.clone().add(2, 'days');
      console.log(now.get('weekday'));
      console.log(now.get('isoWeekday'));

      console.log(moment.tz(TIMEZONE!));
    },
    null,
    true,
    TIMEZONE,
  );
