import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { instanceMotor } from '@/instances/instanceMotor'

export const PUT = async (req: NextRequest) => {
  try {
    const { payload, token } = await req.json()

    await instanceMotor.categories.updateCategory({ payload, token })

    return NextResponse.json(
      { mesesage: 'The category was successfully updated!' },
      { status: 200 }
    )
  } catch (updateCategoryErr) {
    console.error({
      'PUT/api/categories/update-category': updateCategoryErr.message
    })

    return NextResponse.json(
      { message: updateCategoryErr.message },
      { status: 500 }
    )
  }
}
