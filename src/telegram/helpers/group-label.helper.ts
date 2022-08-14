import { EDate, ETime } from '../types/date.type';

export const groupLabel = (date: EDate, time: ETime): string => {
  const dateLabel = {
    [EDate.Mon]: 'ПН,СР',
    [EDate.Tue]: 'ВТ,ЧТ',
    [EDate.Sat]: 'СБ',
    [EDate.Sun]: 'ВС',
  }[date];
  const timeLabel = {
    [ETime.Mrn]: 'УТРО',
    [ETime.Aft]: 'ДЕНЬ',
    [ETime.Evn]: 'ВЕЧЕР',
    [ETime.Whl]: null,
  }[time];

  return timeLabel ? `${dateLabel} | ${timeLabel}` : dateLabel;
};
