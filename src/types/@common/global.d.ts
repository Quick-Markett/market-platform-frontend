import type { User as UserInterface } from './authentication'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    token?: string
    user: User & { token?: string }
  }

  interface User extends UserInterface {
    id: number
    token?: string
  }
}
