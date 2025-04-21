import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { instanceMotor } from '@/instances/instanceMotor'

export const DELETE = async (req: NextRequest) => {
  try {
    const token = req.nextUrl.searchParams.get('token')
    const category_id = parseInt(req.nextUrl.searchParams.get('category_id'))

    await instanceMotor.categories.deleteCategory({ token, category_id })

    return NextResponse.json(
      { mesesage: 'The category was successfully deleted!' },
      { status: 200 }
    )
  } catch (deleteCategoryErr) {
    console.error({
      'DELETE/api/categories/delete-category': deleteCategoryErr.message
    })

    return NextResponse.json(
      { message: deleteCategoryErr.message },
      { status: 500 }
    )
  }
}
