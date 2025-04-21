import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { instanceMotor } from '@/instances/instanceMotor'

export const DELETE = async (req: NextRequest) => {
  try {
    const token = req.nextUrl.searchParams.get('token')
    const product_id = parseInt(req.nextUrl.searchParams.get('product_id'))

    await instanceMotor.products.deleteProduct({ token, product_id })

    return NextResponse.json(
      { mesesage: 'The product was successfully deleted!' },
      { status: 200 }
    )
  } catch (deleteProductErr) {
    console.error({
      'DELETE/api/products/delete-product': deleteProductErr.message
    })

    return NextResponse.json(
      { message: deleteProductErr.message },
      { status: 500 }
    )
  }
}
