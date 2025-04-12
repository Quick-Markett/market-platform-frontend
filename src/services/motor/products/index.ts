import type { AxiosInstance } from 'axios'

import type { Product } from '@/types/models/product'
import type { ServiceRequestResponse } from '@/types/services/serviceRequestResponse'

import type {
  CreateProductPayload,
  DeleteProductByIdPayload,
  GetMarketProductsPayload,
  GetProductByIdPayload,
  UpdateProductByIdPayload
} from './types'

export class Products {
  private instance: AxiosInstance

  constructor(instance: AxiosInstance) {
    this.instance = instance
  }

  getProductById = async ({
    productId
  }: GetProductByIdPayload): Promise<ServiceRequestResponse<Product>> => {
    try {
      const { data, status } = await this.instance.get(
        `/products/${productId.toString()}`
      )

      if (status !== 200) {
        throw new Error(data.message)
      }

      return data
    } catch (getProductByIdErr) {
      console.error({
        getProductByIdErrMessage: getProductByIdErr.message
      })

      return {
        error: getProductByIdErr.message
      }
    }
  }

  getMarketProducts = async ({
    marketId
  }: GetMarketProductsPayload): Promise<ServiceRequestResponse<Product[]>> => {
    try {
      const { data, status } = await this.instance.get(
        `/products/get-market-products/${marketId.toString()}`
      )

      if (status !== 200) {
        throw new Error(data.message)
      }

      return data
    } catch (getMarketProductsErr) {
      console.error({
        getMarketProductsErrMessage: getMarketProductsErr.message
      })

      return {
        data: []
      }
    }
  }

  createProduct = async ({
    payload
  }: CreateProductPayload): Promise<ServiceRequestResponse<Product>> => {
    try {
      const { data, status } = await this.instance.post(`/products`, payload)

      if (status !== 200) {
        throw new Error(data.message)
      }

      return data
    } catch (createProductErr) {
      console.error({
        createProductErrMessage: createProductErr.message
      })

      return {
        error: createProductErr.message
      }
    }
  }

  updateProduct = async ({
    productId
  }: UpdateProductByIdPayload): Promise<ServiceRequestResponse<void>> => {
    try {
      const { data, status } = await this.instance.put(
        `/products/${productId.toString()}`
      )

      if (status !== 200) {
        throw new Error(data.message)
      }
    } catch (updateProductErr) {
      console.error({
        updateProductErrMessage: updateProductErr.message
      })

      return {
        error: updateProductErr.message
      }
    }
  }

  deleteProduct = async ({
    productId
  }: DeleteProductByIdPayload): Promise<ServiceRequestResponse<void>> => {
    try {
      const { data, status } = await this.instance.delete(
        `/products/${productId.toString()}`
      )

      if (status !== 200) {
        throw new Error(data.message)
      }
    } catch (deleteProductErr) {
      console.error({
        deleteProductErrMessage: deleteProductErr.message
      })

      return {
        error: deleteProductErr.message
      }
    }
  }
}
