import type { AxiosInstance } from 'axios'
import axios from 'axios'

import { motorApiBaseUrl } from '@/constants/environments/motorApiBaseUrl'
import { motorApiHeaders } from '@/constants/headers/motorApiHeaders'

import { GoogleAuth } from './google'
import { Jwt } from './jwt'
import { SsoAuth } from './sso'

export class Auth {
  private instance: AxiosInstance

  public google: GoogleAuth
  public sso: SsoAuth
  public jwt: Jwt

  constructor() {
    this.instance = axios.create({
      baseURL: motorApiBaseUrl,
      headers: motorApiHeaders
    })

    this.google = new GoogleAuth(this.instance)
    this.sso = new SsoAuth(this.instance)
    this.jwt = new Jwt(this.instance)
  }
}
