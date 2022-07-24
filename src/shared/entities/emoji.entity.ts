import { GuildEntity } from './guild.entity';
import { ReactEntity } from './react.entity';

export interface EmojiEntity {
  emojiId: string;

  imageUrl: string;

  name: string;

  guild: GuildEntity;

  reacts: ReactEntity[];
}
