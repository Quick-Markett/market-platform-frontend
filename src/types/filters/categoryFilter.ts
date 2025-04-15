import type { Category } from '../models/category'

export type CategoryFilter = keyof Omit<Category, 'id'>

export type CategoryFilters = Partial<Record<CategoryFilter, string>>
