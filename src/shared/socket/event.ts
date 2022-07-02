export enum UserSocketEvent {
    ONLINE = 'online',
    UPDATE_PROFILE = 'updateProfile',
    ADD_FRIEND = 'addFriend',
    ACCEPT_FRIEND = 'acceptFriend',
    BLOCK_FRIEND = 'blockFriend',
}

export enum GuildSocketEvent {
    CREATE = 'create',
    UPDATE = 'update',
    GET_ONE = 'getOne',
    GET_JOINED = 'getJoined',
    DELETE = 'delete',
}

export enum MemberSocketEvent {
    ONLINE = 'online',
    UPDATE = 'update',
    JOIN = 'join',
    LEAVE = 'leave',
}

export enum ChannelCtgSocketEvent {
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete',
}

export enum ChannelSocketEvent {
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete',
    // JOIN_CHANNEL = 'joinChannel',
    // LEAVE_CHANNEL = 'leaveChannel',
    // MEMBER_UPDATE = 'memberUpdate',
    // ONLINE = 'online',
}

export enum RoleSocketEvent {
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete',
    ADD_TO_MEMBER = 'addToMember',
    REMOVE_FROM_MEMBER = 'removeFromMember',
    ADD_TO_CHANNEL = 'addToChannel',
    REMOVE_FROM_CHANNEL = 'removeFromChannel',
}

export enum MessageSocketEvent {
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete',
}

export enum EmojiSocketEvent {
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete',
}

export enum ReactSocketEvent {
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete',
}
