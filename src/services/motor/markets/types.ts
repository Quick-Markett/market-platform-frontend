import type { Market } from '@/types/models/market'

export interface GetMarketByIdPayload {
  marketId: number
}

export interface GetMarketBySlugPayload {
  slug: string
}

export interface CreateMarketPayload {
  payload: Pick<
    Market,
    | 'address'
    | 'city'
    | 'description'
    | 'email'
    | 'logo_url'
    | 'name'
    | 'phone_number'
    | 'state'
    | 'zip_code'
    | 'owner_id'
    | 'slug'
  >
  token: string
}

export interface UpdateMarketPayload {
  payload: Pick<
    Market,
    | 'id'
    | 'address'
    | 'city'
    | 'description'
    | 'email'
    | 'logo_url'
    | 'phone_number'
    | 'state'
    | 'zip_code'
    | 'owner_id'
  >
  token: string
}

export interface DeleteMarketPayload extends GetMarketByIdPayload {
  token: string
}
