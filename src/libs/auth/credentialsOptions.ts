import { DEFAULT_USER_DATA } from '@/components/common/AuthForm/SignUpForm/data'
import { auth } from '@/instances/instanceAuth'
import { getUserSession } from '@/utils/auth/getUserSession'

import { credentialsSchema } from './schemas'

export const credentialsOptions = {
  id: 'credentials',
  name: 'credentials',
  credentials: {
    email: {
      label: 'email',
      type: 'email'
    },
    password: {
      label: 'password',
      type: 'password'
    },
    name: {
      label: 'username',
      type: 'text'
    }
  },
  async authorize(credentials) {
    const parsedCredentials = credentialsSchema.safeParse(credentials)
    if (!parsedCredentials.success) {
      throw new Error('Credenciais inválidas')
    }
    const { email, password, name, action } = parsedCredentials.data

    const user = await getUserSession()
    if (user && user.id) {
      return { id: user.id, ...user }
    }

    if (!user) {
      try {
        if (action === 'signIn') {
          const { data: userData, error } = await auth.sso.loginUser({
            email,
            password
          })

          if (userData && !error) {
            return {
              ...userData,
              id: userData.user.id,
              token: userData.token
            }
          }
        }

        if (action === 'signUp') {
          const { password } = credentials

          const { data: createdUserData } = await auth.sso.createUser({
            ...DEFAULT_USER_DATA,
            email,
            name,
            password
          })

          if (createdUserData) {
            const { data: loginData, error: loginError } =
              await auth.sso.loginUser({
                email,
                password
              })

            if (loginData && !loginError) {
              return {
                ...loginData,
                id: loginData.user.id,
                token: loginData.token
              }
            }
          }
        }
      } catch (error) {
        console.error({
          credentialsOptionsErrorMessage: error.message
        })
      }
    }

    return {
      id: user.id,
      ...user
    }
  }
}
