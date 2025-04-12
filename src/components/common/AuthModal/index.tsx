import { getAuthFormCookiesData } from '@/utils/auth/getAuthFormCookiesData'

import { AuthForm } from '../AuthForm'
import { ModalWrapper } from './ModalWrapper'
import type { AuthModalProps } from './types'

export const AuthModal: React.FC<AuthModalProps> = async ({ dismissible }) => {
  const cookiesData = await getAuthFormCookiesData()

  return (
    <ModalWrapper cookiesData={cookiesData} dismissible={dismissible}>
      <AuthForm />
    </ModalWrapper>
  )
}
