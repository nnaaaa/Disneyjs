import { BotEntity } from './bot.entity';

export interface CommandEntity {
  commandId: string;

  name: string;

  description: string;

  bot: BotEntity;

  args: string[];
}
