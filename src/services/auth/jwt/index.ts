import type { AxiosInstance } from 'axios'

import { parseJwtToken } from '@/utils/helpers/parseJwtToken'

import type {
  TokenServiceRequestResponse,
  ValidateAndRefreshTokenData,
  ValidateAndRefreshTokenDataResponse
} from './types'

export class Jwt {
  private instance: AxiosInstance

  constructor(instance: AxiosInstance) {
    this.instance = instance
  }

  validateAndRefreshToken = async ({
    token,
    refresh_token
  }: ValidateAndRefreshTokenData): Promise<
    TokenServiceRequestResponse<ValidateAndRefreshTokenDataResponse>
  > => {
    try {
      const decodedToken = parseJwtToken({ token })

      if (!decodedToken?.exp) {
        return {
          status: 200
        }
      }

      const now = Math.floor(Date.now() / 1000)
      const timer = 60 * 5

      if (decodedToken.exp - now < timer) {
        const { data, status } = await this.instance.post(
          `/auth/refresh-token`,
          {
            token,
            refresh_token
          }
        )

        if (status !== 200) {
          throw new Error(data.message)
        }

        return {
          data,
          status
        }
      }

      return {
        status: 200
      }
    } catch (validateAndRefreshJwtTokenErr) {
      console.error({
        validateAndRefreshJwtTokenErr: validateAndRefreshJwtTokenErr.message
      })

      return {
        status: 401,
        error: validateAndRefreshJwtTokenErr.message
      }
    }
  }
}
