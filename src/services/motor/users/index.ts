import type { AxiosInstance } from 'axios'

import type { User } from '@/types/models/user'
import type { ServiceRequestResponse } from '@/types/services/serviceRequestResponse'

import type { GetUserByEmailPayload, GetUserByIdPayload } from './types'

export class Users {
  private instance: AxiosInstance

  constructor(instance: AxiosInstance) {
    this.instance = instance
  }

  getUserById = async ({
    userId
  }: GetUserByIdPayload): Promise<ServiceRequestResponse<User>> => {
    try {
      const { data, status } = await this.instance.get(
        `/users/${userId.toString()}`
      )

      if (status !== 200) {
        throw new Error(data.message)
      }

      return data
    } catch (getUserByIdErr) {
      console.error({
        getUserByIdErrMessage: getUserByIdErr.message
      })

      return {
        error: getUserByIdErr.message
      }
    }
  }

  getUserByEmail = async ({
    email
  }: GetUserByEmailPayload): Promise<ServiceRequestResponse<User>> => {
    try {
      const { data, status } = await this.instance.get(
        `/users/get-user-by-email/${email.toString()}`
      )

      if (status !== 200) {
        throw new Error(data.message)
      }

      return data
    } catch (getUserByEmailErr) {
      console.error({
        getUserByEmailErrMessage: getUserByEmailErr.message
      })

      return {
        error: getUserByEmailErr.message
      }
    }
  }
}
