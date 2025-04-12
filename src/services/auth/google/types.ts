import type { User } from '@/types/models/user'

export interface CreateUserData
  extends Pick<
    User,
    | 'address'
    | 'city'
    | 'email'
    | 'password'
    | 'name'
    | 'state'
    | 'profile_picture'
    | 'google_id'
  > {}

export interface LoginUserData {
  googleId: string
}

export interface UpdateUserData {
  googleId: string
  userId: number
}
