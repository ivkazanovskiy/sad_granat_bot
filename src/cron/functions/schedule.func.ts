import moment from 'moment-timezone';
import { EDate, ETime } from '../../telegram/types/date.type';
import { Counter } from '../counter/Counter';
import { send } from './sender.func';

export const scheduleLogic = async () => {
  const now = moment().tz(process.env.TZ!);
  const hour = now.get('hour');
  const minute = now.get('minute');
  const weekDay = now.get('isoWeekday');

  const condition = (w: number, h: number, m: number) =>
    weekDay === w && hour === h && minute === m;

  await Counter.start();
  await Counter.checkWeek();
  const { tick } = await Counter.get();

  send(14, EDate.Tue, ETime.Mrn);

  switch (tick) {
    case 1:
      if (condition(1, 18, 30)) {
        await send(1, EDate.Mon, ETime.Mrn);
        await send(1, EDate.Mon, ETime.Aft);
      }

      if (condition(2, 12, 0)) {
        await send(1, EDate.Mon, ETime.Evn);
      }

      if (condition(2, 18, 30)) {
        await send(1, EDate.Tue, ETime.Mrn);
        await send(1, EDate.Tue, ETime.Aft);
      }

      if (condition(3, 12, 0)) {
        await send(1, EDate.Tue, ETime.Evn);
      }

      if (condition(6, 18, 30)) {
        await send(1, EDate.Sat, ETime.Whl);
      }

      if (condition(7, 18, 30)) {
        await send(1, EDate.Sun, ETime.Whl);
      }

      if (condition(3, 9, 50)) {
        await send(2, EDate.Mon, ETime.Mrn);
      }

      if (condition(3, 13, 50)) {
        await send(2, EDate.Mon, ETime.Aft);
      }

      if (condition(3, 18, 50)) {
        await send(2, EDate.Mon, ETime.Evn);
      }

      if (condition(4, 9, 50)) {
        await send(2, EDate.Tue, ETime.Mrn);
      }

      if (condition(4, 13, 50)) {
        await send(2, EDate.Tue, ETime.Aft);
      }

      if (condition(4, 18, 50)) {
        await send(2, EDate.Tue, ETime.Evn);
      }

      break;
    case 2:
      if (condition(6, 9, 50)) {
        await send(2, EDate.Sat, ETime.Whl);
      }

      if (condition(7, 9, 50)) {
        await send(2, EDate.Sun, ETime.Whl);
      }

      if (condition(1, 9, 50)) {
        await send(3, EDate.Mon, ETime.Mrn);
      }

      if (condition(1, 13, 50)) {
        await send(3, EDate.Mon, ETime.Aft);
      }

      if (condition(1, 18, 50)) {
        await send(3, EDate.Mon, ETime.Evn);
      }

      if (condition(2, 9, 50)) {
        await send(3, EDate.Tue, ETime.Mrn);
      }

      if (condition(2, 13, 50)) {
        await send(3, EDate.Tue, ETime.Aft);
      }

      if (condition(2, 18, 50)) {
        await send(3, EDate.Tue, ETime.Evn);
      }

      if (condition(6, 13, 50)) {
        await send(3, EDate.Sat, ETime.Whl);
      }

      if (condition(7, 13, 50)) {
        await send(3, EDate.Sun, ETime.Whl);
      }

      if (condition(3, 18, 30)) {
        await send(4, EDate.Mon, ETime.Mrn);
        await send(4, EDate.Mon, ETime.Aft);
      }

      if (condition(4, 12, 0)) {
        await send(4, EDate.Mon, ETime.Evn);
      }

      if (condition(4, 18, 30)) {
        await send(4, EDate.Tue, ETime.Mrn);
        await send(4, EDate.Tue, ETime.Aft);
      }

      if (condition(5, 12, 0)) {
        await send(4, EDate.Tue, ETime.Evn);
      }
      break;
    case 3:
      if (condition(1, 13, 50)) {
        await send(4, EDate.Sat, ETime.Whl);
      }

      if (condition(2, 13, 50)) {
        await send(4, EDate.Sun, ETime.Whl);
      }

      if (condition(1, 9, 50)) {
        await send(5, EDate.Mon, ETime.Mrn);
      }

      if (condition(1, 13, 50)) {
        await send(5, EDate.Mon, ETime.Aft);
      }

      if (condition(1, 18, 50)) {
        await send(5, EDate.Mon, ETime.Evn);
      }

      if (condition(2, 9, 50)) {
        await send(5, EDate.Tue, ETime.Mrn);
      }

      if (condition(2, 13, 50)) {
        await send(5, EDate.Tue, ETime.Aft);
      }

      if (condition(2, 18, 50)) {
        await send(5, EDate.Tue, ETime.Evn);
      }

      if (condition(6, 9, 50)) {
        await send(5, EDate.Sat, ETime.Whl);
      }

      if (condition(7, 9, 50)) {
        await send(5, EDate.Sun, ETime.Whl);
      }

      if (condition(6, 12, 0)) {
        await send(6, EDate.Sat, ETime.Whl);
      }

      if (condition(7, 12, 0)) {
        await send(6, EDate.Sun, ETime.Whl);
      }

      if (condition(3, 18, 30)) {
        await send(7, EDate.Mon, ETime.Mrn);
        await send(7, EDate.Mon, ETime.Aft);
      }

      if (condition(4, 12, 0)) {
        await send(7, EDate.Mon, ETime.Evn);
      }

      if (condition(4, 18, 30)) {
        await send(7, EDate.Tue, ETime.Mrn);
        await send(7, EDate.Tue, ETime.Aft);
      }

      if (condition(5, 12, 0)) {
        await send(7, EDate.Tue, ETime.Evn);
      }

      if (condition(6, 19, 0)) {
        await send(7, EDate.Sat, ETime.Whl);
      }

      if (condition(7, 19, 0)) {
        await send(7, EDate.Sun, ETime.Whl);
      }

      break;
    case 4:
      if (condition(1, 9, 50)) {
        await send(8, EDate.Mon, ETime.Mrn);
      }

      if (condition(1, 13, 50)) {
        await send(8, EDate.Mon, ETime.Aft);
      }

      if (condition(1, 18, 50)) {
        await send(8, EDate.Mon, ETime.Evn);
      }

      if (condition(2, 9, 50)) {
        await send(8, EDate.Tue, ETime.Mrn);
      }

      if (condition(2, 13, 50)) {
        await send(8, EDate.Tue, ETime.Aft);
      }

      if (condition(2, 18, 50)) {
        await send(8, EDate.Tue, ETime.Evn);
      }

      if (condition(6, 9, 50)) {
        await send(8, EDate.Sat, ETime.Whl);
      }

      if (condition(7, 9, 50)) {
        await send(8, EDate.Sun, ETime.Whl);
      }

      if (condition(1, 18, 30)) {
        await send(9, EDate.Mon, ETime.Mrn);
        await send(9, EDate.Mon, ETime.Aft);
      }

      if (condition(2, 12, 0)) {
        await send(9, EDate.Mon, ETime.Evn);
      }

      if (condition(2, 18, 30)) {
        await send(9, EDate.Tue, ETime.Mrn);
        await send(9, EDate.Tue, ETime.Aft);
      }

      if (condition(3, 12, 0)) {
        await send(9, EDate.Tue, ETime.Evn);
      }

      // TODO: is it correct?
      if (condition(1, 13, 50)) {
        await send(9, EDate.Sat, ETime.Whl);
      }

      // TODO: is it correct?
      if (condition(2, 13, 50)) {
        await send(9, EDate.Sun, ETime.Whl);
      }

      if (condition(5, 21, 30)) {
        await send(10, EDate.Mon, ETime.Mrn);
        await send(10, EDate.Mon, ETime.Aft);
        await send(10, EDate.Mon, ETime.Evn);
        await send(10, EDate.Tue, ETime.Mrn);
        await send(10, EDate.Tue, ETime.Aft);
        await send(10, EDate.Tue, ETime.Evn);
        await send(10, EDate.Sat, ETime.Whl);
        await send(10, EDate.Sun, ETime.Whl);
      }

      break;
    case 5:
      if (condition(1, 11, 30)) {
        await send(11, EDate.Mon, ETime.Mrn);
      }

      if (condition(1, 15, 0)) {
        await send(11, EDate.Mon, ETime.Aft);
      }

      if (condition(1, 20, 30)) {
        await send(11, EDate.Mon, ETime.Evn);
      }

      if (condition(2, 11, 30)) {
        await send(11, EDate.Tue, ETime.Mrn);
      }

      if (condition(2, 15, 0)) {
        await send(11, EDate.Tue, ETime.Aft);
      }

      if (condition(2, 20, 30)) {
        await send(11, EDate.Tue, ETime.Evn);
      }

      if (condition(6, 12, 0)) {
        await send(11, EDate.Sat, ETime.Whl);
      }

      if (condition(7, 12, 0)) {
        await send(11, EDate.Sun, ETime.Whl);
      }

      if (condition(3, 9, 50)) {
        await send(12, EDate.Mon, ETime.Mrn);
      }

      if (condition(3, 13, 50)) {
        await send(12, EDate.Mon, ETime.Aft);
      }

      if (condition(3, 18, 50)) {
        await send(12, EDate.Mon, ETime.Evn);
      }

      if (condition(4, 9, 50)) {
        await send(12, EDate.Tue, ETime.Mrn);
      }

      if (condition(4, 13, 50)) {
        await send(12, EDate.Tue, ETime.Aft);
      }

      if (condition(4, 18, 50)) {
        await send(12, EDate.Tue, ETime.Evn);
      }

      if (condition(6, 13, 50)) {
        await send(12, EDate.Sat, ETime.Whl);
      }

      if (condition(7, 13, 50)) {
        await send(12, EDate.Sun, ETime.Whl);
      }

      break;
    case 6:
      if (condition(1, 11, 30)) {
        await send(13, EDate.Mon, ETime.Mrn);
      }

      if (condition(1, 15, 0)) {
        await send(13, EDate.Mon, ETime.Aft);
      }

      if (condition(1, 20, 30)) {
        await send(13, EDate.Mon, ETime.Evn);
      }

      if (condition(2, 11, 30)) {
        await send(13, EDate.Tue, ETime.Mrn);
      }

      if (condition(2, 15, 0)) {
        await send(13, EDate.Tue, ETime.Aft);
      }

      if (condition(2, 20, 30)) {
        await send(13, EDate.Tue, ETime.Evn);
      }

      if (condition(6, 12, 0)) {
        await send(13, EDate.Sat, ETime.Whl);
      }

      if (condition(7, 12, 0)) {
        await send(13, EDate.Sun, ETime.Whl);
      }

      if (condition(3, 18, 30)) {
        await send(14, EDate.Mon, ETime.Mrn);
        await send(14, EDate.Mon, ETime.Aft);
      }

      if (condition(4, 12, 0)) {
        await send(14, EDate.Mon, ETime.Evn);
      }

      if (condition(4, 18, 30)) {
        await send(14, EDate.Tue, ETime.Mrn);
        await send(14, EDate.Tue, ETime.Aft);
      }

      if (condition(5, 12, 0)) {
        await send(14, EDate.Tue, ETime.Evn);
      }

      if (condition(6, 19, 0)) {
        await send(14, EDate.Sat, ETime.Whl);
      }

      if (condition(6, 19, 0)) {
        await send(14, EDate.Sun, ETime.Whl);
      }
      break;
    default:
      // if tick === 0 do nothing
      return undefined;
  }
};
