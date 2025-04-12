import { Anchor } from '@/components/toolkit/Anchor'
import { formatCurrency } from '@/utils/getters/getFormattedCurrency'

import type { MarketCardProps } from './types'

export const MarketCard: React.FC<MarketCardProps> = ({ market }) => {
  return (
    <Anchor
      className="flex w-full cursor-pointer items-center gap-3 rounded-sm border border-neutral-100 p-2 transition-all duration-300 hover:bg-neutral-50"
      href={`/mercados/${market.slug}`}
      variant="custom"
    >
      <figure className="h-12 w-12 rounded-sm bg-neutral-200 lg:h-20 lg:w-20" />
      <article className="w-full flex-1">
        <p className="text-base font-medium">{market.name}</p>
        <p className="mt-2 text-xs lg:text-sm lg:text-neutral-600">
          Está à 1km de você
        </p>
        <div className="mt-0.5 flex items-center gap-1">
          <p className="text-xs lg:text-sm lg:text-neutral-500">
            {market.delivery_min_time || 0}min-
            {market.delivery_max_time || 0}
            min
          </p>
          <span className="text-xs text-neutral-500 lg:text-sm"> • </span>
          {market.delivery_price === 0 ? (
            <p className="text-sm text-amber-700">Grátis</p>
          ) : (
            <p className="text-xs text-neutral-500 lg:text-sm">
              {formatCurrency(Number(market.delivery_price))}
            </p>
          )}
        </div>
      </article>
    </Anchor>
  )
}
