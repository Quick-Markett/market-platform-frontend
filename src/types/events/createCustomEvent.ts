import type { CommonCustomEventsProps, CustomEventHandler } from './common'
import type { CustomEvents } from './customEvents'

export interface CreateCustomEventProps<EventName extends keyof CustomEvents>
  extends CommonCustomEventsProps<EventName> {
  handler: CustomEventHandler
}
