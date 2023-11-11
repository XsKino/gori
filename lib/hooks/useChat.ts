import useAssistant from './useAssistant'
import useThread from './useThread'
import { AssistantCreateParams, ThreadCreateParams } from 'openai/resources/beta/index.mjs'
import { useEffect } from 'react'
import { CompletionCreateParamsNonStreaming } from 'openai/resources/completions.mjs'
import { ChatCompletionMessageParam, ImageGenerateParams } from 'openai/resources/index.mjs'
import { MessageContentText } from 'openai/resources/beta/threads/index.mjs'
import axios from 'axios'

type Metadata = {
  assistantId: string
}

export default function useConversation(
  {
    assistantPayload,
    threadPayload
  }: { assistantPayload: string | AssistantCreateParams; threadPayload: string | ThreadCreateParams },
  handleFunctionCalls: Function
) {
  const assistant = useAssistant(assistantPayload)
  const thread = useThread(threadPayload)

  useEffect(() => {
    ;(async () => {
      if (thread.object && thread.id && !(thread.object.metadata as Metadata).assistantId)
        await axios.put('/api/thread/' + thread.id, {
          metadata: { assistantId: assistant.id }
        })
    })()
  }, [assistant.id, thread.id, thread.object, thread.object?.metadata])

  const sendMessageAndRun = async (content: string, fileIds?: string[]) => {
    if (!thread.object || !thread.id) {
      throw new Error('Thread is null!')
    }
    if (!assistant.object || !assistant.id) {
      throw new Error('Assistant is null!')
    }
    if (thread.status !== 'ready') throw new Error('Thread is not ready!')
    thread.setStatus('loading')
    await thread.sendMessage(content, fileIds)
    const run = await thread.run({ assistant_id: assistant.id }, handleFunctionCalls)
    if (thread.status !== 'ready') {
      thread.setStatus('error')
      throw new Error('Run was not completed!' + JSON.stringify(run))
    }
    thread.setStatus('ready')
    return run
  }

  const generateImages = async (body: ImageGenerateParams & { chatModel: string }) => {
    if (!thread.object || !thread.id) throw new Error('Thread is null!')
    if (!assistant.object || !assistant.id) throw new Error('Assistant is null!')
    if (thread.status !== 'ready') throw new Error('Thread is not ready!')
    if (!thread.messages) throw new Error('No Messages!')
    thread.setStatus('loading')
    const prompt = await generateImagePromptFromMessages({ prompt: body.prompt, model: body.chatModel })
    if (!prompt.choices || !prompt.choices[0].message.content) {
      thread.status = 'error'
      throw new Error('No Choices!')
    }
    const image = (
      await axios.post('/api/image', {
        ...body,
        prompt: prompt.choices[0].message.content,
        style: 'vivid'
      })
    ).data
    thread.setStatus('ready')
    return image
  }

  const generateImagePromptFromMessages = async (body: CompletionCreateParamsNonStreaming) => {
    if (!thread.object || !thread.id) throw new Error('Thread is null!')
    if (!assistant.object || !assistant.id) throw new Error('Assistant is null!')
    if (thread.status !== 'ready') throw new Error('Thread is not ready!')
    if (!thread.messages) throw new Error('No Messages!')
    thread.setStatus('loading')
    const messages: ChatCompletionMessageParam[] = []
    messages.push({
      content: `Your Task is to generate a brief Image Generation Model prompt, describing the story that the user tells you, prioritize the last part of the story, the scene should evoke the same emotion as the story, the artistic style of the image generated should be: ${body.prompt}`,
      role: 'system'
    })
    ;(thread.messages as unknown as MessageContentText[]).forEach((message: MessageContentText) => {
      if ('text' in message) {
        messages.push({
          role: 'user',
          content: message.text.value
        })
      }
    })

    try {
      return (
        await axios.post('/api/image', {
          ...body,
          messages: messages.toSpliced(0, messages.length > 5 ? messages.length - 5 : 0)
        })
      ).data
    } catch (e) {
      thread.setStatus('error')
      throw new Error('Prompt was not generated!' + JSON.stringify(e))
    }
  }

  const deleteConversation = async () => {
    if (!thread.object || !thread.id) throw new Error('Thread is null!')
    if (!assistant.object || !assistant.id) throw new Error('Assistant is null!')
    await axios.delete(
      '/api/assistant/' + thread.object && (thread.object.metadata as Metadata).assistantId
        ? (thread.object.metadata as Metadata).assistantId
        : assistant.id
    )
    return await axios.delete('/api/thread/' + thread.id)
  }

  const releaseStatus = () => thread.setStatus('ready')

  return {
    assistant,
    thread,
    messages: thread.messages,
    status: thread.status,
    sendMessageAndRun,
    generateImages,
    deleteConversation,
    releaseStatus
  }
}
