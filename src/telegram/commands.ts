import { BotCommand } from 'node-telegram-bot-api';
import { ECommand } from './types/comands.type';

export const defaultCommands: BotCommand[] = [
  { command: ECommand.start, description: 'Начать пользоваться чатботом' },
];

export const userCommands: BotCommand[] = [
  ...defaultCommands,
  {
    command: ECommand.schedule,
    description: 'Посмотреть свои подписки.',
  },
  {
    command: ECommand.subscribe,
    description: 'Подписаться на рассылку уведомлений',
  },
  {
    command: ECommand.unsubscribe,
    description: 'Отписаться от рассылки уведомлений',
  },
];

export const adminCommands: BotCommand[] = [
  ...userCommands,
  {
    command: ECommand.authorize,
    description: 'Принять заявку',
  },
  {
    command: ECommand.notify,
    description: 'Оповестить пользователей',
  },
  {
    command: ECommand.templates,
    description: 'Шаблоны сообщений',
  },
  {
    command: ECommand.week,
    description: 'Настройки расписания',
  },
];
