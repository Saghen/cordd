import { IUser } from "@saghen/discord";

export interface IPresenceUpdateFields {
  /** The user presence is being updated for */
  user: Partial<IUser>
  /** Id of the guild */
  guildId: string
  /** Either \"idle\", \"dnd\", \"online\", or \"offline\" */
  status: string
  /** User's current activities */
  activities: IActivity[]
  /** User's platform-dependent status */
  clientStatus: IClientStatus
}

export interface IClientStatus {
  /** The user's status set for an active desktop (Windows, Linux, Mac) application session */
  desktop?: string
  /** The user's status set for an active mobile (iOs, Android) application session */
  mobile?: string
  /** The user's status set for an active web (browser, bot account) application session */
  web?: string
}

export interface IActivity {
  /** The activity's name */
  name: string
  /** Activity type */
  type: ActivityTypeEnum
  /** Stream url, is validated when type is 1 */
  url?: string
  /** Unix timestamp of when the activity was added to the user's session */
  createdAt: number
  /** Unix timestamps for start and/or end of the game */
  timestamps?: IActivityTimestamps
  /** Application id for the game */
  applicationId?: string
  /** What the player is currently doing */
  details?: string
  /** The user's current party status */
  state?: string
  /** The emoji used for a custom status */
  emoji?: IActivityEmoji
  /** Information for the current party of the player */
  party?: IActivityParty
  /** Images for the presence and their hover texts */
  assets?: IActivityAssets
  /** Secrets for Rich Presence joining and spectating */
  secrets?: IActivitySecrets
  /** Whether or not the activity is an instanced game session */
  instance?: boolean
  /** Activity flags Ord together, describes what the payload includes */
  flags?: ActivityFlagEnum
}

export enum ActivityTypeEnum {
  /** Playing {name}. Ex: "Playing Rocket League" */
  Game = 0,
  /** Streaming {details}. Ex: "Streaming Rocket League" */
  Streaming = 1,
  /** Listening to {name}. Ex: "Listening to Spotify" */
  Listening = 2,
  /** {emoji} {name}. Ex: ":smiley: I am cool" */
  Custom = 4,
  /** Competing in {name}. Ex: "Competing in Arena World Champions" */
  Competing = 5,
}

export interface IActivityTimestamps {
  /** unix time (in milliseconds) of when the activity started */
  start?: number
  /** unix time (in milliseconds) of when the activity ends */
  end?: number
}

export interface IActivityEmoji {
  /** The name of the emoji */
  name: string
  /** The id of the emoji */
  id?: string
  /** Whether this emoji is animated */
  animated?: boolean
}

export interface IActivityParty {
  /** The id of the party */
  id?: string
  /** Used to show the party's current and maximum size */
  size?: [number, number]
}

export interface IActivityAssets {
  /** The id for a large asset of the activity, usually a snowflake */
  largeImage?: string
  /** Text displayed when hovering over the large image of the activity */
  largeText?: string
  /** The id for a small asset of the activity, usually a snowflake */
  smallImage?: string
  /** Text displayed when hovering over the small image of the activity */
  smallText?: string
}

export interface IActivitySecrets {
  /** The secret for joining a party */
  join?: string
  /** The secret for spectating a game */
  spectate?: string
  /** The secret for a specific instanced match */
  match?: string
}

export enum ActivityFlagEnum {
  Instance = 1 << 0,
  Join = 1 << 1,
  Spectate = 1 << 2,
  JoinRequest = 1 << 3,
  Sync = 1 << 4,
  Play = 1 << 5,
}
