import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { instanceMotor } from '@/instances/instanceMotor'

export const PUT = async (req: NextRequest) => {
  try {
    const { payload, token } = await req.json()

    await instanceMotor.markets.updateMarket({ token, payload })

    return NextResponse.json(
      { mesesage: 'The market was successfully updated!' },
      { status: 200 }
    )
  } catch (updateMarketErr) {
    console.error({
      'PUT/api/markets/update-market': updateMarketErr.message
    })

    return NextResponse.json(
      { message: updateMarketErr.message },
      { status: updateMarketErr.statusCode }
    )
  }
}
