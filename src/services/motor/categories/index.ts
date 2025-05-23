import type { AxiosInstance } from 'axios'

import type { Category } from '@/types/models/category'
import type { ServiceRequestResponse } from '@/types/services/serviceRequestResponse'

import type {
  CreateCategoryPayload,
  DeleteCategoryPayload,
  GetCategoryByIdPayload,
  GetMarketCategoriesPayload,
  UpdateCategoryPayload
} from './types'

export class Categories {
  private instance: AxiosInstance

  constructor(instance: AxiosInstance) {
    this.instance = instance
  }

  getCategoryById = async ({
    token,
    category_id
  }: GetCategoryByIdPayload): Promise<ServiceRequestResponse<Category>> => {
    try {
      const { data, status } = await this.instance.get(
        `/categories/${category_id.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (status !== 200) {
        throw new Error(data.message)
      }

      return data
    } catch (getCategoryByIdErr) {
      console.error({
        getCategoryByIdErrMessage: getCategoryByIdErr.message
      })

      return {
        error: getCategoryByIdErr.message
      }
    }
  }

  getMarketCategories = async ({
    slug
  }: GetMarketCategoriesPayload): Promise<
    ServiceRequestResponse<Category[]>
  > => {
    try {
      const { data, status } = await this.instance.get(
        `/categories/get-market-categories/${slug.toString()}`
      )

      if (status !== 200) {
        throw new Error(data.message)
      }

      return data
    } catch (getMarketCategoriesErr) {
      console.error({
        getMarketCategoriesErrMessage: getMarketCategoriesErr.message
      })

      return {
        data: []
      }
    }
  }

  createCategory = async ({
    token,
    payload
  }: CreateCategoryPayload): Promise<ServiceRequestResponse<Category>> => {
    try {
      const { data, status } = await this.instance.post(
        `/categories`,
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

      return data
    } catch (createCategoryErr) {
      console.error({
        createCategoryErrMessage: createCategoryErr.message
      })

      return {
        error: createCategoryErr.message
      }
    }
  }

  updateCategory = async ({
    token,
    payload
  }: UpdateCategoryPayload): Promise<ServiceRequestResponse<void>> => {
    try {
      const { data, status } = await this.instance.put(
        `/categories/${payload.id}`,
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
    } catch (updateCategoryErr) {
      console.error({
        updateCategoryErrMessage: updateCategoryErr.message
      })

      return {
        error: updateCategoryErr.message
      }
    }
  }

  deleteCategory = async ({
    token,
    category_id
  }: DeleteCategoryPayload): Promise<ServiceRequestResponse<void>> => {
    try {
      const { data, status } = await this.instance.delete(
        `/categories/${category_id.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (status !== 200) {
        throw new Error(data.message)
      }
    } catch (deleteCategoryErr) {
      console.error({
        deleteCategoryErrMessage: deleteCategoryErr.message
      })

      return {
        error: deleteCategoryErr.message
      }
    }
  }
}
