import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { MessageCreateParams } from 'openai/resources/beta/threads/index.mjs'

const openai = new OpenAI({
  dangerouslyAllowBrowser: true,
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY
})

export async function GET(req: NextRequest, { params }: { params: { threadId: string } }) {
  const { threadId } = params

  let response

  try {
    response = await openai.beta.threads.messages.list(threadId)
  } catch (error) {
    response = error
    return NextResponse.json(response, { status: 404 })
  }

  return NextResponse.json(response)
}

export async function POST(req: NextRequest, { params }: { params: { threadId: string } }) {
  const { threadId } = params
  console.log('message route threadId', threadId)

  let body
  let response

  try {
    body = await req.json()
  } catch (error) {
    response = error
    return NextResponse.json(response, { status: 400 })
  }

  try {
    response = await openai.beta.threads.messages.create(threadId, {
      content: body.content,
      file_ids: body.fileIds,
      role: 'user'
    } as MessageCreateParams)
  } catch (error) {
    return NextResponse.json(error, { status: 404 })
  }

  return NextResponse.json(response)
}
