/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

import type { User } from '@/types/models/user'

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

      if (user) {
        token.userData = user
      }

      if (trigger === 'update' && session) {
        token.userData = {
          ...token,
          ...session.user
        }
      }

      return token
    },
    session: async props => {
      const { session, token } = props

      session.user = token.userData as User
      session.token = token.token as string

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
