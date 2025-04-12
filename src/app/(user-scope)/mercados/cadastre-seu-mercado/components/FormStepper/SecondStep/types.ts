import type { SetStateAction } from 'react'

import type { DefaultFormFields } from '@/constants/forms/default-forms-fields'

export interface RegisterMarketFormInputs
  extends Pick<
    DefaultFormFields,
    | 'marketName'
    | 'address'
    | 'cep'
    | 'city'
    | 'email'
    | 'marketDescription'
    | 'phone_number'
    | 'state'
  > {}

export interface AddressData {
  city: string
  state: string
  street: string
}

export interface SecondStepProps {
  setCurrentStep: React.Dispatch<SetStateAction<number>>
}
