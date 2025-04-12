'use client'

import { createContext, useContext, useState } from 'react'

import type { Market } from '@/types/models/market'

import type { AdminContextProps, AdminContextProviderProps } from './types'

const AdminContext = createContext<AdminContextProps>(null)

export const AdminContextProvider: React.FC<AdminContextProviderProps> = ({
  market,
  children
}) => {
  const [marketData, setMarketData] = useState<Market>(market)

  return (
    <AdminContext.Provider
      value={{
        marketData,
        setMarketData
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export const useAdminContext = () => {
  return useContext(AdminContext)
}
