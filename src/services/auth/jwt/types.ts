export interface ValidateAndRefreshTokenData {
  refresh_token: string
  token: string
}

export interface ValidateAndRefreshTokenDataResponse
  extends ValidateAndRefreshTokenData {}

export type TokenServiceRequestResponse<T> = {
  data?: T
  status?: number
  error?: string
}
