import type { User as UserInterface } from './authentication'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    error?: string
    token?: string
    user: ExtendedUser
  }

  interface JWT {
    error?: string
    user?: ExtendedUser
  }

  interface User extends UserInterface {
    id: number
    token?: string
  }
}

interface ExtendedUser {
  accessToken?: string
  accessTokenExpires?: number
  email: string
  id: string
  image?: string
  name: string
  provider?: string
  refreshToken?: string
}
