import type { NextPage } from 'next'
import { notFound } from 'next/navigation'

import { WelcomeBar } from '@/components/common/WelcomeBar'
import { instanceMotor } from '@/instances/instanceMotor'
import { getMetaData } from '@/utils/seo/getMetaData'

import { Header } from './components/Header'
import type { DynamicMarketPageProps } from './types'

export async function generateMetadata({ params }: DynamicMarketPageProps) {
  const { slug } = await params

  const { data: market } = await instanceMotor.markets.getMarketBySlug({
    slug
  })

  if (!market) {
    notFound()
  }

  return getMetaData({
    title: market.name,
    description: market.description,
    image: market.logo_url,
    url: `/mercados/${slug}`
  })
}

// export async function generateStaticParams() {
//   const { data: markets } = await instanceMotor.markets.getAllMarkets()

//   return markets.map(({ slug }) => ({
//     slug
//   }))
// }

const Page: NextPage = async ({ params }: DynamicMarketPageProps) => {
  const { slug } = await params

  const { data: market } = await instanceMotor.markets.getMarketBySlug({
    slug
  })

  return (
    <>
      <WelcomeBar />
      <main>
        <Header market={market} />
      </main>
    </>
  )
}

export default Page
