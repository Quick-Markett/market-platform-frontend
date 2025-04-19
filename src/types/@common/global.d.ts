import type { User as UserModel } from '@/types/models/user'

import type { User as UserInterface } from './authentication'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: Partial<UserModel>
  }

  interface User extends UserInterface {
    id: number
  }
}
