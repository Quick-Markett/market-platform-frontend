import type { AxiosInstance } from 'axios'

import type { Market } from '@/types/models/market'
import type { ServiceRequestResponse } from '@/types/services/serviceRequestResponse'

import type {
  CreateMarketPayload,
  DeleteMarketPayload,
  GetMarketByIdPayload,
  GetMarketBySlugPayload,
  UpdateMarketPayload
} from './types'

export class Markets {
  private instance: AxiosInstance

  constructor(instance: AxiosInstance) {
    this.instance = instance
  }

  getAllMarkets = async (): Promise<ServiceRequestResponse<Market[]>> => {
    try {
      const { data, status } = await this.instance.get(`/markets`)

      if (status !== 200) {
        throw new Error(data.message)
      }

      return data
    } catch (getAllMarketsErr) {
      console.error({
        getAllMarketsErrMessage: getAllMarketsErr.message
      })

      return {
        error: getAllMarketsErr.message
      }
    }
  }

  getMarketById = async ({
    marketId
  }: GetMarketByIdPayload): Promise<ServiceRequestResponse<Market>> => {
    try {
      const { data, status } = await this.instance.get(
        `/markets/${marketId.toString()}`
      )

      if (status !== 200) {
        throw new Error(data.message)
      }

      return data
    } catch (getMarketByIdErr) {
      console.error({
        getMarketByIdErrMessage: getMarketByIdErr.message
      })

      return {
        error: getMarketByIdErr.message
      }
    }
  }

  getMarketBySlug = async ({
    slug
  }: GetMarketBySlugPayload): Promise<ServiceRequestResponse<Market>> => {
    try {
      const { data, status } = await this.instance.get(
        `/markets/get-market-by-slug/${slug}`
      )

      if (status !== 200) {
        throw new Error(data.message)
      }

      return data
    } catch (getMarketBySlugErr) {
      console.error({
        getMarketBySlugErrMessage: getMarketBySlugErr.message
      })

      return {
        error: getMarketBySlugErr.message
      }
    }
  }

  createMarket = async ({
    token,
    payload
  }: CreateMarketPayload): Promise<ServiceRequestResponse<Market>> => {
    try {
      const { data, status } = await this.instance.post(
        `http://localhost:3030/markets`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (status !== 201) {
        throw new Error(data.message)
      }

      return data
    } catch (createMarketErr) {
      console.error({
        createMarketErrMessage: createMarketErr.message
      })

      return {
        error: createMarketErr.message
      }
    }
  }

  updateMarket = async ({
    token,
    payload
  }: UpdateMarketPayload): Promise<ServiceRequestResponse<void>> => {
    try {
      const { data, status } = await this.instance.put(
        `/markets/${payload.id.toString()}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (status !== 200) {
        throw new Error(data.message)
      }
    } catch (updateMarketErr) {
      console.error({
        updateMarketErrMessage: updateMarketErr.message
      })

      return {
        error: updateMarketErr.message
      }
    }
  }

  deleteMarket = async ({
    token,
    marketId
  }: DeleteMarketPayload): Promise<ServiceRequestResponse<void>> => {
    try {
      const { data, status } = await this.instance.delete(
        `/markets/${marketId.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (status !== 200) {
        throw new Error(data.message)
      }
    } catch (deleteMarketErr) {
      console.error({
        deleteMarketErrMessage: deleteMarketErr.message
      })

      return {
        error: deleteMarketErr.message
      }
    }
  }
}
