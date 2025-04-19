import type { AxiosInstance } from 'axios'

import type { User } from '@/types/models/user'
import type { ServiceRequestResponse } from '@/types/services/serviceRequestResponse'

import type {
  CreateUserData,
  LoginUserData,
  LoginUserResponse,
  UpdateUserData
} from './types'

export class GoogleAuth {
  private instance: AxiosInstance

  constructor(instance: AxiosInstance) {
    this.instance = instance
  }

  createUser = async (
    payload: CreateUserData
  ): Promise<ServiceRequestResponse<User>> => {
    try {
      const { data, status } = await this.instance.post(
        `/users/google/create-user`,
        payload
      )

      if (status !== 201) {
        throw new Error(data.message)
      }

      return data
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
      const { data, status } = await this.instance.post(
        `/users/google/login-user`,
        {
          google_id: payload.googleId
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

  updateUser = async ({
    userId,
    googleId
  }: UpdateUserData): Promise<ServiceRequestResponse<User>> => {
    try {
      const { data, status } = await this.instance.get(
        `/users/google/update-user/${userId}/${googleId}`
      )

      if (status !== 200) {
        throw new Error(data.message)
      }

      return data
    } catch (err) {
      console.error({
        updateUserErrorMessage: err.message
      })
      return {
        error: err.message
      }
    }
  }
}
