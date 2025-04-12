import type { NextPage } from 'next'
import { notFound } from 'next/navigation'

import type { DynamicMarketPageProps } from '@/app/(user-scope)/mercados/[slug]/types'
import { instanceMotor } from '@/instances/instanceMotor'
import { getMetaData } from '@/utils/seo/getMetaData'

import { EditMarket } from './components/EditMarket'

export async function generateMetadata({ params }) {
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
    url: `/mercados/${slug}/admin/editar-informacoes`
  })
}

const Page: NextPage<DynamicMarketPageProps> = async ({ params }) => {
  return <EditMarket />
}

export default Page
