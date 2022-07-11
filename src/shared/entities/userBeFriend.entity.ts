import { UserEntity } from './user.entity';

export enum FriendStatus {
  ACCEPTED = 'accepted',
  PENDING = 'pending',
  BLOCKED = 'blocked',
}

export interface UserBeFriendEntity {
  id: string;

  status: FriendStatus;

  leftUser: UserEntity;

  rightUser: UserEntity;
}
