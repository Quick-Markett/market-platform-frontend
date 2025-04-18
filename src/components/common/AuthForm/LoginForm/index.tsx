'use client'

import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Button } from '@/components/toolkit/Button'
import { InputField } from '@/components/toolkit/Fields/InputField'
import useRefreshRoute from '@/hooks/useRefreshRoute'
import { useUserSession } from '@/hooks/useUserSession'
import { instanceMotor } from '@/instances/instanceMotor'
import { handleCloseAuthModal } from '@/utils/customEvents/@handlers/authModal/handleCloseAuthModal'
import { zodResolver } from '@hookform/resolvers/zod'

import { loginFormSchema } from './schema'
import type { LoginFormInputs, LoginFormProps } from './types'

export const LoginForm: React.FC<LoginFormProps> = ({
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
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema())
  })

  const [isLoadingSubmit, setIsLoadingSubmit] = useState({
    email: false,
    google: false
  })

  const onSubmit: SubmitHandler<LoginFormInputs> = async ({
    email,
    password
  }) => {
    setIsLoadingSubmit(prev => ({
      ...prev,
      email: true
    }))

    try {
      const { error: accountDoesNotExist } =
        await instanceMotor.users.getUserByEmail({
          email
        })

      if (accountDoesNotExist) {
        toast.error('User not found, try again later or create an account now.')
        return
      }

      const response = await signIn('credentials', {
        email,
        password,
        redirect: true,
        callbackUrl: window.location.href,
        action: 'signIn'
      })

      if (response?.error) {
        throw new Error(response.error)
      }
    } catch (loginUserErr) {
      console.error({ message: loginUserErr })
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
