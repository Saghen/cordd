import { EventNameEnum, OpCodeEnum } from './types/core'
import { GatewayPayload, RawGatewayPayload } from './types/gateway'

export function normalizeWSMessage(message: RawGatewayPayload): GatewayPayload {
  const normalizedMessage: Record<string, any> = {
    op: message.op,
    data: message.d,
  }

  if (message.s) normalizedMessage.sequenceNumber = message.s
  if (message.t) normalizedMessage.eventName = message.t

  return normalizedMessage as GatewayPayload
}
