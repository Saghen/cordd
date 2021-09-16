import createApi from "@cordd/api"
import createWS, { IntentEnum, OpCodeEnum, GatewayEventEnum } from "@cordd/ws"
import createCache from "@cordd/cache"

// This cache provider can be a json file, an in memory cache or as advanced as a mongo db
// It just needs to implement the interface required by the cache lib
const cache = createCache(cacheProvider)

// Fetch is the function used for fetching data
// It's bound to each CRUD function (ex: getGuild) and can be combined with the cache to cache requests/responses
const { getGuild, updateChannel, ...etc } = createApi({
  fetch: (...args) => {
    if (/* in the cache */ false) return /* The cached value */
    // Otherwise fetch. You could theoretically do anything here though as long as it returns a promise
    return fetch(...args).then(cache.createUpdater(...args))
  },
})

// Unlike Discord.js all these ops are composable
const guild = await getGuild("some-guild-id")
guild.andWellTyped

const channel = await updateChannel("some-channel-id", { some: "values", with: "intellisense ofc" })

// Use websockets for updating the cache and getting events
// Docs explain reasoning behind bitwise ops but the intellisense talks about it too
const ws = createWS({ intents: IntentEnum.Guilds | IntentEnum.GuildMembers | etc })

ws.onOpCode(OpCodeEnum.Hello, (e) => {
  /* Handle Hello opcode */
})
ws.onEvent(GatewayEventEnum.ChannelCreate, (e) => {
  /* You likely want to update the cache here so you don't desync */
})

const NotificationsStore = new Store({ notifications: [] })
