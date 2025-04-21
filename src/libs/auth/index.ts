/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

import type { User } from '@/types/models/user'
import { refreshGoogleAccessToken } from '@/utils/auth/refreshGoogleAccessToken'

import { credentialsOptions } from './credentialsOptions'
import { googleOptions } from './googleOptions'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider(credentialsOptions),
    GoogleProvider(googleOptions)
  ],
  callbacks: {
    jwt: async data => {
      const { user, token, trigger, session } = data

      let userData: User

      if (user) {
        userData = user as unknown as User
      } else if (token.userData) {
        userData = token.userData as User
      } else {
        userData = {} as User
      }

      // const { data: updatedToken } = await auth.jwt.validateAndRefreshToken({
      //   token: userData.token,
      //   refresh_token: userData.refreshToken
      // })

      if (userData?.google_id) {
        const response = await refreshGoogleAccessToken(userData)
        userData = response
      }

      if (trigger === 'update' && session) {
        userData = {
          ...userData,
          ...session,
          error: null
        }
      }

      token.userData = userData
      return token
    },
    session: async props => {
      const { session, token: jwt } = props

      const { userData } = jwt

      session.user = userData

      return Promise.resolve(session)
    },
    redirect: async ({ url, baseUrl }) => {
      return url.startsWith(baseUrl) ? url : baseUrl
    }
  },
  pages: {
    signIn: '/',
    error: '/mercados'
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  }
}
