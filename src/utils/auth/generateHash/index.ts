import { genSalt, hash } from 'bcryptjs'

import type { GenerateHashData } from './types'

export const generateHash = async ({ password }: GenerateHashData) => {
  try {
    const salt = await genSalt()
    const hashedPassword = await hash(password, salt)

    return hashedPassword
  } catch (generateHashErr) {
    console.error(generateHashErr)
  }
}
