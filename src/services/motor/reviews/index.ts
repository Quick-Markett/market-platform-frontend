import type { AxiosInstance } from 'axios'

import type { Review } from '@/types/models/review'
import type { ServiceRequestResponse } from '@/types/services/serviceRequestResponse'

import type {
  CreateReviewPayload,
  DeleteReviewByIdPayload,
  GetReviewByIdPayload,
  UpdateReviewByIdPayload
} from './types'

export class Reviews {
  private instance: AxiosInstance

  constructor(instance: AxiosInstance) {
    this.instance = instance
  }

  getReviewById = async ({
    reviewId
  }: GetReviewByIdPayload): Promise<ServiceRequestResponse<Review>> => {
    try {
      const { data, status } = await this.instance.get(
        `/reviews/${reviewId.toString()}`
      )

      if (status !== 200) {
        throw new Error(data.message)
      }

      return data
    } catch (getReviewByIdErr) {
      console.error({
        getReviewByIdErrMessage: getReviewByIdErr.message
      })

      return {
        error: getReviewByIdErr.message
      }
    }
  }

  createReview = async ({
    token,
    payload
  }: CreateReviewPayload): Promise<ServiceRequestResponse<Review>> => {
    try {
      const { data, status } = await this.instance.post(`/reviews`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (status !== 200) {
        throw new Error(data.message)
      }

      return data
    } catch (createReviewErr) {
      console.error({
        createReviewErrMessage: createReviewErr.message
      })

      return {
        error: createReviewErr.message
      }
    }
  }

  updateReview = async ({
    token,
    reviewId
  }: UpdateReviewByIdPayload): Promise<ServiceRequestResponse<void>> => {
    try {
      const { data, status } = await this.instance.put(
        `/reviews/${reviewId.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (status !== 200) {
        throw new Error(data.message)
      }
    } catch (updateReviewErr) {
      console.error({
        updateReviewErrMessage: updateReviewErr.message
      })

      return {
        error: updateReviewErr.message
      }
    }
  }

  deleteReview = async ({
    token,
    reviewId
  }: DeleteReviewByIdPayload): Promise<ServiceRequestResponse<void>> => {
    try {
      const { data, status } = await this.instance.delete(
        `/reviews/${reviewId.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (status !== 200) {
        throw new Error(data.message)
      }
    } catch (deleteReviewErr) {
      console.error({
        deleteReviewErrMessage: deleteReviewErr.message
      })

      return {
        error: deleteReviewErr.message
      }
    }
  }
}
