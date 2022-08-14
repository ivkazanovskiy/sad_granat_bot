import { readFile } from 'fs/promises';
import * as path from 'path';
import { EDate, ETime } from '../../telegram/types/date.type';

export const send = async (template: number, day: EDate, time: ETime) => {
  const text = await readFile(
    path.join(__dirname, `../../../templates/${template}.txt`),
    'utf8',
  );
  console.log('🖨️ ~ send ~ text', text, day, time);
};
