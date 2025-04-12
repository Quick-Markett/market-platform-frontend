/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RegisterMarketFormInputs } from '@/app/(admin-scope)/mercados/[slug]/editar/components/AdminTabs/EditMarket/types'

export interface ControlledSelectFieldProps {
  control: any
  disabled?: boolean
  label: string
  name: keyof RegisterMarketFormInputs
  placeholder: string
  variant?: 'primary' | 'secondary'
}
