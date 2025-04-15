import type { User } from '@/types/models/user'

export interface useGetAllCategoriesData {
  payload: Pick<User, 'token'>
}
