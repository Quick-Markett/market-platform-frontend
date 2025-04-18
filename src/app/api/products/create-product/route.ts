import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { instanceMotor } from '@/instances/instanceMotor'

export const POST = async (req: NextRequest) => {
  try {
    const { token, payload } = await req.json()

    await instanceMotor.products.createProduct({ token, payload })

    return NextResponse.json(
      { mesesage: 'The product was successfully created!' },
      { status: 201 }
    )
  } catch (createProductError) {
    console.error({
      'POST/api/products/create-product': createProductError.message
    })

    return NextResponse.json(
      { message: createProductError.message },
      { status: 500 }
    )
  }
}
