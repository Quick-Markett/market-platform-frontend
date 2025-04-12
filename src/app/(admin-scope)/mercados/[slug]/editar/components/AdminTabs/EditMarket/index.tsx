'use client'

import { useEffect, useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'

import { MediaIcon } from '@/app/(user-scope)/mercados/cadastre-seu-mercado/components/icons/Media'
import { UploadButton } from '@/components/common/UploadButton'
import { Button } from '@/components/toolkit/Button'
import { InputField } from '@/components/toolkit/Fields/InputField'
import { SelectField } from '@/components/toolkit/Fields/SelectField'
import { PhoneNumber } from '@/components/toolkit/PhoneNumber'
import { BRAZILIAN_CITIES } from '@/constants/common/brazilian-cities'
import { BRAZILIAN_STATES } from '@/constants/common/brazilian.states'
import { useAdminContext } from '@/contexts/AdminProvider'
import { useUserSession } from '@/hooks/useUserSession'
import { instanceMotor } from '@/instances/instanceMotor'
import { formatCityName } from '@/utils/helpers/formatCityName'
import { tryCatch } from '@/utils/helpers/tryCatch'
import { uploadImage } from '@/utils/helpers/uploadImage'
import { zodResolver } from '@hookform/resolvers/zod'

import { updateMarketSchema } from './schema'
import type { RegisterMarketFormInputs } from './types'

export const EditMarket: React.FC = () => {
  const { marketData } = useAdminContext()

  const [isUploadLoading, setIsUploadLoading] = useState<boolean>(false)
  const [logo, setLogo] = useState<string>('')
  const [cities, setCities] = useState<{ label: string; value: string }[]>([])

  const { user } = useUserSession()

  const formMethods = useForm<RegisterMarketFormInputs>({
    resolver: zodResolver(updateMarketSchema()),
    defaultValues: {
      state: marketData.state
    }
  })

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { isValidating, isSubmitting }
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
    marketDescription,
    phone_number
  }) => {
    try {
      await instanceMotor.markets.updateMarket({
        marketId: marketData.id,
        payload: {
          owner_id: user.id,
          description: marketDescription,
          zip_code: cep,
          city,
          state,
          address,
          email,
          phone_number,
          logo_url: logo
        }
      })
    } catch (submitMarketRegisterFormErr) {
      console.error(submitMarketRegisterFormErr)
    }
  }

  const selectedUF = useWatch({
    control,
    name: 'state'
  })

  useEffect(() => {
    const estadoSelecionado = BRAZILIAN_CITIES.estados.find(
      estado => estado.sigla.toLowerCase() === selectedUF?.toLowerCase()
    )

    const formattedCities = estadoSelecionado
      ? estadoSelecionado.cidades.map(city => ({
          label: city,
          value: formatCityName(city)
        }))
      : []

    setCities(formattedCities)
  }, [selectedUF])

  return (
    <div className="flex w-full flex-col gap-6">
      <h2 className="text-xl font-medium lg:text-2xl">
        Editar Informações do Mercado
      </h2>
      <div className="flex flex-col gap-3 rounded-md border border-neutral-200 bg-white p-8">
        <form id="register-market" onSubmit={handleSubmit(onSubmit)}>
          <section className="flex w-full flex-col gap-1">
            <InputField
              defaultValue={marketData.name}
              id="marketName"
              label="Nome do Mercado"
              maxLength={80}
              minLength={8}
              placeholder="Digite o nome do seu estabelecimento"
              spellCheck={false}
              variant="secondary"
              autoFocus
              disabled
            />
            <InputField
              defaultValue={marketData.description}
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
              defaultValue={marketData.email}
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
              defaultValue={marketData.phone_number}
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
            <InputField
              defaultValue={marketData.zip_code}
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
                <SelectField
                  className="min-w-full"
                  defaultValue={marketData.city}
                  id="city"
                  label="Cidade"
                  maxLength={40}
                  minLength={8}
                  name="city"
                  options={cities}
                  placeholder={marketData.city}
                  spellCheck={false}
                  {...register('city')}
                  variant="secondary"
                />
              </div>
              <div className="w-full">
                <SelectField
                  className="min-w-full"
                  defaultValue={marketData.state.toLowerCase()}
                  id="state"
                  label="Estado (UF)"
                  maxLength={40}
                  minLength={8}
                  name="state"
                  options={BRAZILIAN_STATES}
                  placeholder={marketData.state}
                  spellCheck={false}
                  {...register('state')}
                  variant="secondary"
                />
              </div>
            </div>
            <InputField
              className="min-w-full"
              defaultValue={marketData.address}
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
    </div>
  )
}
