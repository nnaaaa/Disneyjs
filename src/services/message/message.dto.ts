import { MessageEntity } from '../../shared/entities';
import { MessageAction } from './action.service';

export interface InspectedCommand {
  botName: string;
  name: string;
  args: string[];
}

export type BotInputMessage = Partial<
  Pick<MessageEntity, 'content' | 'images'>
  > & {
    action?: MessageAction
};
