import type { Category } from '@/types/models/category'

export interface GetCategoryByIdPayload {
  categoryId: number
}

export interface GetMarketCategoriesPayload {
  marketId: number
}

export interface CreateCategoryPayload {
  payload: Pick<Category, 'description' | 'name' | 'slug' | 'market_id'>
}

export interface UpdateCategoryPayload extends GetCategoryByIdPayload {}

export interface DeleteCategoryPayload extends GetCategoryByIdPayload {}
