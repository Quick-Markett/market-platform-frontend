'use client'

import { Button } from '@/components/toolkit/Button'

import { CategoryItem } from '../icons/CategoryItem'
import type { AvailableCategoriesProps } from './types'

export const AvailableCategories: React.FC<AvailableCategoriesProps> = ({
  categories
}) => {
  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {categories.map((category, index: number) => (
        <Button
          className="flex w-full max-w-[320px] items-center gap-4 rounded-sm border-l border-yellow-100 px-3 py-1 transition-all duration-300 hover:border-yellow-300"
          key={`${category.name}-${index}`}
          variant="custom"
        >
          <figure className="flex items-center justify-center rounded-xl bg-yellow-50 p-2.5">
            <CategoryItem className="h-6 w-6 text-neutral-700" />
          </figure>
          <article className="flex w-full flex-1 flex-col items-start">
            <p className="text-base font-medium">{category.name}</p>
            <p className="text-sm text-neutral-500">{category.description}</p>
          </article>
        </Button>
      ))}
    </div>
  )
}
