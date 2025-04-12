import type { User as UserInterface } from './authentication'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: User
  }

  interface User extends UserInterface {
    id: number
    token?: string
  }
}
