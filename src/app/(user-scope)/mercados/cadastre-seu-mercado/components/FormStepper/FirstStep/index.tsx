import { Button } from '@/components/toolkit/Button'

import { RegisterYourMarket } from '../../icons/RegisterYourMarket'
import type { FirstStepProps } from './types'

export const FirstStep: React.FC<FirstStepProps> = ({ setCurrentStep }) => {
  return (
    <div className="flex w-full flex-col gap-4 lg:gap-8">
      <figure className="mx-auto flex w-full max-w-md items-center justify-center">
        <RegisterYourMarket />
      </figure>
      <article className="flex w-full flex-col items-center gap-2">
        <h2 className="text-center text-2xl font-semibold lg:text-3xl">
          Registre seu mercado
        </h2>
        <p className="text-center text-sm text-neutral-500 lg:text-base">
          Preencha um formulário com algumas informações básicas sobre o seu
          supermercado que em poucos instantes traremos{' '}
          <br className="hideden lg:block" /> uma interface e uma experiência
          única para você!
        </p>
        <Button className="mt-8" onClick={() => setCurrentStep(2)}>
          Bora lá
        </Button>
      </article>
    </div>
  )
}
