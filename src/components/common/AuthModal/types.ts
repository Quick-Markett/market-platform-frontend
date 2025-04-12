import type { ModalProps } from '@/components/toolkit/Modal/types'
import type { GetAuthFormCookiesDataReturn } from '@/utils/auth/getAuthFormCookiesData/types'

export interface AuthModalProps extends Partial<ModalProps> {}

export interface ModalWrapperProps extends AuthModalProps {
  cookiesData: GetAuthFormCookiesDataReturn
}
