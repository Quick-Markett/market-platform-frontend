import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { instanceMotor } from '@/instances/instanceMotor'

export const PUT = async (req: NextRequest) => {
  try {
    const { payload, token } = await req.json()

    await instanceMotor.products.updateProduct({ payload, token })

    return NextResponse.json(
      { mesesage: 'The product was successfully updated!' },
      { status: 200 }
    )
  } catch (updateProductErr) {
    console.error({
      'PUT/api/products/update-product': updateProductErr.message
    })

    return NextResponse.json(
      { message: updateProductErr.message },
      { status: 500 }
    )
  }
}
