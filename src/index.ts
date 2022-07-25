import { config } from 'dotenv';
import http from 'http';
import { cron } from './cron';
import { db } from './database/database';
import { telegram } from './telegram';

config();

db.initData().then(() => {
  telegram();
  //   cron();
});

http
  .createServer((req, res) => {
    res.write('Hello, world');
    res.end();
  })
  .listen(process.env.PORT || 3000);
