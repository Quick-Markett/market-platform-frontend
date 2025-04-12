import type { FormStepProps } from '../types'

export interface LoginFormProps extends FormStepProps {}

export interface LoginFormInputs {
  email: string
  password: string
}

export interface OnSubmitPayload extends LoginFormInputs {}
