import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { instanceMotor } from '@/instances/instanceMotor'

export const POST = async (req: NextRequest) => {
  try {
    const { payload, token } = await req.json()

    await instanceMotor.markets.createMarket({ token, payload })

    return NextResponse.json(
      { mesesage: 'The market was successfully created!' },
      { status: 201 }
    )
  } catch (createMarketErr) {
    console.error({
      'POST/api/markets/create-market': createMarketErr.message
    })

    return NextResponse.json(
      { message: createMarketErr.message },
      { status: createMarketErr.statusCode }
    )
  }
}
