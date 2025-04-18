'use client'

import axios from 'axios'
import { useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Button } from '@/components/toolkit/Button'
import { InputField } from '@/components/toolkit/Fields/InputField'
import { Modal } from '@/components/toolkit/Modal'
import { useAdminContext } from '@/contexts/AdminProvider'
import { useGetAllCategories } from '@/hooks/swr/useGetAllCategories'
import { useEventListener } from '@/hooks/useEventListener'
import { useUserSession } from '@/hooks/useUserSession'
import { convertToSlug } from '@/utils/helpers/convertToSlug'
import { zodResolver } from '@hookform/resolvers/zod'

import { createCategorySchema } from './schema'
import type { CreateCategoryFormData, CreateCategoryFormInputs } from './types'

export const CreateCategoryModal: React.FC = () => {
  const { user } = useUserSession()
  const { marketData } = useAdminContext()
  const { mutate } = useGetAllCategories({ payload: user.token })

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const formMethods = useForm<CreateCategoryFormInputs>({
    resolver: zodResolver(createCategorySchema())
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValidating, isSubmitting }
  } = formMethods

  const onSubmit: SubmitHandler<CreateCategoryFormData> = async ({
    description,
    name
  }) => {
    try {
      const slug = convertToSlug({ text: name })

      const { status } = await axios.post('/api/categories/create-category', {
        token: user.token,
        payload: {
          description,
          market_id: marketData.id,
          name,
          slug
        }
      })

      setValue('description', '')
      setValue('name', '')

      if (status !== 201) {
        toast.error('Ops.. houve um erro ao criar a categoria!')
        return
      }

      await mutate().then(() => {
        toast.success('Categoria criada com sucesso!')
        setIsModalOpen(false)
      })
    } catch (submitCreateMarketFormErr) {
      console.error(submitCreateMarketFormErr)
    }
  }

  useEventListener('create-category', ({ action }) => {
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
            Criar Categoria
          </h2>
          <p className="text-left text-sm text-neutral-500 lg:text-base">
            Crie categorias para organizar as prateleiras de seu mercado virtual
            e assim facilitar para que seu cliente encontre os produtos!
          </p>
        </article>
        <form id="register-market" onSubmit={handleSubmit(onSubmit)}>
          <section className="flex w-full flex-col gap-1">
            <InputField
              id="name"
              label="Nome da Categoria"
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
              label="Descrição da categoria"
              maxLength={1200}
              minLength={4}
              placeholder="O que um usuário poderá encontrar nessa categoria"
              spellCheck={false}
              {...register('description')}
              variant="secondary"
            />
            <Button
              className="mt-8 min-w-full md:text-sm"
              isLoading={isSubmitting || isValidating}
              type="submit"
              variant="primary"
            >
              Criar Categoria
            </Button>
          </section>
        </form>
      </div>
    </Modal>
  )
}
