/* eslint-disable no-unused-vars */
import { NextRequest, NextResponse } from 'next/server'
import { Story, StoryBlock, StoryRequest } from '@/types/engine'
import { User } from '@/types/storyteller'
import engine from '@/lib/engine'

// When someone makes a PUT request to /engine route, we will take the payload, which will be a 'Story' object, decompose it, process it with OpenAI, and return an array
// of new blocks of Story to the client so then the client can update the story with one or more of the new blocks.
export async function PUT(request: StoryRequest) {
  console.log('request <----------------------------------------------------------------------------')

  const body = await request.json()
  const requestHeaders = new Headers(request.headers)
  const apiKey = requestHeaders.get('apiKey')

  // check if the body is a valid StoryRequest object and if the apiKey is valid
  const valid = engine.validateRequest(body)
  if (valid !== true) {
    return NextResponse.json({ error: valid }, { status: 400 })
  }
  if (!(await engine.validateApiKey(apiKey))) {
    return NextResponse.json({ error: 'Invalid API key' }, { status: 401 })
  }

  return NextResponse.json({ prompt: engine.buildSystemPrompt(body.story) }, { status: 200 })
}
