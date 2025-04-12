import type { SelectInputCopy } from './selectInputCopy'
import type { TextInputCopy } from './textInputCopy'

export interface DefaultFormsFieldsCopy {
  corporativeEmail: TextInputCopy
  email: TextInputCopy
  fieldsErrors: {
    fullNameNeeded: string
  }
  interests: SelectInputCopy
  name: TextInputCopy
  page: string
  phone: {
    label: string
    errors: {
      invalid: string
    }
  }
  requiredFieldsMessages: {
    requiredField: string
    requiredSelectField: string
    requiredMultiSelectField: string
  }
  submitErrorMessage: string
  supermarket: TextInputCopy
  toastErrorMessage: string
}
