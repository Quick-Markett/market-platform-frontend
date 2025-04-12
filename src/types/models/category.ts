import type { Market } from './market'

export interface Category {
  created_at: string
  description: string
  id: number
  market?: Market
  market_id: number
  name: string
  slug: string
  updated_at: string
}
