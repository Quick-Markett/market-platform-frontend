'use client'

import axios from 'axios'
import { useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Button } from '@/components/toolkit/Button'
import { InputField } from '@/components/toolkit/Fields/InputField'
import { Modal } from '@/components/toolkit/Modal'
import { CATEGORY_DEFAULT_FIELDS } from '@/constants/forms/category-default-fields'
import { useAdminContext } from '@/contexts/AdminProvider'
import { useGetAllCategories } from '@/hooks/swr/useGetAllCategories'
import { useEventListener } from '@/hooks/useEventListener'
import { useUserSession } from '@/hooks/useUserSession'
import type { Category } from '@/types/models/category'
import { zodResolver } from '@hookform/resolvers/zod'

import { createCategorySchema } from './schema'
import type { CreateCategoryFormData, CreateCategoryFormInputs } from './types'

export const EditCategoryModal: React.FC = () => {
  const { user } = useUserSession()
  const { marketData } = useAdminContext()
  const { mutate } = useGetAllCategories({ payload: user.token })

  const [categoryData, setCategoryData] = useState<Category>(
    CATEGORY_DEFAULT_FIELDS
  )
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const formMethods = useForm<CreateCategoryFormInputs>({
    resolver: zodResolver(createCategorySchema()),
    defaultValues: {
      description: categoryData?.description || '',
      name: categoryData?.name || ''
    }
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
      const { status } = await axios.post('/api/categories/update-category', {
        token: user.token,
        payload: {
          description,
          name,
          id: marketData.id
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

  useEventListener('edit-category', ({ action, data }) => {
    switch (action) {
      case 'open': {
        setIsModalOpen(true)
        setCategoryData(data)
        break
      }
      case 'close': {
        setIsModalOpen(false)
        setCategoryData(null)
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
              defaultValue={categoryData.name}
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
              defaultValue={categoryData.description}
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
