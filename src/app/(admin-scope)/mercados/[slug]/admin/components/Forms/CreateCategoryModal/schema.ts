import { z } from 'zod'

export const createCategorySchema = () =>
  z.object({
    name: z.string().nonempty('Campo obrigatório.'),
    description: z.string().nonempty('Campo obrigatório.')
  })
