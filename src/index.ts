import { config } from 'dotenv';
import { cron } from './cron';
import { telegram } from './telegram';

config();

telegram();
cron();
