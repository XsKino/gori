import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  dangerouslyAllowBrowser: true,
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: NextRequest) {
  let response
  let body

  try {
    body = await req.json()
  } catch (error) {
    console.error(error)
    response = error
    return NextResponse.json(error, { status: 400 })
  }

  try {
    response = await openai.chat.completions.create(body)
    return NextResponse.json(response, { status: 200 })
  } catch (e) {
    console.error(e)
    return NextResponse.json(e, { status: 500 })
  }
}
