import type { AxiosInstance } from 'axios'
import axios from 'axios'

import { motorApiBaseUrl } from '@/constants/environments/motorApiBaseUrl'
import { motorApiHeaders } from '@/constants/headers/motorApiHeaders'

import { Categories } from './categories'
import { Markets } from './markets'
import { OrderItems } from './orderItems'
import { Orders } from './orders'
import { Products } from './products'
import { Reviews } from './reviews'
import { Users } from './users'

export class Motor {
  private instance: AxiosInstance

  public categories: Categories
  public markets: Markets
  public orderItems: OrderItems
  public orders: Orders
  public products: Products
  public reviews: Reviews
  public users: Users

  constructor() {
    this.instance = axios.create({
      baseURL: motorApiBaseUrl,
      headers: motorApiHeaders
    })

    this.categories = new Categories(this.instance)
    this.markets = new Markets(this.instance)
    this.orderItems = new OrderItems(this.instance)
    this.orders = new Orders(this.instance)
    this.products = new Products(this.instance)
    this.reviews = new Reviews(this.instance)
    this.users = new Users(this.instance)
  }
}
