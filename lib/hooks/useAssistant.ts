import OpenAI from 'openai'
import { Assistant, AssistantCreateParams } from 'openai/resources/beta/index.mjs'
import { useState, useEffect } from 'react'

export default function useAssistant(openai: OpenAI, payload: string | AssistantCreateParams) {
  const [assistant, setAssistant] = useState<Assistant | null>(null)

  useEffect(() => {
    ;(async () => {
      if (typeof payload === 'string') {
        const assistant = await openai.beta.assistants.retrieve(payload)
        setAssistant(assistant)
        return
      }

      if (typeof payload === 'object') {
        const assistant = await openai.beta.assistants.create(payload)
        setAssistant(assistant)
      }
    })()
  }, [openai.beta.assistants, payload])

  return { object: assistant, id: assistant?.id }
}
