import { config } from 'dotenv';
import { cron } from './cron';
import { db } from './database/database';
import { telegram } from './telegram';

config();

db.initData().then(() => {
  telegram();
  //   cron();
});
