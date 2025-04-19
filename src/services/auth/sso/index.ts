import type { AxiosInstance } from 'axios'

import type { User } from '@/types/models/user'
import type { ServiceRequestResponse } from '@/types/services/serviceRequestResponse'
import { generateSsoToken } from '@/utils/auth/generateSsoToken'

import type { CreateUserData, LoginUserData, LoginUserResponse } from './types'

export class SsoAuth {
  private instance: AxiosInstance

  constructor(instance: AxiosInstance) {
    this.instance = instance
  }

  createUser = async (
    payload: CreateUserData
  ): Promise<ServiceRequestResponse<User>> => {
    try {
      const ssoToken = await generateSsoToken(payload)

      const { data, status } = await this.instance.post(
        `/auth/sso/create-user`,
        {
          token: ssoToken
        }
      )

      if (status !== 201) {
        throw new Error(data.message)
      }

      const { token, ...user } = data

      return {
        data: {
          ...user,
          token
        }
      }
    } catch (err) {
      console.error({
        createUserErrorMessage: err.message
      })

      return {
        error: err.message
      }
    }
  }

  loginUser = async (
    payload: LoginUserData
  ): Promise<ServiceRequestResponse<LoginUserResponse>> => {
    try {
      const ssoToken = await generateSsoToken(payload)

      const { data, status } = await this.instance.post(
        `/auth/sso/login-user`,
        {
          token: ssoToken
        }
      )

      if (status !== 200) {
        throw new Error(data.message)
      }

      const { token, ...user } = data

      return {
        ...user,
        token
      }
    } catch (err) {
      console.error({
        loginUserErrorMessage: err.message
      })
      return {
        error: err.message
      }
    }
  }
}
