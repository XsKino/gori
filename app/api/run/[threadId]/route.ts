import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { RunCreateParams } from 'openai/resources/beta/threads/index.mjs'

const openai = new OpenAI({
  dangerouslyAllowBrowser: true,
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: NextRequest, { params }: { params: { threadId: string } }) {
  const { threadId } = params

  let body
  let response

  try {
    body = await req.json()
  } catch (error) {
    response = error
    return NextResponse.json(response, { status: 400 })
  }

  try {
    response = await openai.beta.threads.runs.create(threadId, body as RunCreateParams)
  } catch (error) {
    response = error
    return NextResponse.json(response, { status: 404 })
  }

  return NextResponse.json(response)
}
