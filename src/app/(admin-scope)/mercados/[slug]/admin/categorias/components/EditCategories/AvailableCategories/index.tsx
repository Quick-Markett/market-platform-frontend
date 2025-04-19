'use client'

import { Button } from '@/components/toolkit/Button'
import { handleOpenEditCategoryModal } from '@/utils/customEvents/@handlers/categories/handleOpenEditCategoryModal'

import { CategoryItem } from '../icons/CategoryItem'
import type { AvailableCategoriesProps } from './types'

export const AvailableCategories: React.FC<AvailableCategoriesProps> = ({
  categories
}) => {
  return (
    <div className="3xl:grid-cols-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {categories.map((category, index: number) => (
        <Button
          className="flex w-full items-center gap-3 rounded-md border border-l border-neutral-200 bg-white px-5 py-3.5 transition-all duration-300 hover:bg-[#fdfdfd]"
          key={`${category.name}-${index}`}
          onClick={() => handleOpenEditCategoryModal({ category })}
          variant="custom"
        >
          <figure className="flex items-center justify-center rounded-xl bg-yellow-50 p-2.5">
            <CategoryItem className="h-6 w-6 text-neutral-700" />
          </figure>
          <article className="flex w-full flex-1 flex-col items-start">
            <p className="line-clamp-1 text-left text-base font-medium">
              {category.name}
            </p>
            <p className="line-clamp-1 text-left text-sm text-neutral-500">
              {category.description}
            </p>
          </article>
        </Button>
      ))}
    </div>
  )
}
