import axios from 'axios'
import { Assistant, AssistantCreateParams } from 'openai/resources/beta/index.mjs'
import { useState, useEffect, SetStateAction } from 'react'

export default function useAssistant(payload: string | AssistantCreateParams) {
  const [assistant, setAssistant] = useState<Assistant | null>(null)

  useEffect(() => {
    ;(async () => {
      if (typeof payload === 'string') {
        try {
          const assistant = (await axios.get<Assistant>('/api/assistant/' + payload)).data
          setAssistant(assistant as unknown as SetStateAction<Assistant | null>)
        } catch (error) {
          console.error(error)
        }
        return
      }

      if (typeof payload === 'object') {
        try {
          const assistant = (await axios.post<Assistant>('/api/assistant', payload)).data
          setAssistant(assistant as unknown as SetStateAction<Assistant | null>)
        } catch (error) {
          console.error(error)
        }
      }
    })()
  }, [payload])

  return { object: assistant, id: assistant?.id }
}
