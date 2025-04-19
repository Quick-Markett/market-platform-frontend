export async function refreshGoogleAccessToken(token) {
  try {
    const url = `https://oauth2.googleapis.com/token?client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${token.refreshToken}`

    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: 'POST'
    })

    const refreshedTokens = await res.json()

    if (!res.ok) throw refreshedTokens

    return {
      ...token,
      token: refreshedTokens.id_token,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken
    }
  } catch (error) {
    console.error('Error refreshing access token', error)
    return {
      ...token,
      error: 'RefreshAccessTokenError'
    }
  }
}
