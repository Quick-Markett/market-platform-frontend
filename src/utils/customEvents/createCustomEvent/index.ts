import type { CreateCustomEventProps } from '@/types/events/createCustomEvent'
import type { CustomEvents } from '@/types/events/customEvents'

export const createCustomEvent = <EventName extends keyof CustomEvents>({
  eventName,
  handler
}: CreateCustomEventProps<EventName>) => {
  document.addEventListener(eventName, handler)
}
