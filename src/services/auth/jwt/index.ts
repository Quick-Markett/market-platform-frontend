import type { AxiosInstance } from 'axios'

import type { ServiceRequestResponse } from '@/types/services/serviceRequestResponse'

import type {
  ValidateAndRefreshTokenData,
  ValidateAndRefreshTokenDataResponse
} from './types'

export class Jwt {
  private instance: AxiosInstance

  constructor(instance: AxiosInstance) {
    this.instance = instance
  }

  validateAndRefreshToken = async ({
    token
  }: ValidateAndRefreshTokenData): Promise<
    ServiceRequestResponse<ValidateAndRefreshTokenDataResponse>
  > => {
    try {
      const { data, status } = await this.instance.post(`/auth/refresh-token`, {
        token
      })

      if (status !== 200) {
        throw new Error(data.message)
      }

      return data
    } catch (validateAndRefreshJwtTokenErr) {
      console.error({
        validateAndRefreshJwtTokenErr: validateAndRefreshJwtTokenErr.message
      })

      return {
        error: validateAndRefreshJwtTokenErr.message
      }
    }
  }
}
