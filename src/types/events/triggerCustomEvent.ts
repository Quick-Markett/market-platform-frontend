import type { CommonCustomEventsProps } from './common'
import type { CustomEvents } from './customEvents'

export interface TriggerCustomEventProps<EventName extends keyof CustomEvents>
  extends CommonCustomEventsProps<EventName> {
  data: CustomEvents[EventName]
}
