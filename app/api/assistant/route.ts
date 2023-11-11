import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { AssistantCreateParams } from 'openai/resources/beta/index.mjs'

const openai = new OpenAI({
  dangerouslyAllowBrowser: true,
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: NextRequest) {
  let body
  let response

  try {
    body = await req.json()
  } catch (error) {
    response = error
    return NextResponse.json(response, { status: 400 })
  }

  try {
    response = await openai.beta.assistants.create(body as AssistantCreateParams)
  } catch (error) {
    response = error
    return NextResponse.json(response, { status: 400 })
  }

  return NextResponse.json(response)
}
