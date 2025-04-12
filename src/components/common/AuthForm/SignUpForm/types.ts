import type { FormStepProps } from '../types'

export interface SignUpFormProps extends FormStepProps {}

export interface SignUpFormInputs {
  confirmPassword: string
  email: string
  name: string
  password: string
}

export interface OnSubmitPayload extends SignUpFormInputs {}
