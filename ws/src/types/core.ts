

export enum OpCodeEnum {
  /** Receive -> An event was dispatched. */
  Dispatch = 0,
  /** Send/Receive -> Fired periodically by the client to keep the connection alive. */
  Heartbeat = 1,
  /** Send -> Starts a new session during the initial handshake. */
  Identify = 2,
  /** Send -> Update the client's presence. */
  PresenceUpdate = 3,
  /** Send -> Used to join/leave or move between voice channels. */
  VoiceStateUpdate = 4,
  /** Send -> Resume a previous session that was disconnected. */
  Resume = 6,
  /** Receive -> You should attempt to reconnect and resume immediately. */
  Reconnect = 7,
  /** Send -> Request information about offline guild members in a large guild. */
  RequestGuildMembers = 8,
  /** Receive -> The session has been invalidated. You should reconnect and identify/resume accordingly. */
  InvalidSession = 9,
  /** Receive -> Sent immediately after connecting, contains the heartbeatInterval to use. */
  Hello = 10,
  /** Receive -> Sent in response to receiving a heartbeat to acknowledge that it has been received. */
  HeartbeatAck = 11,
}

export enum GatewayCloseEventEnum {
  /** We're not sure what went wrong. Try reconnecting? */
  UnknownError = 4000,
  /** You sent an invalid Gateway opcode or an invalid payload for an opcode. Don't do that! */
  UnknownOpcode = 4001,
  /** You sent an invalid payload to us. Don't do that! */
  DecodeError = 4002,
  /** You sent us a payload prior to identifying. */
  NotAuthenticated = 4003,
  /** The account token sent with your identify payload is incorrect. */
  AuthenticationFailed = 4004,
  /** You sent more than one identify payload. Don't do that! */
  AlreadyAuthenticated = 4005,
  /** The sequence sent when resuming the session was invalid. Reconnect and start a new session. */
  InvalidSeq = 4007,
  /** Woah nelly! You're sending payloads to us too quickly. Slow it down! You will be disconnected on receiving this. */
  RateLimited = 4008,
  /** Your session timed out. Reconnect and start a new one. */
  SessionTimedOut = 4009,
  /** You sent us an invalid shard when identifying. */
  InvalidShard = 4010,
  /** The session would have handled too many guilds - you are required to shard your connection in order to connect. */
  ShardingRequired = 4011,
  /** You sent an invalid version for the gateway. */
  InvalidAPIVersion = 4012,
  /** You sent an invalid intent for a Gateway Intent. You may have incorrectly calculated the bitwise value. */
  InvalidIntent = 4013,
  /** You sent a disallowed intent for a Gateway Intent. You may have tried to specify an intent that you have not enabled or are not whitelisted for. */
  DisallowedIntent = 4014,
}

