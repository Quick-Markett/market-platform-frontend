import { z } from 'zod'

import { normalEmailValidation } from '@/utils/helpers/normalEmailValidation'

export const loginFormSchema = () =>
  z.object({
    email: z
      .string()
      .nonempty('Esse campo é obrigatório.')
      .email({ message: 'Esse campo é obrigatório.' })
      .refine(value => normalEmailValidation({ value }), {
        message: 'Esse campo é obrigatório.'
      }),
    password: z.string().nonempty('Esse campo é obrigatório.')
  })
