import WebSocket from 'ws'
import { normalizeWSMessage } from './helpers'
import { EventNameEnum, OpCodeEnum } from './types/core'
import {
  GatewayDispatchPayload,
  GatewayPayload,
  GatewayInvalidSessionPayload,
  RawGatewayPayload,
  GatewayHelloPayload,
  GatewayHeartbeatPayload,
  GatewayReconnectPayload,
  GatewayHeartbeatAckPayload,
} from './types/gateway'
import { IWebsocketProvider } from './types/provider'

const version = 9

const getData = {
  op: 2,
  d: {
    token:
      'mfa.sEOzmT9jS02AndfcqG9iVm5SQOiuFy59b84Xhd2NKxyc44EkYnJ_FqLJC0dcL2nq-Y3q7kP1UIgDcfOqos_O',
    capabilities: 61,
    properties: {
      client_build_number: 79478,
    },
    compress: false,
    client_state: {
      guild_hashes: {},
      highest_last_message_id: '0',
      read_state_version: 0,
      user_guild_settings_version: -1,
    },
  },
}

interface IWSOptions {
  /** Bitwise OR'd intents from IntentEnum. https://discord.com/developers/docs/topics/gateway#gateway-intents */
  intents: number
  /** WS provider can be any function that returns an object that extends the IWebsocketProvider interface.
   * For the ws package and browser WebSocket, you'll want to create a wrapper
   */
  provider: (url: string) => IWebsocketProvider
  /**
   * Automatically
   */
  autoReconnect: boolean
}

function createMessageHandler({ opCodesListeners, dispatchListeners }) {
  let lastMessageNumber = 0

  return function handleWSMessage(data: string) {
    const message = normalizeWSMessage(JSON.parse(data))

    const opCodeListeners = this.opCodesListeners[message.op] ?? []
    for (const listener of opCodeListeners) Promise.resolve(listener(message))

    if (message.op === OpCodeEnum.Dispatch) {
      lastMessageNumber = Math.max(lastMessageNumber, message.sequenceNumber)
      const listeners = this.dispatchListeners[message.op] ?? []
      for (const listener of listeners) listener(message)
    }
  }
}

type OpCodeHandler<T extends OpCodeEnum> = (message: GatewayPayload & { op: T }) => any
type DispatchHandler<T extends EventNameEnum> = (
  message: GatewayDispatchPayload & { eventName: T }
) => any

export interface IWSClient {
  onOpCode<T extends OpCodeEnum>(opCode: T, handler: OpCodeHandler<T>): () => void
  onDispatch<T extends EventNameEnum>(event: T, handler: DispatchHandler<T>): () => void
}

export function createWS(options: IWSOptions): IWSClient {
  if (typeof options !== 'object' || !options) throw new Error('WS options must be an object')
  if (typeof options.intents !== 'number') throw new Error('Intents must be a number')
  if (typeof options.provider !== 'function')
    throw new Error(
      'The provider must be a function which returns an object which extends the IWebsocketProvider interface'
    )

  const ws = options.provider(`wss://gateway.discord.gg/?encoding=json&v=${version}`)

  const opCodesListeners: { [T in OpCodeEnum]?: OpCodeHandler<T>[] } = {}
  const dispatchListeners: { [T in EventNameEnum]?: DispatchHandler<T>[] } = {}

  const onOpCode: IWSClient['onOpCode'] = (opCode, handler) => {
    // @ts-ignore
    opCodesListeners[opCode] = [...(opCodesListeners[opCode] ?? []), handler]
    return () => {
      // @ts-ignore
      opCodesListeners[opCode] = opCodesListeners[opCode]?.filter((cb) => cb !== handler)
    }
  }

  onOpCode(OpCodeEnum.Dispatch, (message) => {
    dispatchListeners[message.data]
  })
  function onDispatch(opCode: OpCodeEnum, handler: (message: GatewayPayload) => any) {
    // @ts-ignore
    opCodesListeners[opCode] = [...(opCodesListeners[opCode] ?? []), handler]
    return () => {
      // @ts-ignore
      opCodesListeners[opCode] = opCodesListeners[opCode].filter((cb) => cb !== handler)
    }
  }

  ws.on('message', createMessageHandler({ opCodesListeners, dispatchListeners }))

  return { ws, onOpCode, onDispatch }
}

const yo = createWS()
yo.onOpCode(OpCodeEnum.Heartbeat, (message) => {
  message
})
yo.onDispatch(EventNameEnum.GuildBanAdd, (message) => {
  message
})

const ws = new WebSocket(`wss://gateway.discord.gg/?encoding=json&v=${version}`)
let lastMessageNum = 0
ws.addEventListener('message', (data) => {})
ws.on('message', (a) => ws.send(JSON.stringify(getData)))

// Heartbeat
setInterval(() => ws.send(JSON.stringify({ d: lastMessageNum, op: 1 })), 10000)
