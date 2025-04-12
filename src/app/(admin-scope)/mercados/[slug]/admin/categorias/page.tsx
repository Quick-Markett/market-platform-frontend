import type { NextPage } from 'next'
import { notFound } from 'next/navigation'

import { instanceMotor } from '@/instances/instanceMotor'
import { getMetaData } from '@/utils/seo/getMetaData'

import { EditCategories } from './components/EditCategories'

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
    url: `/mercados/${slug}/admin/categorias`
  })
}

const Page: NextPage = async () => {
  return <EditCategories />
}

export default Page
