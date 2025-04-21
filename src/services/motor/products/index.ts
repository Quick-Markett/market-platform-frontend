import type { AxiosInstance } from 'axios'

import { instanceMotor } from '@/instances/instanceMotor'
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
    product_id
  }: GetProductByIdPayload): Promise<ServiceRequestResponse<Product>> => {
    try {
      const { data, status } = await this.instance.get(
        `/products/${product_id.toString()}`
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
    slug
  }: GetMarketProductsPayload): Promise<ServiceRequestResponse<Product[]>> => {
    try {
      const { data: marketData, error } =
        await instanceMotor.markets.getMarketBySlug({ slug })

      if (error) {
        throw new Error(error)
      }

      const { data, status } = await this.instance.get(
        `/products/get-market-products/${marketData.id.toString()}`
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
    token,
    payload
  }: CreateProductPayload): Promise<ServiceRequestResponse<Product>> => {
    try {
      const { data, status } = await this.instance.post(`/products`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(status)

      if (status !== 201) {
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
    token,
    payload
  }: UpdateProductByIdPayload): Promise<ServiceRequestResponse<void>> => {
    try {
      const { data, status } = await this.instance.put(
        `/products/${payload.id.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
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
    token,
    product_id
  }: DeleteProductByIdPayload): Promise<ServiceRequestResponse<void>> => {
    try {
      const { data, status } = await this.instance.delete(
        `/products/${product_id.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
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
