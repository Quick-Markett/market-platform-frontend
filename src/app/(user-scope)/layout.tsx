import type { PropsWithChildren } from 'react'

import { Navbar } from '@/components/common/Navbar'

const UserScopeLayout: React.FC<PropsWithChildren> = async ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default UserScopeLayout
