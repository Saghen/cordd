import {
  IChannel,
  IEmoji,
  IGuild,
  IGuildMember,
  IInvite,
  IMessage,
  IRole,
  IUser,
  IVoiceState,
  TargetUserTypesEnum,
} from '@cordd/core'
import { EventNameEnum, OpCodeEnum } from './core'

export type RawGatewayPayload = {
  op: OpCodeEnum
  d: any
  s?: number
  t?: EventNameEnum
}

export type GatewayDispatchPayload =
  | ChannelCreatePayload
  | ChannelUpdatePayload
  | ChannelDeletePayload
  | ChannelPinsUpdatePayload
  | GuildCreatePayload
  | GuildUpdatePayload
  | GuildDeletePayload
  | GuildBanAddPayload
  | GuildBanRemovePayload
  | GuildEmojisUpdatePayload
  | GuildIntegrationsUpdatePayload
  | GuildMemberAddPayload
  | GuildMemberRemovePayload
  | GuildMemberUpdatePayload
  | GuildMembersChunkPayload
  | GuildRoleCreatePayload
  | GuildRoleDeletePayload
  | InviteCreatePayload
  | InviteDeletePayload
  | MessageCreatePayload
  | MessageUpdatePayload
  | MessageDeletePayload
  | MessageDeleteBulkPayload
  | MessageReactionRemovePayload
  | MessageReactionRemoveAllPayload
  | MessageReactionRemoveEmojiPayload
  | TypingStartPayload
  | UserUpdatePayload
  | VoiceStateUpdatePayload
  | VoiceServerUpdatePayload
  | WebhookUpdatePayload

export type GatewayPayload =
  | GatewayDispatchPayload
  | GatewayHeartbeatPayload
  | GatewayIdentifyPayload
  | GatewayReconnectPayload
  | GatewayInvalidSessionPayload
  | GatewayHelloPayload
  | GatewayHeartbeatAckPayload

export type GatewayGenericPayload<
  OpCode extends OpCodeEnum,
  IData extends object | boolean,
  EventName extends EventNameEnum = undefined
> = Pick<
  {
    op: OpCode
    data: IData
    sequenceNumber: number
    eventName: EventName
  },
  OpCode extends OpCodeEnum.Dispatch
    ? 'op' | 'data' | 'sequenceNumber' | 'eventName'
    : 'op' | 'data'
>

export type GatewayHeartbeatPayload = GatewayGenericPayload<OpCodeEnum.Heartbeat, undefined>
export type GatewayIdentifyPayload = GatewayGenericPayload<OpCodeEnum.Identify, undefined>
export type GatewayReconnectPayload = GatewayGenericPayload<OpCodeEnum.Reconnect, undefined>
export type GatewayInvalidSessionPayload = GatewayGenericPayload<OpCodeEnum.InvalidSession, false>
export type GatewayHelloPayload = GatewayGenericPayload<
  OpCodeEnum.Hello,
  { heartbeatInterval: number }
>
export type GatewayHeartbeatAckPayload = GatewayGenericPayload<OpCodeEnum.HeartbeatAck, undefined>

// Dispatch Payloads
export type GatewayGenericDispatchPayload<
  IData extends object,
  EventName extends EventNameEnum
> = GatewayGenericPayload<OpCodeEnum.Dispatch, IData, EventName>


// Channels
type ChannelCreatePayload = GatewayGenericDispatchPayload<IChannel, EventNameEnum.ChannelCreate>
type ChannelUpdatePayload = GatewayGenericDispatchPayload<IChannel, EventNameEnum.ChannelUpdate>
type ChannelDeletePayload = GatewayGenericDispatchPayload<IChannel, EventNameEnum.ChannelDelete>

interface IChannelPinsUpdateFields {
  /** The id of the guild */
  guildId?: string
  /** The id of the channel */
  channelId: string
  /** The time at which the most recent pinned message was pinned */
  lastPinTimestamp?: Date
}

type ChannelPinsUpdatePayload = GatewayGenericDispatchPayload<
  IChannelPinsUpdateFields,
  EventNameEnum.ChannelPinsUpdate
>

// Guilds
type GuildCreatePayload = GatewayGenericDispatchPayload<IGuild, EventNameEnum.GuildCreate>
type GuildUpdatePayload = GatewayGenericDispatchPayload<IGuild, EventNameEnum.GuildUpdate>
type GuildDeletePayload = GatewayGenericDispatchPayload<
  { unavailable: true } & Pick<IGuild, 'id'>,
  EventNameEnum.GuildDelete
> // Use IUnavailableGuild from api

interface IGuildBanAddFields {
  /** Id of the guild */
  guildId: string
  /** The banned user */
  user: IUser
}
type GuildBanAddPayload = GatewayGenericDispatchPayload<
  IGuildBanAddFields,
  EventNameEnum.GuildBanAdd
