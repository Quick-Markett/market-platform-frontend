import type { NextPage } from 'next'

import { WelcomeBar } from '@/components/common/WelcomeBar'
import { getMetaData } from '@/utils/seo/getMetaData'

import { MarketOptions } from './components/MarketOptions'
import { Offers } from './components/Offers'

export async function generateMetadata() {
  return getMetaData({
    title: '',
    description: '',
    image: '',
    url: '/mercados'
  })
}

const Page: NextPage = async () => {
  return (
    <>
      <WelcomeBar />
      <main>
        <Offers />
        <MarketOptions />
      </main>
    </>
  )
}

export default Page
