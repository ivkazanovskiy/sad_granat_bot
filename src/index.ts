import { config } from 'dotenv';
import mongoose from 'mongoose';
import { cron } from './cron';
import { db } from './database/database';
import { telegram } from './telegram';
import { ERole } from './types/user.type';

config();

// mongoose.connect(process.env.MONGO_URI!).then(() => {
//   //   telegram();
//   cron();
// });
db.initData().then(async () => {
  await db.addUser(569);
  console.log(db.data);
  await db.setUserAsAdmin(569);
  console.log(db.data);
});
