import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  dangerouslyAllowBrowser: true,
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY
})

export async function GET(req: NextRequest, { params }: { params: { threadId: string; messageId: string } }) {
  const { threadId, messageId } = params

  let response

  try {
    response = await openai.beta.threads.messages.retrieve(threadId, messageId)
  } catch (error) {
    response = error
    return NextResponse.json(response, { status: 404 })
  }

  return NextResponse.json(response)
}

export async function POST(
  req: NextRequest,
  { params }: { params: { threadId: string; messageId: string } }
) {
  const { threadId, messageId } = params

  let body
  let response

  try {
    body = await req.json()
  } catch (error) {
    response = error
    return NextResponse.json(response, { status: 400 })
  }

  try {
    response = await openai.beta.threads.messages.update(threadId, messageId, body)
  } catch (error) {
    response = error
    return NextResponse.json(response, { status: 404 })
  }

  return NextResponse.json(response)
}
