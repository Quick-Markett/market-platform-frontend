import jwt from 'jsonwebtoken'

import { secretSsoToken } from '@/constants/environments/ssoToken'

export async function refreshGoogleAccessToken(token) {
  try {
    const url = `https://oauth2.googleapis.com/token?client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${token.refreshToken}`

    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: 'POST'
    })

    const refreshedTokens = await res.json()

    if (!res.ok) throw refreshedTokens

    const decodedToken = jwt.decode(refreshedTokens.id_token, {
      complete: true
    })

    if (decodedToken && decodedToken.payload) {
      const updatedPayload = { ...decodedToken.payload, id: token.id }

      const newJwt = jwt.sign(updatedPayload, secretSsoToken)

      return {
        ...token,
        token: newJwt,
        accessToken: refreshedTokens.access_token,
        accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
        refreshToken: refreshedTokens.refresh_token ?? token.refreshToken
      }
    }
  } catch (error) {
    console.error('Error refreshing access token', error)
    return {
      ...token,
      error: 'RefreshAccessTokenError'
    }
  }
}