/** Interactions are not supported */
export enum EventNameEnum {
  /** Sent when a new guild channel is created, relevant to the current user. The inner payload is a channel object. */
  ChannelCreate = 'CHANNEL_CREATE',
  /** Sent when a channel is updated. The inner payload is a channel object. This is not sent when the field last_message_id is altered. To keep track of the last_message_id changes, you must listen for Message Create events. */
  ChannelUpdate = 'CHANNEL_UPDATE',
  /** Sent when a channel relevant to the current user is deleted. The inner payload is a channel object. */
  ChannelDelete = 'CHANNEL_DELETE',
  /** Sent when a message is pinned or unpinned in a text channel. This is not sent when a pinned message is deleted. */
  ChannelPinsUpdate = 'CHANNEL_PINS_UPDATE',
  /**
   * This event can be sent in three different scenarios:
   * 1. When a user is initially connecting, to lazily load and backfill information for all unavailable guilds sent in the Ready event. Guilds that are unavailable due to an outage will send a Guild Delete event.
   * 2. When a Guild becomes available again to the client.
   * 3. When the current user joins a new Guild.
   * The inner payload is a guild object, with all the extra fields specified.
   * If you do not have the GuildPresences Gateway Intent, or if the guild has over 75k members, members and presences returned in this event will only contain you and users in voice channels.
   */
  GuildCreate = 'GUILD_CREATE',
  /** Sent when a guild is updated. The inner payload is a guild object. */
  GuildUpdate = 'GUILD_UPDATE',
  /** Sent when a guild becomes or was already unavailable due to an outage, or when the user leaves or is removed from a guild. The inner payload is an unavailable guild object. If the unavailable field is not set, the user was removed from the guild.*/
  GuildDelete = 'GUILD_DELETE',
  /** Sent when a user is banned from a guild. */
  GuildBanAdd = 'GUILD_BAN_ADD',
  /** Sent when a user is unbanned from a guild. */
  GuildBanRemove = 'GUILD_BAN_REMOVE',
  /** Sent when a guild's emojis have been updated. */
  GuildEmojisUpdate = 'GUILD_EMOJIS_UPDATE',
  /** Sent when a guild integration is updated. */
  GuildIntegrationsUpdate = 'GUILD_INTEGRATIONS_UPDATE',
  /** If using Gateway Intents, the GuildMembers intent will be required to receive this event. Sent when a new user joins a guild. The inner payload is a guild member object with an extra guildId key. */
  GuildMemberAdd = 'GUILD_MEMBER_ADD',
  /** If using Gateway Intents, the GUILD_MEMBERS intent will be required to receive this event. Sent when a user is removed from a guild (leave/kick/ban). */
  GuildMemberRemove = 'GUILD_MEMBER_REMOVE',
  /** If using Gateway Intents, the GUILD_MEMBERS intent will be required to receive this event. Sent when a guild member is updated. This will also fire when the user object of a guild member changes. */
  GuildMemberUpdate = 'GUILD_MEMBER_UPDATE',
  /** Sent in response to GuildRequestMembers. You can use the chunkIndex and chunkCount to calculate how many chunks are left for your request. */
  GuildMembersChunk = 'GUILD_MEMBERS_CHUNK',
  /** Sent when a guild role is created. */
  GuildRoleCreate = 'GUILD_ROLE_CREATE',
  /** Sent when a guild role is updated. */
  GuildRoleUpdate = 'GUILD_ROLE_UPDATE',
  /** Sent when a guild role is deleted. */
  GuildRoleDelete = 'GUILD_ROLE_DELETE',
  /** Sent when a new invite to a channel is created. */
  InviteCreate = 'INVITE_CREATE',
  /** Sent when an invite is deleted. */
  InviteDelete = 'INVITE_DELETE',
  /** Sent when a message is created. The inner payload is a message object. */
  MessageCreate = 'MESSAGE_CREATE',
  /** Sent when a message is updated. The inner payload is a message object. */
  MessageUpdate = 'MESSAGE_UPDATE',
  /** Sent when a message is deleted. */
  MessageDelete = 'MESSAGE_DELETE',
  /** Sent when multiple messages are deleted at once. */
  MessageDeleteBulk = 'MESSAGE_DELETE_BULK',
  /** Sent when a user adds a reaction to a message. */
  MessageReactionAdd = 'MESSAGE_REACTION_ADD',
  /** Sent when a user removes a reaction from a message. */
  MessageReactionRemove = 'MESSAGE_REACTION_REMOVE',
  /** Sent when a user explicitly removes all reactions from a message. */
  MessageReactionRemoveAll = 'MESSAGE_REACTION_REMOVE_ALL',
  /** Sent when a bot removes all instances of a given emoji from the reactions of a message. */
  MessageReactionRemoveEmoji = 'MESSAGE_REACTION_REMOVE_EMOJI',
  /** If you are using Gateway Intents, you must specify the GuildPresences intent in order to receive Presence Update events. A user's presence is their current state on a guild. This event is sent when a user's presence or info, such as name or avatar, is updated.*/
  PresenceUpdate = 'PRESENCE_UPDATE',
  /** Sent when a user starts typing in a channel. */
  TypingStart = 'TYPING_START',
  /** Sent when properties about the user change. Inner payload is a user object. */
  UserUpdate = 'USER_UPDATE',
  /** Sent when someone joins/leaves/moves voice channels. Inner payload is a voice state object. */
  VoiceStateUpdate = 'VOICE_STATE_UPDATE',
  /** Sent when a guild's voice server is updated. This is sent when initially connecting to voice, and when the current voice instance fails over to a new server. */
  VoiceServerUpdate = 'VOICE_SERVER_UPDATE',
  /** Sent when a guild channel's webhook is created, updated, or deleted. */
  WebhooksUpdate = 'WEBHOOKS_UPDATE',
}
