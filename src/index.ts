import { config } from 'dotenv';
import mongoose from 'mongoose';
import { cron } from './cron';
import { telegram } from './telegram';

config();

mongoose.connect(process.env.MONGO_URI!).then(() => {
  //   telegram();
  cron();
});
