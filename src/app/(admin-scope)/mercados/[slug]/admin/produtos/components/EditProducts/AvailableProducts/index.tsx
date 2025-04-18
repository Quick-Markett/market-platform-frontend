import Image from 'next/image'

import { Button } from '@/components/toolkit/Button'

import type { AvailableProductsProps } from './types'

export const AvailableProducts: React.FC<AvailableProductsProps> = ({
  products
}) => {
  return (
    <div className="grid h-auto w-fit max-w-full grid-cols-1 items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {products.map((product, index: number) => (
        <div
          className="flex h-full w-full max-w-[350px] flex-col gap-6 rounded-sm border border-neutral-300 bg-white px-4 pb-6 pt-4"
          key={`${product.slug}-${index}`}
        >
          <figure className="relative flex w-full items-center justify-center rounded-sm lg:h-[150px] xl:h-[180px]">
            <Image
              src={
                product.product_image ||
                'https://plus.unsplash.com/premium_photo-1701090939615-1794bbac5c06?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JheSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D'
              }
              alt={product.product_name}
              className="w-full object-cover lg:h-[150px] xl:h-[180px]"
              height={1080}
              width={1980}
            />
            <span className="absolute right-2 top-2 bg-white px-2 py-0.5 text-xs xl:right-4 xl:top-4">
              Categoria
            </span>
          </figure>
          <article className="flex w-full flex-col gap-2">
            <p className="text-sm">
              {product.unit_price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </p>
            <h2 className="-mt-1 text-base font-medium lg:text-lg">
              {product.product_name}
            </h2>
            <p className="line-clamp-2 text-sm text-neutral-500">
              {product.product_description}
            </p>
            <Button
              className="mt-4 min-w-full md:text-sm"
              variant="primaryOutline"
            >
              Editar Produto
            </Button>
          </article>
        </div>
      ))}
    </div>
  )
}
