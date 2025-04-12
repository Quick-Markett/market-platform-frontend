import { z } from 'zod'

import { normalEmailValidation } from '@/utils/helpers/normalEmailValidation'

export const loginFormSchema = () =>
  z.object({
    email: z
      .string()
      .nonempty('Campo obrigatório..')
      .email({ message: 'Campo obrigatório..' })
      .refine(value => normalEmailValidation({ value }), {
        message: 'Campo obrigatório..'
      }),
    password: z.string().nonempty('Campo obrigatório..')
  })
