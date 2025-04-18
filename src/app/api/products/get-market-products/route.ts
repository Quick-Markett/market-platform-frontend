import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { instanceMotor } from '@/instances/instanceMotor'

export const GET = async (req: NextRequest) => {
  const slug = req.nextUrl.searchParams.get('slug')

  try {
    const { data: products } = await instanceMotor.products.getMarketProducts({
      slug
    })

    return NextResponse.json(products)
  } catch (getMarketProductsError) {
    console.error(getMarketProductsError)

    return NextResponse.json(
      { message: 'Error! Any market products not found' },
      { status: 500 }
    )
  }
}