>

interface IGuildBanRemoveFields {
  /** Id of the guild */
  guildId: string
  /** The banned user */
  user: IUser
}
type GuildBanRemovePayload = GatewayGenericDispatchPayload<
  IGuildBanRemoveFields,
  EventNameEnum.GuildBanRemove
>

interface IGuildEmojisUpdateFields {
  /** Id of the guild */
  guildId: string
  /** Array of emojis */
  emojis: IEmoji[]
}
type GuildEmojisUpdatePayload = GatewayGenericDispatchPayload<
  IGuildEmojisUpdateFields,
  EventNameEnum.GuildEmojisUpdate
>

interface IGuildIntegrationsUpdateFields {
  /** Id of the guild */
  guildId: string
}
type GuildIntegrationsUpdatePayload = GatewayGenericDispatchPayload<
  IGuildIntegrationsUpdateFields,
  EventNameEnum.GuildIntegrationsUpdate
>

interface IGuildMemberAddFields extends IGuildMember {
  /** Id of the guild */
  guildId: string
}
type GuildMemberAddPayload = GatewayGenericDispatchPayload<
  IGuildMemberAddFields,
  EventNameEnum.GuildMemberAdd
>

interface IGuildMemberRemoveFields {
  /** Id of the guild */
  guildId: string
  /** The user who was removed */
  user: IUser
}
type GuildMemberRemovePayload = GatewayGenericDispatchPayload<
  IGuildMemberRemoveFields,
  EventNameEnum.GuildMemberRemove
>

interface IGuildMemberUpdateFields {
  /** The id of the guild */
  guildId: string
  /** User role ids */
  roles: string[]
  /** The user */
  user: IUser
  /** Nickname of the user in the guild */
  nick?: string
  /** When the user joined the guild */
  joinedAt: Date
  /** When the user starting boosting the guild */
  premiumSince?: Date
  /** Whether the user has not yet passed the guild's Membership Screening requirements */
  pending?: boolean
}
type GuildMemberUpdatePayload = GatewayGenericDispatchPayload<
  IGuildMemberUpdateFields,
  EventNameEnum.GuildMemberRemove
>

interface IGuildMembersChunkFields {
  /** The id of the guild */
  guildId: string
  /** Set of guild members */
  members: IGuildMember[]
  /** The chunk index in the expected chunks for this response (0 <= chunkIndex < chunkCount) */
  chunkIndex: number
  /** The total number of expected chunks for this response */
  chunkCount: number
  /** If passing an invalid id to RequestGuildMembers, it will be returned here */
  notFound?: string[]
  /** If passing true to RequestGuildMembers, presences of the returned members will be here */
  presences?: IPresenceUpdateFields[]
  /** The nonce used in the Guild Members Request */
  nonce?: string
}
type GuildMembersChunkPayload = GatewayGenericDispatchPayload<
  IGuildMembersChunkFields,
  EventNameEnum.GuildMembersChunk
>

interface IGuildRoleCreateFields {
  /** Id of the guild */
  guildId: string
  /** The role created */
  role: IRole
}
type GuildRoleCreatePayload = GatewayGenericDispatchPayload<
  IGuildRoleCreateFields,
  EventNameEnum.GuildRoleCreate
>

interface IGuildRoleUpdateFields {
  /** Id of the guild */
  guildId: string
  /** The role update */
  role: IRole
}
type GuildRoleUpdatePayload = GatewayGenericDispatchPayload<
  IGuildRoleUpdateFields,
  EventNameEnum.GuildRoleUpdate
>

interface IGuildRoleDeleteFields {
  /** Id of the guild */
  guildId: string
  /** Id of the role */
  roleId: string
}
type GuildRoleDeletePayload = GatewayGenericDispatchPayload<
  IGuildRoleDeleteFields,
  EventNameEnum.GuildRoleDelete
>

// Invites
interface IInviteCreateFields {
  /** The channel the invite is for */
  channelId: string
  /** The unique invite code */
  code: string
  /** The time at which the invite was created */
  createdAt: Date
  /** The guild of the invite */
  guildId?: string
  /** The user that created the invite */
  inviter?: IUser
  /** How long the invite is valid for (in seconds) */
  maxAge: number
  /** The maximum number of times the invite can be used */
  maxUses: number
  /** The target user for this invite */
  targetUser?: Partial<IUser>
  /** The type of user target for this invite */
  targetUserType?: TargetUserTypesEnum
  /** Whether or not the invite is temporary (invited users will be kicked on disconnect unless they're assigned a role) */
  temporary: boolean
  /** How many times the invite has been used (always will be 0) */
  uses: 0
}
type InviteCreatePayload = GatewayGenericDispatchPayload<
  IInviteCreateFields,
  EventNameEnum.InviteCreate
