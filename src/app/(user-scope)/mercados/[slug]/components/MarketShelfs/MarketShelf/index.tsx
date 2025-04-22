import Image from 'next/image'

import type { MarketShelfProps } from './types'

export const MarketShelf: React.FC<MarketShelfProps> = ({ shelf }) => {
  return (
    <div className="flex w-full flex-col gap-4">
      <h2 className="text-lg font-semibold lg:text-2xl">{shelf.category}</h2>
      <div className="flex w-full flex-col gap-4 lg:flex-row">
        {shelf.products.map((product, index: number) => (
          <div
            className="group flex w-full max-w-[170px] cursor-pointer flex-col gap-4 rounded-md"
            key={`${product.slug}-${index}`}
          >
            <figure className="mx-auto flex min-h-24 w-full items-center justify-center rounded-md bg-neutral-100 p-3 transition-all duration-300 group-hover:brightness-[0.98]">
              <Image
                src={
                  product.product_image ||
                  'https://png.pngtree.com/png-clipart/20231018/original/pngtree-fresh-apple-fruit-red-png-image_13344485.png'
                }
                alt={product.product_name}
                className="flex h-16 w-full max-w-16 items-center justify-center object-contain"
                height={1080}
                width={1080}
              />
            </figure>
            <article className="flex w-full flex-col">
              <p className="txt-sm text-left font-medium">
                {product.unit_price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </p>
              <p className="text-sm text-neutral-600">{product.product_name}</p>
              <p className="mt-1 line-clamp-1 text-xs text-neutral-400">
                {product.product_description}
              </p>
            </article>
          </div>
        ))}
      </div>
    </div>
  )
}
