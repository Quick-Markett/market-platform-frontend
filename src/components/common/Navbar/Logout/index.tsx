'use client'

import { signOut } from 'next-auth/react'

import { clearAllCookies } from '@/utils/auth/clearAllCookies'

export const Logout: React.FC = () => {
  const handleSignOut = () => {
    signOut()
    clearAllCookies()
  }

  return (
    <button onClick={() => handleSignOut()}>Botão de sair provisório</button>
  )
}
