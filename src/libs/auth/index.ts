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
      if (account && user) {
        token.user = user
        const formattedUser = token.user as ExtendedUser

        if (account.provider === 'google') {
          const expiresAt = Number(account.expires_at)
          if (!isNaN(expiresAt)) {
            formattedUser.accessToken = account.access_token
            formattedUser.refreshToken = account.refresh_token
            formattedUser.accessTokenExpires = expiresAt * 1000
            formattedUser.provider = 'google'
          }
        } else if (account.provider === 'credentials') {
          formattedUser.accessToken = user.token
          formattedUser.accessTokenExpires = Date.now() + 24 * 60 * 60 * 1000
          formattedUser.provider = 'credentials'
        }

        return token
      }

      const updatedUser = token.user as ExtendedUser

      if (updatedUser?.provider === 'google') {
        if (Date.now() < (updatedUser.accessTokenExpires ?? 0)) {
          return token
        }

        return await refreshGoogleAccessToken(token.user)
      }

      if (updatedUser?.provider === 'credentials') {
        if (Date.now() < (updatedUser.accessTokenExpires ?? 0)) {
          return token
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
