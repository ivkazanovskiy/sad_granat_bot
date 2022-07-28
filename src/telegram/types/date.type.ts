export enum EGroupDate {
  'Mon_Wed' = 'Понедельник, Среда',
  'Tue_Thu' = 'Вторник, Четверг',
  'Sat' = 'Суббота',
  'Sun' = 'Воскресенье',
}

export enum EGroupTime {
  'Morning' = 'Утро 10:00-13:00',
  'Afternoon' = 'День 14:00-17:00',
  'Evening' = 'Вечер 19:00-22:00',
  'WholeDay' = 'Весь день 10:00-17:00',
}

export enum EDate {
  Mon = 'Mon',
  Tue = 'Tue',
  Sat = 'Sat',
  Sun = 'Sun',
}

export enum ETime {
  Mrn = 'Mrn',
  Aft = 'Aft',
  Evn = 'Evn',
  Whl = 'Whl',
}

export const Translator = {
  [EDate.Mon]: EGroupDate.Mon_Wed,
  [EDate.Tue]: EGroupDate.Tue_Thu,
  [EDate.Sat]: EGroupDate.Sat,
  [EDate.Sun]: EGroupDate.Sun,
  [ETime.Mrn]: EGroupTime.Morning,
  [ETime.Aft]: EGroupTime.Afternoon,
  [ETime.Evn]: EGroupTime.Evening,
  [ETime.Whl]: EGroupTime.WholeDay,
};
