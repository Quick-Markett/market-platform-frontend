import type { SwiperOptions } from 'swiper/types'

import type { OfferProductProps } from './types'

export const OFFERS: OfferProductProps[] = [
  {
    productName: 'Arroz 5kg',
    marketName: 'Mercado Central',
    oldPrice: 25.0,
    newestPrice: 19.9,
    discount: 5.1
  },
  {
    productName: 'Feijão Carioca 1kg',
    marketName: 'Super Econômico',
    oldPrice: 8.5,
    newestPrice: 6.99,
    discount: 1.51
  },
  {
    productName: 'Óleo de Soja 900ml',
    marketName: 'Mercadinho do Bairro',
    oldPrice: 9.0,
    newestPrice: 7.49,
    discount: 1.51
  },
  {
    productName: 'Açúcar Refinado 1kg',
    marketName: 'Hiper Top',
    oldPrice: 4.5,
    newestPrice: 3.89,
    discount: 0.61
  },
  {
    productName: 'Macarrão Espaguete 500g',
    marketName: 'Atacadão Express',
    oldPrice: 5.0,
    newestPrice: 4.29,
    discount: 0.71
  },
  {
    productName: 'Leite Integral 1L',
    marketName: 'Mini Preço',
    oldPrice: 6.0,
    newestPrice: 5.19,
    discount: 0.81
  },
  {
    productName: 'Café em Pó 500g',
    marketName: 'Super Fácil',
    oldPrice: 18.0,
    newestPrice: 14.99,
    discount: 3.01
  },
  {
    productName: 'Detergente Líquido 500ml',
    marketName: 'Economax',
    oldPrice: 3.5,
    newestPrice: 2.99,
    discount: 0.51
  },
  {
    productName: 'Sabonete em Barra',
    marketName: 'Mercado Rápido',
    oldPrice: 2.0,
    newestPrice: 1.49,
    discount: 0.51
  },
  {
    productName: 'Papel Higiênico 12 rolos',
    marketName: 'Pague Menos',
    oldPrice: 22.0,
    newestPrice: 18.9,
    discount: 3.1
  },
  {
    productName: 'Queijo Mussarela 1kg',
    marketName: 'HiperMais',
    oldPrice: 45.0,
    newestPrice: 39.9,
    discount: 5.1
  },
  {
    productName: 'Refrigerante 2L',
    marketName: 'Mercadão Popular',
    oldPrice: 8.0,
    newestPrice: 6.49,
    discount: 1.51
  },
  {
    productName: 'Farinha de Trigo 1kg',
    marketName: 'Básico e Bom',
    oldPrice: 7.5,
    newestPrice: 6.29,
    discount: 1.21
  },
  {
    productName: 'Margarina 500g',
    marketName: 'Compre Bem',
    oldPrice: 9.0,
    newestPrice: 7.99,
    discount: 1.01
  },
  {
    productName: 'Biscoito Recheado 140g',
    marketName: 'marketName da Família',
    oldPrice: 4.0,
    newestPrice: 3.49,
    discount: 0.51
  },
  {
    productName: 'Filé de Frango 1kg',
    marketName: 'Max Econômico',
    oldPrice: 25.0,
    newestPrice: 21.99,
    discount: 3.01
  },
  {
    productName: 'Linguiça Toscana 1kg',
    marketName: 'Super Premium',
    oldPrice: 19.0,
    newestPrice: 16.49,
    discount: 2.51
  },
  {
    productName: 'Alface Crespa',
    marketName: 'marketName Simples',
    oldPrice: 3.5,
    newestPrice: 2.99,
    discount: 0.51
  },
  {
    productName: 'Cenoura 1kg',
    marketName: 'Super Prático',
    oldPrice: 6.0,
    newestPrice: 4.99,
    discount: 1.01
  },
  {
    productName: 'Batata 1kg',
    marketName: 'HiperTudo',
    oldPrice: 7.0,
    newestPrice: 5.49,
    discount: 1.51
  }
] as const

export const desktopSliderOptions: SwiperOptions = {
  pagination: {
    enabled: false
  },
  breakpoints: {
    300: {
      slidesPerView: 1.2
    },
    500: {
      slidesPerView: 2.8
    },
    700: {
      slidesPerView: 4.1
    },
    1024: {
      slidesPerView: 5.2
    }
  },
  spaceBetween: 16,
  slidesOffsetBefore: 16,
  slidesOffsetAfter: 16,
  loop: true
} satisfies SwiperOptions
