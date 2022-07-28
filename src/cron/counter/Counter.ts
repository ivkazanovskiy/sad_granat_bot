import { config } from 'dotenv';
import { readFile, writeFile } from 'fs/promises';
import moment from 'moment-timezone';
import * as path from 'path';
import { TCounterData } from './types/counter-data.type';

config();

export class Counter {
  static tz = process.env.TZ!;

  static get(): Promise<TCounterData | null> {
    return readFile(path.join(__dirname, '../../../counter.json'), 'utf8')
      .then((str) => JSON.parse(str))
      .catch(() => null);
  }

  static set(tick: number) {
    const week = moment().tz(this.tz).week();
    return writeFile(
      path.join(__dirname, '../../../counter.json'),
      JSON.stringify({
        week,
        tick,
      }),
    );
  }

  static async nextTick() {
    const counter = await this.get();
    if (!counter || counter.tick >= 6) {
      return this.set(1);
    }
    return this.set(counter.tick + 1);
  }
}
