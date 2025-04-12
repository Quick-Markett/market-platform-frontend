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
  > {}

export interface LoginUserData {
  email: string
  password: string
}
