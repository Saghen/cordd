export type Event = 'open' | 'close' | 'error' | 'message'
export type Handler = (data: IWSMessage) => void
export type Callback = (err?: Error) => void

export interface IWSMessage {
  data: any
  type: string
}

export interface IWebsocketClient {
  on(event: Event, handler: Handler): any

  off(event: Event, handler: Handler): any

  send(data: any): any

  close(code?: number, data?: string): any
}
