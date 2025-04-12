import type { User } from './user'

export interface Market {
  address: string
  city: string
  created_at: string
  deleted_at: string
  delivery_max_time: number
  delivery_min_time: number
  delivery_price: number
  description: string
  email: string
  id: number
  is_active: boolean
  logo_url: string
  name: string
  owner?: User
  owner_id: number
  phone_number: string
  slug: string
  state: string
  updated_at: string
  zip_code?: string
}
