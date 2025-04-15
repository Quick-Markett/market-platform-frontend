import { z } from 'zod'

export const createProductSchema = () =>
  z.object({
    name: z.string().nonempty('Campo obrigatório.'),
    description: z.string().nonempty('Campo obrigatório.'),
    category_id: z.number().min(0, 'Campo obrigatório.')
  })
