import { log } from 'console';
import { config } from 'dotenv';
import { readFile, writeFile } from 'fs/promises';
import moment from 'moment-timezone';
import * as path from 'path';
import { TCounterData } from './types/counter-data.type';

config();
export class Counter {
  static tz = process.env.TZ!;

  static async start() {
    const prevData = await this.get().catch(() =>
      console.log('Creating counter.json...'),
    );

    if (prevData) return;

    // init Counter only once
    const week = moment().tz(this.tz).isoWeek();
    const tick = 1;
    await writeFile(
      path.join(__dirname, '../../../counter.json'),
      JSON.stringify({
        week,
        tick,
      }),
    );

    console.log('counter.json has been created');
  }

  static async get(): Promise<TCounterData> {
    const data = await readFile(
      path.join(__dirname, '../../../counter.json'),
      'utf8',
    )
      .then((str) => JSON.parse(str))
      .catch(() => null);

    if (!data) throw new Error('Firstly run Counter.start');

    return data;
  }

  static async set(tick: number, week?: number) {
    const prevData = await this.get();

    return writeFile(
      path.join(__dirname, '../../../counter.json'),
      JSON.stringify({
        week: week || prevData.week,
        tick,
      }),
    );
  }

  static async checkWeek() {
    const prevData = await this.get();
    const currentWeek = moment().tz(this.tz).isoWeek();
    const currentWeekDay = moment().tz(this.tz).isoWeekday();

    // change week only on monday
    if (currentWeekDay !== 1) return;

    // in the first week of the year or every next week change Counter.week
    if (currentWeek === 1 || currentWeek > prevData.week) {
      if (prevData.tick >= 6) {
        return this.set(1, currentWeek);
      }
      return this.set(prevData.tick + 1, currentWeek);
    }
  }
}
