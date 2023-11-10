import OpenAI from 'openai'
import useAssistant from './useAssistant'
import useThread from './useThread'
import { AssistantCreateParams, ThreadCreateParams } from 'openai/resources/beta/index.mjs'
import { useEffect } from 'react'
import { CompletionCreateParamsNonStreaming } from 'openai/resources/completions.mjs'
import { ChatCompletionMessageParam, ImageGenerateParams } from 'openai/resources/index.mjs'
import { MessageContentText } from 'openai/resources/beta/threads/index.mjs'

type Metadata = {
  assistantId: string
}

export default function useConversation(
  openai: OpenAI,
  {
    assistantPayload,
    threadPayload
  }: { assistantPayload: string | AssistantCreateParams; threadPayload: string | ThreadCreateParams },
  handleFunctionCalls: Function
) {
  const assistant = useAssistant(openai, assistantPayload)
  const thread = useThread(openai, threadPayload)

  useEffect(() => {
    ;(async () => {
      if (thread.object && thread.id && !(thread.object.metadata as Metadata).assistantId)
        await openai.beta.threads.update(thread.id, { metadata: { assistantId: assistant.id } })
    })()
  }, [assistant.id, openai.beta.threads, thread.id, thread.object, thread.object?.metadata])

  const sendMessageAndRun = async (content: string, fileIds?: string[]) => {
    if (!thread.object || !thread.id) throw new Error('Thread is null!')
    if (!assistant.object || !assistant.id) throw new Error('Assistant is null!')
    if (thread.status !== 'ready') throw new Error('Thread is not ready!')
    thread.setStatus('loading')
    await thread.sendMessage(content, fileIds)
    const run = await thread.run({ assistant_id: assistant.id }, handleFunctionCalls)
    if (run.status !== 'completed') {
      thread.setStatus('error')
      throw new Error('Run was not completed!')
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
    const image = await openai.images.generate({
      ...body,
      prompt: prompt.choices[0].message.content,
      style: 'vivid'
    })
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
    thread.messages.forEach(message => {
      if ('text' in message.content) {
        messages.push({
          role: 'user',
          content: (message.content as MessageContentText[]).map(con => con.text.value).join(' ')
        })
      }
    })

    return await openai.chat.completions.create({
      ...body,
      messages: messages.toSpliced(0, messages.length > 5 ? messages.length - 5 : 0)
    })
  }

  const deleteConversation = async () => {
    if (!thread.object || !thread.id) throw new Error('Thread is null!')
    if (!assistant.object || !assistant.id) throw new Error('Assistant is null!')
    await openai.beta.assistants.del(
      thread.object && (thread.object.metadata as Metadata).assistantId
        ? (thread.object.metadata as Metadata).assistantId
        : assistant.id
    )
    return await openai.beta.threads.del(thread.id)
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
