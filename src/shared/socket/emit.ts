export enum UserSocketEmit {
    ONLINE = 'online',
    UPDATE_PROFILE = 'updateProfile',
    ADD_FRIEND = 'addFriend',
    ACCEPT_FRIEND = 'acceptFriend',
    BLOCK_FRIEND = 'blockFriend',
}

export enum GuildSocketEmit {
    UPDATE = 'update',
    DELETE = 'delete',
}

export enum MemberSocketEmit {
    JOIN = 'join',
    LEAVE = 'leave',
    UPDATE = 'ipdate',
    ONLINE = 'online',
}

export enum ChannelCtgSocketEmit {
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete',
}

export enum ChannelSocketEmit {
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete',

    USER_JOIN = 'join',
    USER_LEAVE = 'leave',
    USER_UPDATE = 'memberUpdate',
    USER_ONLINE = 'online',

    ADD_ROLE = 'addRole',
    REMOVE_ROLE = 'removeRole',
    // ADD_MEMBER = 'addMember',
    // REMOVE_MEMBER = 'removeMember',
}

export enum RoleSocketEmit {
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete',
}

export enum MessageSocketEmit {
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete',
}

export enum EmojiSocketEmit {
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete',
}

export enum ReactSocketEmit {
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete',
}
