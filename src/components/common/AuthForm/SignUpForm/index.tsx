'use client'

import { signIn } from 'next-auth/react'
import Error from 'next/error'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Button } from '@/components/toolkit/Button'
import { InputField } from '@/components/toolkit/Fields/InputField'
import useRefreshRoute from '@/hooks/useRefreshRoute'
import { useUserSession } from '@/hooks/useUserSession'
import { handleCloseAuthModal } from '@/utils/customEvents/@handlers/authModal/handleCloseAuthModal'
import { zodResolver } from '@hookform/resolvers/zod'

import { signUpFormSchema } from './schema'
import type {
  OnSubmitPayload,
  SignUpFormInputs,
  SignUpFormProps
} from './types'

export const SignUpForm: React.FC<SignUpFormProps> = ({
  setActiveStep,
  setCommonFormsData
}) => {
  const { user } = useUserSession()
  const { refreshRoute } = useRefreshRoute({
    onRefresh: handleCloseAuthModal
  })

  const {
    register,
    handleSubmit,
    formState: { isValidating }
  } = useForm<SignUpFormInputs>({
    resolver: zodResolver(signUpFormSchema())
  })

  const [isLoadingSubmit, setIsLoadingSubmit] = useState({
    email: false,
    google: false
  })

  const onSubmit: SubmitHandler<SignUpFormInputs> = async ({
    name,
    email: originalEmail,
    password,
    confirmPassword
  }: OnSubmitPayload) => {
    if (password !== confirmPassword) {
      toast.info('The passwords are diferent!')
      return new Error({
        statusCode: 500,
        title: 'The passwords are diferent!'
      })
    }

    const email = originalEmail.trim().toLowerCase()

    setIsLoadingSubmit(prev => ({
      ...prev,
      email: true
    }))

    try {
      const response = await signIn('credentials', {
        name,
        email,
        password,
        redirect: true,
        callbackUrl: window.location.href,
        action: 'signUp'
      })

      if (response?.error) {
        toast.info('Cannot create a new account!')
        return
      }

      setActiveStep('feedback')
    } catch (signUpErr) {
      console.error(signUpErr)
    } finally {
      setIsLoadingSubmit({
        email: false,
        google: false
      })
    }
  }

  const handleSignInWithGoogle = async () => {
    setIsLoadingSubmit(prev => ({
      ...prev,
      google: true
    }))
    signIn('google', {
      callbackUrl: window.location.href
    })
  }

  useEffect(() => {
    if (user) {
      refreshRoute()
    }
  }, [user, refreshRoute])

  return (
    <form
      className="animate__animated animate__fadeIn flex flex-col items-center gap-8 pt-8"
      id="login-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <section className="flex w-full flex-col gap-1">
        <InputField
          id="name"
          label="Nome do Usuário"
          maxLength={80}
          minLength={2}
          placeholder="Digite o seu nome"
          spellCheck={false}
          autoFocus
          {...register('name')}
          variant="secondary"
        />
        <InputField
          id="email"
          label="Email"
          maxLength={80}
          minLength={8}
          placeholder="Digite o seu email"
          spellCheck={false}
          autoFocus
          {...register('email')}
          variant="secondary"
        />
        <InputField
          id="password"
          label="Senha"
          maxLength={40}
          minLength={8}
          placeholder="Digite a sua senha"
          spellCheck={false}
          autoFocus
          {...register('password')}
          variant="secondary"
        />
        <InputField
          id="confirmPassword"
          label="Confirmar Senha"
          maxLength={40}
          minLength={8}
          placeholder="Confirme a sua senha"
          spellCheck={false}
          autoFocus
          {...register('confirmPassword')}
          variant="secondary"
        />
        <Button
          className="mt-4 min-w-full md:text-sm"
          isLoading={isLoadingSubmit.email || isValidating}
          type="submit"
          variant="primary"
        >
          Cadastrar
        </Button>
      </section>
      <div className="flex w-full items-center gap-4">
        <hr className="h-[1px] w-full bg-neutral-400" />
        <p className="text-sm text-neutral-600">ou</p>
        <hr className="h-[1px] w-full bg-neutral-400" />
      </div>
      <Button
        className="flex w-full cursor-pointer items-center gap-2 rounded-md border border-neutral-300 px-2 py-1.5 transition-all duration-300 hover:bg-slate-50"
        onClick={() => handleSignInWithGoogle()}
        variant="custom"
      >
        <figure className="w-8">
          <Image
            alt="Google Logo"
            className="w-8"
            height={512}
            src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
            width={512}
          />
        </figure>
        <p className="text-sm text-neutral-600">Entrar com o Google</p>
      </Button>
    </form>
  )
}
