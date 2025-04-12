import { Anchor } from '@/components/toolkit/Anchor'
import { formatCurrency } from '@/utils/getters/getFormattedCurrency'

import type { OfferCardProps } from './types'

export const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
  return (
    <div className="flex h-full flex-col gap-4 rounded-sm border border-neutral-200 p-2">
      <figure className="min-h-32 w-full bg-neutral-200" />
      <article className="flex h-full flex-col gap-2">
        <div>
          <p className="text-base font-semibold lg:text-lg">
            {offer.productName}
          </p>
          <p className="text-sm">{offer.marketName}</p>
        </div>
        <div className="flex w-full gap-4 lg:justify-between">
          <p className="text-neutral-500 line-through">
            {formatCurrency(offer.oldPrice)}
          </p>
          <span className="bg-gradient-to-r from-amber-800 to-amber-600 bg-clip-text text-base font-medium text-transparent lg:text-xl">
            {formatCurrency(offer.newestPrice)}
          </span>
        </div>
        <div className="flex h-full w-full items-end">
          <Anchor
            className="mt-4 min-w-full md:text-sm"
            href="#"
            variant="primaryOutline"
          >
            Quero comprar
          </Anchor>
        </div>
      </article>
    </div>
  )
}
