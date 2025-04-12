import type { PropsWithChildren, SetStateAction } from 'react'

import type { Market } from '@/types/models/market'
export interface AdminContextProps {
  marketData: Market
  setMarketData: React.Dispatch<SetStateAction<Market>>
}

export interface AdminContextProviderProps extends PropsWithChildren {
  market: Market
}

export type AdminTabs =
  | 'editar-informacoes'
  | 'categorias'
  | 'produtos'
  | 'visualizar'
  | 'clientes'
  | 'geral'
  | 'analytics'
  | 'termos-de-uso'
  | 'faq'
