import { CronJob } from 'cron';
import { config } from 'dotenv';
import { cron } from './cron/cron';
import { db } from './telegram/database/database';
import { telegram } from './telegram';

config();

// telegram();
cron();
