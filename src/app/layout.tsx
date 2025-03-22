import type { Metadata, NextPage } from 'next'
import { getServerSession } from 'next-auth'

import { AuthModal } from '@/components/common/AuthModal'
import { Footer } from '@/components/common/Footer'
import { Navbar } from '@/components/common/Navbar'
import { APP_FONT } from '@/constants/font'
import NextAuthProvider from '@/contexts/NextAuthProvider'
import { authOptions } from '@/libs/auth'

import '@/styles/globals.scss'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

const RootLayout: NextPage = async ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  const session = await getServerSession(authOptions)

  return (
    <html lang="pt">
      <body className={`selection:bg-[#ecc79c38] ${APP_FONT.className}`}>
        <NextAuthProvider session={session}>
          <Navbar />
          {children}
          <Footer />
          <AuthModal />
        </NextAuthProvider>
      </body>
    </html>
  )
}

export default RootLayout
