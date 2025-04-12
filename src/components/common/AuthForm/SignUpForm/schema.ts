import { z } from 'zod'

import { normalEmailValidation } from '@/utils/helpers/normalEmailValidation'
import { verifyPhoneMinLength } from '@/utils/helpers/verifyPhoneMinLength'

export const signUpFormSchema = () =>
  z.object({
    name: z
      .string()
      .nonempty('Campo obrigatório..')
      .refine(value => verifyPhoneMinLength({ value }), {
        message: 'Campo obrigatório..'
      }),
    email: z
      .string()
      .nonempty('Campo obrigatório..')
      .email({ message: 'Campo obrigatório..' })
      .refine(value => normalEmailValidation({ value }), {
        message: 'Campo obrigatório..'
      }),
    password: z.string().nonempty('Campo obrigatório..'),
    confirmPassword: z.string().nonempty('Campo obrigatório..')
  })
