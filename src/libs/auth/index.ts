/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

import type { ExtendedUser } from '@/types/@common/global'
import { refreshGoogleAccessToken } from '@/utils/auth/refreshGoogleAccessToken'

import { credentialsOptions } from './credentialsOptions'
import { googleOptions } from './googleOptions'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider(credentialsOptions),
    GoogleProvider(googleOptions)
  ],
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (user && account) {
        const formattedUser = token.user as ExtendedUser

        if (token.provider === 'google') {
          const expiresAt = Number(token.expires_at)
          if (!isNaN(expiresAt)) {
            formattedUser.accessToken = token.access_token as string
            formattedUser.refreshToken = token.refresh_token as string
            formattedUser.accessTokenExpires = expiresAt * 1000
            formattedUser.provider = 'google'
          }
        } else if (token.provider === 'credentials') {
          formattedUser.accessToken = token.token as string
          formattedUser.accessTokenExpires = Date.now() + 24 * 60 * 60 * 1000
          formattedUser.provider = 'credentials'
        }

        return {
          ...token,
          user: token
        }
      }

      const updatedUser = token as unknown as ExtendedUser

      if (updatedUser?.provider === 'google') {
        if (Date.now() < (updatedUser.accessTokenExpires ?? 0)) {
          return {
            ...token,
            user: token
          }
        }

        return await refreshGoogleAccessToken(token.user)
      }

      if (updatedUser?.provider === 'credentials') {
        if (Date.now() < (updatedUser.accessTokenExpires ?? 0)) {
          return {
            ...token,
            user: token
          }
        }

        return {
          ...token,
          error: 'TokenExpired'
        }
      }

      return token
    },
    session: async props => {
      const { session, token } = props
      const user = token.user as ExtendedUser

      session.user = user
      session.token = (token.user as ExtendedUser)?.accessToken
      session.error = token.error as string | undefined

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
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
    updateAge: 24 * 60 * 60
  }
}
