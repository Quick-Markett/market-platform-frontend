'use client'

import { useState } from 'react'

import { FavouriteFill } from '@/assets/common/FavouriteFill'
import { FavouriteOutline } from '@/assets/common/FavouriteOutline'
import { Button } from '@/components/toolkit/Button'
import { handleOpenAuthModal } from '@/utils/customEvents/@handlers/authModal/handleOpenAuthModal'

import type { FavouriteMarketProps } from './types'

export const FavouriteMarket: React.FC<FavouriteMarketProps> = ({
  isUserLoggedIn
}) => {
  const [isMarketFavourite, setIsMarketFavourite] = useState<boolean>(false)

  return (
    <div className="flex w-full items-center justify-end gap-4">
      {isMarketFavourite ? (
        <Button
          onClick={() =>
            isUserLoggedIn ? setIsMarketFavourite(false) : handleOpenAuthModal()
          }
          className="animate__animated animate__fadeIn animate__fast w-auto"
          variant="custom"
        >
          <FavouriteFill className="fill-slate-700 text-slate-700" />
        </Button>
      ) : (
        <Button
          onClick={() =>
            isUserLoggedIn ? setIsMarketFavourite(true) : handleOpenAuthModal()
          }
          className="animate__animated animate__fadeIn animate__fast w-auto"
          variant="custom"
        >
          <FavouriteOutline />
        </Button>
      )}
    </div>
  )
}
