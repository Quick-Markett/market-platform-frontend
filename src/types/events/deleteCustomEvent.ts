import type { CommonCustomEventsProps, CustomEventHandler } from './common'
import type { CustomEvents } from './customEvents'

export interface DeleteCustomEventProps<EventName extends keyof CustomEvents>
  extends CommonCustomEventsProps<EventName> {
  handler: CustomEventHandler
}
