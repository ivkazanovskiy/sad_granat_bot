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

export enum ESubDate {
  subMon = 'subMon',
  subTue = 'subTue',
  subSat = 'subSat',
  subSun = 'subSun',
}

export enum ESubTime {
  subMrn = 'subMrn',
  subAft = 'subAft',
  subEvn = 'subEvn',
  subWhl = 'subWhl',
}

export const Translator = {
  [ESubDate.subMon]: EGroupDate.Mon_Wed,
  [ESubDate.subTue]: EGroupDate.Tue_Thu,
  [ESubDate.subSat]: EGroupDate.Sat,
  [ESubDate.subSun]: EGroupDate.Sun,
  [ESubTime.subMrn]: EGroupTime.Morning,
  [ESubTime.subAft]: EGroupTime.Afternoon,
  [ESubTime.subEvn]: EGroupTime.Evening,
  [ESubTime.subWhl]: EGroupTime.WholeDay,
};
