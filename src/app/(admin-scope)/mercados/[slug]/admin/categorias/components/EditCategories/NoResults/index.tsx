'use client'

import { WebDesignXmarkPapertray } from '@/assets/common/WebDesignXmarkPapertray'
import { Button } from '@/components/toolkit/Button'
import { handleOpenCreateCategoryModal } from '@/utils/customEvents/@handlers/categories/handleOpenCreateCategoryModal'

export const NoResults: React.FC = () => {
  return (
    <div className="flex flex-col gap-3 rounded-md border border-neutral-200 bg-white p-8">
      <div className="my-8 flex w-full flex-col items-center justify-center gap-4 text-center">
        <WebDesignXmarkPapertray className="w-8 text-neutral-500" />
        <p className="text-sm lg:text-base">
          Ops... parece que você ainda não tem nenhuma categoria criada!
        </p>
        <Button
          className="mt-4 md:text-sm"
          onClick={() => handleOpenCreateCategoryModal()}
          variant="primaryOutline"
        >
          Quero criar uma
        </Button>
      </div>
    </div>
  )
}
