import type { Product } from '@/types/models/product'

export interface MarketShelfProps {
  shelf: {
    category: string
    products: Pick<
      Product,
      | 'id'
      | 'product_name'
      | 'slug'
      | 'unit_price'
      | 'product_image'
      | 'product_description'
    >[]
  }
}
