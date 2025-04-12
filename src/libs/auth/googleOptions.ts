import { auth } from '@/instances/instanceAuth'
import { getUserSession } from '@/utils/auth/getUserSession'

export const googleOptions = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  async profile(profile) {
    const user = await getUserSession()

    const { sub: googleId, email, picture, given_name, family_name } = profile

    if (!user) {
      try {
        const { data: userData, error } = await auth.google.loginUser({
          googleId
        })

        if (userData && !error) {
          return {
            id: userData.id,
            ...userData
          }
        }

        const { data: createdUserData } = await auth.google.createUser({
          email,
          name: `${given_name} ${family_name}`,
          profile_picture: picture,
          google_id: googleId,
          address: '',
          city: '',
          password: '',
          state: ''
        })

        if (createdUserData) {
          const { data: loginData, error: loginError } =
            await auth.google.loginUser({
              googleId
            })

          if (loginData && !loginError) {
            return {
              ...loginData
            }
          }
        }
      } catch (error) {
        console.error({
          googleOptionsErrorMessage: error.message
        })
      }
    }

    return {
      id: user.id || googleId,
      ...user
    }
  }
}
