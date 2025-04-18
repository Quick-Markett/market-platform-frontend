export interface User {
  accessToken?: string
  accessTokenExpires?: number
  address: string
  city: string
  created_at: string
  deleted_at: string
  email: string
  google_id?: string
  id: number
  is_active: string
  name: string
  password: string
  profile_picture: string
  provider?: string
  refreshToken?: string
  state: string
  token?: string
  updated_at: string
}
