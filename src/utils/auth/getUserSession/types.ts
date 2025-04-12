import type { User } from '@/types/models/user'

export interface GetUserSessionResponse {
  id: number
  token: string
  user: User
}
