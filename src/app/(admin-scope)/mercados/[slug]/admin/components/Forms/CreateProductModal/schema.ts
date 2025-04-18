import { z } from 'zod'

export const createProductSchema = () =>
  z.object({
    name: z.string().nonempty('Campo obrigatório.'),
    description: z.string().nonempty('Campo obrigatório.'),
    category_id: z.coerce.number().min(0, 'Campo obrigatório.'),
    price: z
      .number()
      .min(1, 'Não é possível adicionar um produto por 0 reais')
      .max(9999, 'Preço do Produto está muito alto!')
      .nonnegative('Digite um valor positivo'),
    quantity: z
      .number()
      .min(0, 'Não é possível adicionar um produto com estoque negativo')
      .max(9999, 'Quantidade do estoque está muito alta')
      .nonnegative('Digite um valor positivo')
  })
