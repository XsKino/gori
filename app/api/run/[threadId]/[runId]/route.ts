import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { RunUpdateParams } from 'openai/resources/beta/threads/index.mjs'

const openai = new OpenAI({
  dangerouslyAllowBrowser: true,
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY
})

export async function GET(req: NextRequest, { params }: { params: { threadId: string; runId: string } }) {
  const { threadId, runId } = params
  let response

  try {
    response = await openai.beta.threads.runs.retrieve(threadId, runId)
  } catch (error) {
    response = error
    return NextResponse.json(response, { status: 404 })
  }

  return NextResponse.json(response, { status: 200 })
}

// SUBMIT TOOL OUTPUTS
export async function POST(req: NextRequest, { params }: { params: { threadId: string; runId: string } }) {
  const { threadId, runId } = params

  let body
  let response
  try {
    body = await req.json()
    // eslint-disable-next-line no-eval
  } catch (error) {
    response = error
    return NextResponse.json(response, { status: 400 })
  }

  const { toolOutputs } = body
  console.log('toolOutputs', toolOutputs)
  response = await openai.beta.threads.runs.submitToolOutputs(threadId, runId, {
    tool_outputs: toolOutputs
  })

  return NextResponse.json(response, { status: 200 })
}

export async function PUT(req: NextRequest, { params }: { params: { threadId: string; runId: string } }) {
  const { runId, threadId } = params

  let body
  let response

  try {
    body = await req.json()
  } catch (error) {
    response = error
    return NextResponse.json(response, { status: 400 })
  }

  try {
    response = await openai.beta.threads.runs.update(threadId, runId, body as RunUpdateParams)
  } catch (error) {
    response = error
    return NextResponse.json(response, { status: 404 })
  }

  return NextResponse.json(response)
}

export async function DELETE(req: NextRequest, { params }: { params: { threadId: string; runId: string } }) {
  const { runId, threadId } = params

  let response

  try {
    response = await openai.beta.threads.runs.cancel(threadId, runId)
  } catch (error) {
    response = error
    return NextResponse.json(response, { status: 404 })
  }

  return NextResponse.json(response)
}
