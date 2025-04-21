import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { instanceMotor } from '@/instances/instanceMotor'

export const GET = async (req: NextRequest) => {
  const slug = req.nextUrl.searchParams.get('slug')

  try {
    const { data: categories } =
      await instanceMotor.categories.getMarketCategories({
        slug
      })

    return NextResponse.json(categories)
  } catch (getMarketCategoriesError) {
    console.error(getMarketCategoriesError)

    return NextResponse.json(
      { message: 'Error! Any market categories not found' },
      { status: 500 }
    )
  }
}
