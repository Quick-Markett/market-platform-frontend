import { AxiosInstance } from 'axios'

import { Market } from '@/types/models/market'
import { ServiceRequestResponse } from '@/types/services/serviceRequestResponse'

import {
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
    payload
  }: CreateMarketPayload): Promise<ServiceRequestResponse<Market>> => {
    try {
      const { data, status } = await this.instance.post(`/markets`, payload)

      if (status !== 200) {
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
    marketId
  }: UpdateMarketPayload): Promise<ServiceRequestResponse<void>> => {
    try {
      const { data, status } = await this.instance.put(
        `/markets/${marketId.toString()}`
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
    marketId
  }: DeleteMarketPayload): Promise<ServiceRequestResponse<void>> => {
    try {
      const { data, status } = await this.instance.delete(
        `/markets/${marketId.toString()}`
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
