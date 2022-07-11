import { MessageEntity } from '../../shared/entities';

export interface InspectedCommand {
  botName: string;
  name: string;
  args: string[];
}

export type BotInputMessage = Partial<
  Pick<MessageEntity, 'content' | 'images'>
>;
