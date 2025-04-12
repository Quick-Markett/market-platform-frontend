import type { StepProps } from '@/components/toolkit/Stepper/types'

export type AuthFormCustomSteps = 'login' | 'signUp' | 'feedback'

export interface CommonFormsData {
  email?: string
  initialStep?: AuthFormCustomSteps
  redirect?: boolean
  redirectUrl?: string
  username?: string
}

export interface FormStepProps extends StepProps {
  commonFormsData: CommonFormsData
  setActiveStep: (step: AuthFormCustomSteps) => void
  setCommonFormsData: (data: CommonFormsData) => void
}
