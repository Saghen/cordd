export type Event = 'open' | 'close' | 'error' | 'message'
export type Callback = (err?: Error) => void

type EventListenerHandler =
  & ((event: 'open', handler: () => void) => void)
  & ((event: 'close', handler: (code?: number, reason?: string) => void) => void)
  & ((event: 'error', handler: (err: Error) => void) => void)
  & ((event: 'message', handler: (data: string) => void) => void)

export interface IWebsocketProvider {
  on: EventListenerHandler
  off: EventListenerHandler
  send: (data: any) => void
  close: (code?: number, reason?: string) => void
}
