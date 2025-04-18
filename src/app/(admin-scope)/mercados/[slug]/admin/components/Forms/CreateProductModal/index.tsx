'use client'

import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { Controller, useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { toast } from 'react-toastify'

import { MediaIcon } from '@/app/(user-scope)/mercados/cadastre-seu-mercado/components/icons/Media'
import { UploadButton } from '@/components/common/UploadButton'
import { Button } from '@/components/toolkit/Button'
import { InputField } from '@/components/toolkit/Fields/InputField'
import { SelectField } from '@/components/toolkit/Fields/SelectField'
import { Modal } from '@/components/toolkit/Modal'
import { useAdminContext } from '@/contexts/AdminProvider'
import { useGetAllCategories } from '@/hooks/swr/useGetAllCategories'
import { useEventListener } from '@/hooks/useEventListener'
import { useUserSession } from '@/hooks/useUserSession'
import { convertToSlug } from '@/utils/helpers/convertToSlug'
import { uploadImage } from '@/utils/helpers/uploadImage'
import { zodResolver } from '@hookform/resolvers/zod'

import { createProductSchema } from './schema'
import type { CreateProductFormData, CreateProductFormInputs } from './types'

export const CreateProductModal: React.FC = () => {
  const { user } = useUserSession()
  const { marketData } = useAdminContext()

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [productImage, setProductImage] = useState<string>('')
  const [isUploadLoading, setIsUploadLoading] = useState<boolean>(false)

  const { allCategories, isLoading } = useGetAllCategories({
    payload: user.token
  })

  const hasCategories = !isLoading && allCategories?.length > 0

  const formMethods = useForm<CreateProductFormInputs>({
    resolver: zodResolver(createProductSchema())
  })

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { isValidating, isSubmitting }
  } = formMethods

  const onSubmit: SubmitHandler<CreateProductFormData> = async ({
    description,
    name,
    quantity,
    price
  }) => {
    try {
      const slug = convertToSlug({ text: name })

      const { status } = await axios.post('/api/products/create-product', {
        token: user.token,
        payload: {
          market_id: marketData.id,
          product_name: name,
          product_description: description,
          slug,
          stock: quantity,
          product_image: productImage,
          unit_price: price
        }
      })

      setValue('description', '')
      setValue('name', '')
      setValue('price', 1)
      setValue('quantity', 0)

      if (status !== 201) {
        toast.error('Ops.. houve um erro ao adicionar o produto!')
        return
      }

      toast.success('Produto adicionado com sucesso!')
      setIsModalOpen(false)
    } catch (submitCreateMarketFormErr) {
      console.error(submitCreateMarketFormErr)
    }
  }

  const handleUploadImage = async (path: string) => {
    try {
      setIsUploadLoading(true)
      const imagePath = await uploadImage({ imagePath: path })
      setProductImage(imagePath.url)
    } catch (uploadImageError) {
      console.error('ERROR! An error occurred while adding the image')
    } finally {
      setIsUploadLoading(false)
    }
  }

  useEventListener('create-product', ({ action }) => {
    switch (action) {
      case 'open': {
        setIsModalOpen(true)
        break
      }
      case 'close': {
        setIsModalOpen(false)
        break
      }
    }
  })

  return (
    <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 rounded-md bg-white px-8 py-16 pb-12">
        <article className="flex w-full flex-col gap-2">
          <h2 className="text-left text-2xl font-semibold lg:text-3xl">
            Adicionar Produto
          </h2>
          <p className="text-left text-sm text-neutral-500 lg:text-base">
            Adicione produtos para preencher as suas categorias e atrair mais
            clientes para o seu estabelecimento agora mesmo.
          </p>
        </article>
        <form id="register-market" onSubmit={handleSubmit(onSubmit)}>
          <section className="flex w-full flex-col gap-1">
            <div className="flex w-full flex-col gap-8 lg:flex-row lg:justify-between">
              <div className="w-full max-w-[200px]">
                {productImage ? (
                  <div className="flex h-full max-h-[258px] w-full flex-col gap-4">
                    <Image
                      alt="Product Image"
                      className="mx-auto h-[200px] w-[200px] rounded-sm object-cover object-center"
                      height={1080}
                      src={productImage}
                      width={1080}
                    />
                    <Button className="flex min-w-full items-end justify-center text-center md:text-sm">
                      Colocar outra logo
                    </Button>
                  </div>
                ) : (
                  <article className="mb-4 flex h-full max-h-[258px] flex-col items-center justify-center gap-4 border p-4">
                    <MediaIcon />
                    <UploadButton
                      uploadImageAction={async (path: string) =>
                        await handleUploadImage(path)
                      }
                      isLoading={isUploadLoading}
                      setImagePath={setProductImage}
                    >
                      <p className="cursor-pointer">Escolher imagem</p>
                    </UploadButton>
                  </article>
                )}
              </div>
              <div className="flex w-full flex-col gap-1">
                <InputField
                  id="name"
                  label="Nome do Produto"
                  maxLength={80}
                  minLength={3}
                  placeholder="Ex:. Limpeza, Frios, Utensílios..."
                  spellCheck={false}
                  autoFocus
                  {...register('name')}
                  variant="secondary"
                />
                <InputField
                  id="description"
                  label="Descrição do Produto"
                  maxLength={1200}
                  minLength={4}
                  placeholder="Produto a qual usuário poderá adicionar em seu carrinho"
                  spellCheck={false}
                  {...register('description')}
                  variant="secondary"
                />
              </div>
            </div>
            <SelectField
              options={
                hasCategories
                  ? allCategories.map(category => ({
                      label: `${category.name} - ${category.id}`,
                      value: category.id
                    }))
                  : []
              }
              label="Categoria"
              name="city"
              placeholder="Categoria do Produto"
              variant="secondary"
              {...register('category_id')}
            />
            <Controller
              render={({ field: { onChange, value } }) => (
                <NumericFormat
                  onValueChange={values => {
                    const { floatValue } = values
                    onChange(floatValue || 0)
                  }}
                  allowNegative={false}
                  className="rounded-md border px-3 py-2 text-sm text-neutral-700 shadow-sm outline-none ring-1 ring-transparent transition-all duration-300 focus:ring-neutral-700"
                  decimalScale={2}
                  decimalSeparator=","
                  defaultValue={0}
                  id="price"
                  name="price"
                  prefix="R$ "
                  thousandSeparator="."
                  value={value}
                  fixedDecimalScale
                />
              )}
              control={control}
              name="price"
            />
            <InputField
              defaultValue={0}
              id="quantity"
              label="Quantidade em Estoque"
              max={9999}
              min={0}
              placeholder="Quantidade disponível em estoque (Kg ou unidades)"
              spellCheck={false}
              type="number"
              {...register('quantity')}
              variant="secondary"
            />
            <Button
              className="mt-8 min-w-full md:text-sm"
              isLoading={isSubmitting || isValidating}
              type="submit"
              variant="primary"
            >
              Adicionar Produto
            </Button>
          </section>
        </form>
      </div>
    </Modal>
  )
}
