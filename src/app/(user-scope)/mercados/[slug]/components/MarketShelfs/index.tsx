import { Container } from '@/components/toolkit/Container'
import { instanceMotor } from '@/instances/instanceMotor'

import { MarketShelf } from './MarketShelf'
import type { MarketShelfsProps } from './types'

export const MarketShelfs: React.FC<MarketShelfsProps> = async ({ slug }) => {
  const { data: mappedProducts } =
    await instanceMotor.products.getMarketMappedProducts({
      slug
    })

  const hasResults = mappedProducts?.length > 0

  return (
    <Container
      as="section"
      className="flex w-full flex-col gap-4 lg:gap-8"
      data-cid="market-shelfs"
      wrapperClassName="bg-white pb-12 lg:pb-20"
    >
      {hasResults ? (
        <div className="flex w-full flex-col gap-8 lg:gap-12">
          {mappedProducts.map((shelf, index: number) => (
            <MarketShelf key={`${shelf.category}-${index}`} shelf={shelf} />
          ))}
        </div>
      ) : (
        <p>Sem resultados</p>
      )}
    </Container>
  )
}
