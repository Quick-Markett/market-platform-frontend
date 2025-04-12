import type { NextPage } from 'next'

import { WelcomeBar } from '@/components/common/WelcomeBar'
import { getMetaData } from '@/utils/seo/getMetaData'

import { FormStepper } from './components/FormStepper'

export async function generateMetadata() {
  return getMetaData({
    title: 'Crie e gerencie seu mercado | [Nome da Plataforma]',
    description:
      'Cadastre seu mercado na nossa plataforma e comece a adicionar produtos, gerenciar pedidos e alcançar mais clientes de forma simples e eficiente.',
    image: '',
    url: '/mercados/cadastre-seu-mercado'
  })
}

const Page: NextPage = async () => {
  return (
    <>
      <WelcomeBar />
      <main className="min-h-[62vh]">
        <FormStepper />
      </main>
    </>
  )
}

export default Page
