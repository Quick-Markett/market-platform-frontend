import type { AuthFormCustomSteps } from '@/components/common/AuthForm/types'

export interface SetAuthFormCookiesDataProps {
  cookiesAuthInitialStep?: AuthFormCustomSteps
  cookiesGoogleId?: string
  cookiesUserEmail?: string
}