>

interface IInviteDeleteFields {
  /** The channel of the invite */
  channelId: string
  /** The guild of the invite */
  guildId?: string
  /** The unique invite code */
  code: IInvite
}
type InviteDeletePayload = GatewayGenericDispatchPayload<
  IInviteDeleteFields,
  EventNameEnum.InviteDelete
>

// Messages
type MessageCreatePayload = GatewayGenericDispatchPayload<IMessage, EventNameEnum.MessageCreate>
type MessageUpdatePayload = GatewayGenericDispatchPayload<IMessage, EventNameEnum.MessageUpdate>

interface IMessageDeleteFields {
  /** The id of the message */
  id: string
  /** The id of the channel */
  channelId: string
  /** The id of the guild */
  guildId?: string
}
type MessageDeletePayload = GatewayGenericDispatchPayload<
  IMessageDeleteFields,
  EventNameEnum.MessageDelete
>

interface IMessageDeleteBulkFields {
  /** The ids of the messages */
  ids: string[]
  /** The id of the channel */
  channelId: string
  /** The id of the guild */
  guildId?: string
}
type MessageDeleteBulkPayload = GatewayGenericDispatchPayload<
  IMessageDeleteBulkFields,
  EventNameEnum.MessageDeleteBulk
>

interface IMessageReactionAddFields {
  /** The id of the user */
  userId: string
  /** The id of the channel */
  channelId: string
  /** The id of the message */
  messageId: string
  /** The id of the guild */
  guildId?: string
  /** The member who reacted if this happened in a guild */
  member?: IGuildMember
  /** The emoji used to react - example */
  emoji: Partial<IEmoji>
}
type MessageReactionAddPayload = GatewayGenericDispatchPayload<
  IMessageReactionAddFields,
  EventNameEnum.MessageReactionAdd
>

interface IMessageReactionRemoveFields {
  /** The id of the user */
  userId: string
  /** The id of the channel */
  channelId: string
  /** The id of the message */
  messageId: string
  /** The id of the guild */
  guildId?: string
  /** The emoji used to react - example */
  emoji: Partial<IEmoji>
}
type MessageReactionRemovePayload = GatewayGenericDispatchPayload<
  IMessageReactionRemoveFields,
  EventNameEnum.MessageReactionRemove
>

interface IMessageReactionRemoveAllFields {
  /** The id of the channel */
  channelId: string
  /** The id of the message */
  messageId: string
  /** The id of the guild */
  guildId?: string
}
type MessageReactionRemoveAllPayload = GatewayGenericDispatchPayload<
  IMessageReactionRemoveAllFields,
  EventNameEnum.MessageReactionRemoveAll
>

interface IMessageReactionRemoveEmojiFields {
  /** The id of the channel */
  channelId: string
  /** The id of the guild */
  guildId?: string
  /** The id of the message */
  messageId: string
  /** The emoji that was removed */
  emoji: Partial<IEmoji>
}
type MessageReactionRemoveEmojiPayload = GatewayGenericDispatchPayload<
  IMessageReactionRemoveEmojiFields,
  EventNameEnum.MessageReactionRemoveEmoji
>

interface ITypingStartFields {
  /** Id of the channel */
  channelId: string
  /** Id of the guild */
  guildId?: string
  /** Id of the user */
  userId: string
  /** Unix time (in seconds) of when the user started typing */
  timestamp: number
  /** The member who started typing if this happened in a guild */
  member?: IGuildMember
}
type TypingStartPayload = GatewayGenericDispatchPayload<
  ITypingStartFields,
  EventNameEnum.TypingStart
>

type UserUpdatePayload = GatewayGenericDispatchPayload<IUser, EventNameEnum.UserUpdate>

// Voice

type VoiceStateUpdatePayload = GatewayGenericDispatchPayload<
  IVoiceState,
  EventNameEnum.VoiceStateUpdate
>

interface IVoiceServerUpdateFields {
  /** Voice connection token */
  token: string
  /** The guild this voice server update is for */
  guildId: string
  /** The voice server host */
  endpoint: string
}
type VoiceServerUpdatePayload = GatewayGenericDispatchPayload<
  IVoiceServerUpdateFields,
  EventNameEnum.VoiceServerUpdate
>

// Webhooks
interface IWebhooksUpdateFields {
  /** Id of the guild */
  guildId: string
  /** Id of the channel */
  channelId: string
}
type WebhookUpdatePayload = GatewayGenericDispatchPayload<
  IWebhooksUpdateFields,
  EventNameEnum.WebhooksUpdate
>
