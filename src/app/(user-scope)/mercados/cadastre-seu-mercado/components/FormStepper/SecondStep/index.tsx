'use client'

import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { UploadButton } from '@/components/common/UploadButton'
import { Anchor } from '@/components/toolkit/Anchor'
import { Button } from '@/components/toolkit/Button'
import { InputField } from '@/components/toolkit/Fields/InputField'
import { PhoneNumber } from '@/components/toolkit/PhoneNumber'
import { useUserSession } from '@/hooks/useUserSession'
import { instanceMotor } from '@/instances/instanceMotor'
import { convertToSlug } from '@/utils/helpers/convertToSlug'
import { tryCatch } from '@/utils/helpers/tryCatch'
import { uploadImage } from '@/utils/helpers/uploadImage'
import { zodResolver } from '@hookform/resolvers/zod'

import { MediaIcon } from '../../icons/Media'
import { RegisterYourMarket } from '../../icons/RegisterYourMarket'
import { registerMarketSchema } from './schema'
import { AddressData, RegisterMarketFormInputs, SecondStepProps } from './types'

export const SecondStep: React.FC<SecondStepProps> = ({ setCurrentStep }) => {
  const [isUploadLoading, setIsUploadLoading] = useState<boolean>(false)
  const [logo, setLogo] = useState<string>('')
  const [addressData, setAddressData] = useState<AddressData | null>(null)

  const { user } = useUserSession()

  const formMethods = useForm<RegisterMarketFormInputs>({
    resolver: zodResolver(registerMarketSchema())
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValidating, isSubmitSuccessful, isSubmitting }
  } = formMethods

  const handleUploadImage = async (path: string) => {
    try {
      setIsUploadLoading(true)
      const imagePath = await uploadImage({ imagePath: path })
      setLogo(imagePath.url)
    } catch (uploadImageError) {
      console.error('ERROR! An error occurred while adding the image')
    } finally {
      setIsUploadLoading(false)
    }
  }

  const getMarketAddress = async (cep: string) => {
    const request = await tryCatch(
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
    )

    if (request.error) {
      console.error(request.error)
      toast.error(
        'Houve um erro ao encontrar as informações referentes ao endereço do estabelecimento'
      )
    }

    const requestData = await request.data.json()

    const newAddressData = {
      city: requestData.localidade,
      state: requestData.uf,
      street: `${requestData.bairro}, ${requestData.logradouro}`
    }

    setAddressData(newAddressData)

    setValue('state', newAddressData.state)
    setValue('city', newAddressData.city)
    setValue('address', newAddressData.street)
  }

  const onSubmit: SubmitHandler<RegisterMarketFormInputs> = async ({
    address,
    city,
    state,
    cep,
    email,
    marketName,
    marketDescription,
    phone_number
  }) => {
    try {
      await instanceMotor.markets.createMarket({
        payload: {
          owner_id: user.id,
          description: marketDescription,
          name: marketName,
          zip_code: cep,
          city,
          state,
          address,
          email,
          phone_number,
          logo_url: logo,
          slug: convertToSlug({ text: marketName })
        }
      })

      // TODO: Add new validation to handle with unique emails errors
      // @higor
    } catch (submitMarketRegisterFormErr) {
      console.error(submitMarketRegisterFormErr)
    }
  }

  // TODO: Update Address part, this is not the final version because we need to improve the address database handling
  return !isSubmitSuccessful ? (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <article className="flex w-full flex-col gap-2">
        <h2 className="text-left text-2xl font-semibold lg:text-3xl">
          Formulário de Registro de Mercado
        </h2>
        <p className="text-left text-sm text-neutral-500 lg:text-base">
          Estamos quase lá! só precisamos de mais algumas informações...
        </p>
      </article>
      <form id="register-market" onSubmit={handleSubmit(onSubmit)}>
        <section className="flex w-full flex-col gap-1">
          <InputField
            id="marketName"
            label="Nome do Mercado"
            maxLength={80}
            minLength={8}
            placeholder="Digite o nome do seu estabelecimento"
            spellCheck={false}
            autoFocus
            {...register('marketName')}
            variant="secondary"
          />
          <InputField
            id="marketDescription"
            label="Fale um pouco mais sobre o seu Mercado"
            maxLength={1200}
            minLength={4}
            placeholder="Digite uma descrição para seu estabelecimento"
            spellCheck={false}
            {...register('marketDescription')}
            variant="secondary"
          />
          <InputField
            className="mb-2"
            id="email"
            label="Email de Contato"
            maxLength={60}
            minLength={8}
            placeholder="Digite um email de contato para seus clientes"
            spellCheck={false}
            {...register('email')}
            variant="secondary"
          />
          <PhoneNumber
            formMethods={formMethods}
            id="phone_number"
            label="Telefone de contato"
            maxLength={14}
            minLength={8}
            name="phone_number"
            placeholder="Digite um telefone de contato para seus clientes"
            spellCheck={false}
            {...register('phone_number')}
            variant="secondary"
          />
          <article className="mb-4 mt-8 flex flex-col items-center gap-4">
            <MediaIcon />
            <p className="text-center text-sm lg:text-base">
              Insira a logo do seu mercado
            </p>
            <UploadButton
              uploadImageAction={async (path: string) =>
                await handleUploadImage(path)
              }
              isLoading={isUploadLoading}
              setImagePath={setLogo}
            >
              Escolher imagem do computador
            </UploadButton>
          </article>

          {/* TODO: Add feedback to show the user when the image has been loaded
          (perhaps displaying it beside the input) */}

          <InputField
            {...register('cep', {
              onChange: e => {
                toast.info(e.target.value.length)
                if (e.target.value.length === 8) {
                  getMarketAddress(e.target.value)
                }
              }
            })}
            id="cep"
            label="CEP"
            maxLength={8}
            minLength={8}
            placeholder="Digite aqui o CEP do seu estabelecimento"
            spellCheck={false}
            type="number"
            variant="secondary"
          />
          <div className="flex w-full flex-col gap-2 lg:flex-row lg:justify-between lg:gap-8">
            <div className="w-full">
              <InputField
                className="min-w-full"
                disabled={!addressData}
                id="state"
                label="Estado (UF)"
                maxLength={40}
                minLength={8}
                placeholder="Informe o CEP para preencher esse campo"
                spellCheck={false}
                {...register('state')}
                variant="secondary"
              />
            </div>
            <div className="w-full">
              <InputField
                className="min-w-full"
                disabled={!addressData}
                id="city"
                label="Cidade"
                maxLength={40}
                minLength={8}
                placeholder="Informe o CEP para preencher esse campo"
                spellCheck={false}
                {...register('city')}
                variant="secondary"
              />
            </div>
          </div>
          <InputField
            className="min-w-full"
            disabled={!addressData}
            id="street"
            label="Rua"
            maxLength={40}
            minLength={8}
            placeholder="Informe o CEP para preencher esse campo"
            spellCheck={false}
            {...register('address')}
            variant="secondary"
          />
          <Button
            className="mt-8 min-w-full md:text-sm"
            isLoading={isSubmitting || isValidating}
            type="submit"
            variant="primary"
          >
            Cadastrar
          </Button>
        </section>
      </form>
    </div>
  ) : (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <figure className="mx-auto flex w-full max-w-md items-center justify-center">
        <RegisterYourMarket />
      </figure>
      <article className="flex w-full flex-col items-center gap-2">
        <h2 className="text-center text-2xl font-semibold lg:text-3xl">
          Prontinho! Seu mercado foi adicionado
        </h2>
        <p className="text-center text-sm text-neutral-500 lg:text-base">
          Seu mercado foi adicionado com sucesso! Agora, você pode
          personalizá-lo do seu jeito. Edite as informações, adicione produtos,
          configure detalhes e comece <br className="hideden lg:block" /> a
          oferecer a melhor experiência para seus clientes. Tudo pronto para
          você gerenciar seu mercado com facilidade!
        </p>
        <div className="mx-auto mt-8 flex w-full items-center justify-center gap-8">
          <Button onClick={() => setCurrentStep(2)}>
            Quero ver como ele ficou
          </Button>
          <Anchor href="/mercados" variant="primaryOutline">
            Voltar à home
          </Anchor>
        </div>
      </article>
    </div>
  )
}
