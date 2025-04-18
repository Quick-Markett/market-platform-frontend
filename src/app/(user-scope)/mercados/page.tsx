import type { NextPage } from 'next'

import { WelcomeBar } from '@/components/common/WelcomeBar'
import { getMetaData } from '@/utils/seo/getMetaData'

import { MarketOptions } from './components/MarketOptions'
import { Offers } from './components/Offers'
import { getUserSession } from '@/utils/auth/getUserSession'

export async function generateMetadata() {
  return getMetaData({
    title: '',
    description: '',
    image: '',
    url: '/mercados'
  })
}

const Page: NextPage = async () => {
  const user = await getUserSession()

  return (
    <>
      <WelcomeBar />
      <main>
        <p>teste: {JSON.stringify(user)}</p>
        <Offers />
        <MarketOptions />
      </main>
    </>
  )
}

export default Page
