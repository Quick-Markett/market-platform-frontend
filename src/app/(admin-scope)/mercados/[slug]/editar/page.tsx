import { NextPage } from 'next'
import { notFound } from 'next/navigation'

import { AdminContextProvider } from '@/contexts/AdminProvider'
import { instanceMotor } from '@/instances/instanceMotor'
import { getMetaData } from '@/utils/seo/getMetaData'

import { DynamicMarketPageProps } from '../../../../(user-scope)/mercados/[slug]/types'
import { AdminTabs } from './components/AdminTabs'
import { Menu } from './components/Menu'

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
    url: `/mercados/${slug}/editar`
  })
}

const Page: NextPage = async ({ params }: DynamicMarketPageProps) => {
  const { slug } = await params

  const { data: market } = await instanceMotor.markets.getMarketBySlug({
    slug
  })

  return (
    <AdminContextProvider market={market}>
      <main className="relative min-h-[70vh] bg-neutral-50 pb-12 pt-8 lg:pb-16">
        <Menu />
        <AdminTabs />
      </main>
    </AdminContextProvider>
  )
}

export default Page
