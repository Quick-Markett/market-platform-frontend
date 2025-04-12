import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { instanceMotor } from '@/instances/instanceMotor'

export const POST = async (req: NextRequest) => {
  try {
    const { payload, token } = await req.json()

    await instanceMotor.categories.createCategory({ token, payload })

    return NextResponse.json(
      { mesesage: 'The category was successfully created!' },
      { status: 201 }
    )
  } catch (createCategoryErr) {
    console.error({
      'POST/api/categories/create-category': createCategoryErr.message
    })

    return NextResponse.json(
      { message: createCategoryErr.message },
      { status: createCategoryErr.statusCode }
    )
  }
}
