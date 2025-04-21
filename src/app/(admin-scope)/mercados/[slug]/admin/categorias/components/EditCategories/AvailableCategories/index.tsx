'use client'

import { PencilEdit } from '@/assets/common/PencilEdit'
import { TrashCan } from '@/assets/common/TrashCan'
import { handleOpenEditCategoryModal } from '@/utils/customEvents/@handlers/categories/handleOpenEditCategoryModal'
import { handleOpenRemoveCategoryModal } from '@/utils/customEvents/@handlers/categories/handleOpenRemoveCategoryModal'

import { CategoryItem } from '../icons/CategoryItem'
import type { AvailableCategoriesProps } from './types'

export const AvailableCategories: React.FC<AvailableCategoriesProps> = ({
  categories
}) => {
  return (
    <div className="3xl:grid-cols-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8 2xl:grid-cols-5">
      {categories.map((category, index: number) => (
        <div
          className="flex w-full items-center gap-3 rounded-md border border-l border-neutral-200 bg-white px-4 py-3.5 transition-all duration-300 hover:bg-[#fdfdfd] xl:px-5"
          key={`${category.name}-${index}`}
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
          <div className="flex w-auto items-center gap-3 xl:gap-4">
            <button
              aria-label="Edit Product"
              onClick={() => handleOpenEditCategoryModal({ category })}
            >
              <PencilEdit className="h-4 w-4 text-[#413e41] transition-all duration-default hover:text-yellow-700 xl:h-5 xl:w-5" />
            </button>
            <button
              aria-label="Remove Product"
              onClick={() => handleOpenRemoveCategoryModal({ category })}
            >
              <TrashCan className="h-4 w-4 text-[#413e41] transition-all duration-default hover:text-yellow-700 xl:h-5 xl:w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
