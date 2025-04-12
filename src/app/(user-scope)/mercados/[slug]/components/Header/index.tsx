import Image from 'next/image'

import { Container } from '@/components/toolkit/Container'
import { getUserSession } from '@/utils/auth/getUserSession'

import { FavouriteMarket } from './FavouriteMarket'
import { MarketActions } from './MarketActions'
import type { HeaderProps } from './types'

export const Header: React.FC<HeaderProps> = async ({ market }) => {
  const { user } = await getUserSession()

  return (
    <Container
      as="section"
      className="flex w-full flex-col gap-4 lg:gap-8"
      data-cid="market-data"
      wrapperClassName="bg-white py-12 lg:py-20"
    >
      <figure className="max-h-[220px] w-full rounded-sm">
        <Image
          alt={`${market.name} Background Image`}
          className="max-h-[220px] w-full rounded-sm object-cover"
          height={1080}
          src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3VwZXJtYXJrZXR8ZW58MHx8MHx8fDA%3D"
          width={1920}
        />
      </figure>
      <div className="flex w-full flex-col gap-4 lg:flex-row lg:justify-between lg:gap-6">
        <div className="flex w-full items-center gap-4">
          <figure className="h-20 w-20 rounded-sm">
            <Image
              alt="Market Logo"
              className="h-20 w-20 rounded-sm"
              height={120}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/The_Fresh_Market_logo.svg/1200px-The_Fresh_Market_logo.svg.png"
              width={120}
            />
          </figure>
          <article className="flex w-full flex-col gap-1">
            <h1 className="text-2xl font-semibold lg:text-3xl">
              {market.name}
            </h1>
            <p className="text-sm text-neutral-500">
              {market.address}, {market.city} - {market.state}
            </p>
          </article>
        </div>
        {user?.id === market.owner?.id ? (
          <MarketActions market={market} />
        ) : (
          <FavouriteMarket isUserLoggedIn={!!user} />
        )}
      </div>
    </Container>
  )
}
