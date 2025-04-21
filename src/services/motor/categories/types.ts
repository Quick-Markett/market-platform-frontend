import type { Category } from '@/types/models/category'

export interface GetCategoryByIdPayload {
  category_id: number
  token: string
}

export interface GetMarketCategoriesPayload {
  slug: string
}

export interface CreateCategoryPayload {
  payload: Pick<Category, 'description' | 'name' | 'slug' | 'market_id'>
  token: string
}

export interface UpdateCategoryPayload {
  payload: Pick<Category, 'description' | 'name' | 'id'>
  token: string
}

export interface DeleteCategoryPayload extends GetCategoryByIdPayload {}
