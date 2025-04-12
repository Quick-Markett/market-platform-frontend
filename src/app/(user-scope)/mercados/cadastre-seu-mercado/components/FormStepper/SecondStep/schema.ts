import { z } from 'zod'

import { normalEmailValidation } from '@/utils/helpers/normalEmailValidation'

export const registerMarketSchema = () =>
  z.object({
    marketName: z.string().nonempty('Campo obrigatório..'),
    marketDescription: z.string().nonempty('Campo obrigatório..'),
    phone_number: z.string().nonempty('Campo obrigatório..'),
    cep: z.string().nonempty('Campo obrigatório..'),
    email: z
      .string()
      .nonempty('Campo obrigatório..')
      .email({ message: 'Campo obrigatório..' })
      .refine(value => normalEmailValidation({ value }), {
        message: 'Campo obrigatório..'
      }),
    state: z.string().nonempty('Campo obrigatório..'),
    city: z.string().nonempty('Campo obrigatório..'),
    address: z.string().nonempty('Campo obrigatório..')
  })
