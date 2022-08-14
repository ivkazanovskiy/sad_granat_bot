import { BotCommand } from 'node-telegram-bot-api';
import { ECommand } from './types/comands.type';

export const userCommands: BotCommand[] = [
  { command: ECommand.start, description: 'Начать пользоваться чатботом' },
  {
    command: ECommand.schedule,
    description: 'Посмотреть свои подписки',
  },
  {
    command: ECommand.subscribe,
    description: 'Подписаться на рассылку уведомлений',
  },
  {
    command: ECommand.unsubscribe,
    description: 'Отписаться от рассылки уведомлений',
  },
  {
    command: ECommand.delete,
    description: 'Удалить профиль и отписаться от всех уведомлений',
  },
  {
    command: ECommand.authorize,
    description: 'Админ: Принять заявку',
  },
  {
    command: ECommand.notify,
    description: 'Админ: Оповестить пользователей',
  },
  {
    command: ECommand.templates,
    description: 'Админ: Шаблоны сообщений',
  },
  {
    command: ECommand.week,
    description: 'Админ: Настройки расписания',
  },
];
