import OpenAI from 'openai'
import { Thread, ThreadCreateParams } from 'openai/resources/beta/index.mjs'
import { RunCreateParams, ThreadMessage } from 'openai/resources/beta/threads/index.mjs'
import { useEffect, useState } from 'react'

export default function useThread(openai: OpenAI, payload: string | ThreadCreateParams) {
  const [thread, setThread] = useState<Thread | null>(null)
  const [messages, setMessages] = useState<ThreadMessage[]>([])
  const [status, setStatus] = useState<'starting' | 'loading' | 'ready' | 'error'>('starting')

  useEffect(() => {
    ;(async () => {
      if (typeof payload === 'string') {
        const thread = await openai.beta.threads.retrieve(payload)
        setThread(thread)
        setStatus('ready')
        return
      }

      if (typeof payload === 'object') {
        const thread = await openai.beta.threads.create(payload)
        setThread(thread)
        setStatus('ready')
      }
    })()
  }, [openai.beta.threads, payload])

  const sendMessage = async (content: string, fileIds?: string[]) => {
    if (!thread) throw new Error('Thread is null!')
    if (status !== 'ready') throw new Error('Thread is not ready!')
    setStatus('loading')
    const response = await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content,
      file_ids: fileIds
    })
    setMessages(prev => [...prev, response])
    setStatus('ready')
    return response
  }

  const waitForRun = async (runId: string, pollInterval: number, handleFunctionCalls: Function) => {
    if (!thread) throw new Error('Thread is null!')
    const getRun = async () => openai.beta.threads.runs.retrieve(thread.id, runId)
    let run = await getRun()
    if (run.status === 'completed') return run
    setStatus('loading')
    while (
      run.status !== 'completed' &&
      run.status !== 'expired' &&
      run.status !== 'failed' &&
      run.status !== 'cancelled'
    ) {
      await new Promise(resolve => setTimeout(resolve, pollInterval))
      run = await getRun()

      if (run.status === 'requires_action')
        await openai.beta.threads.runs.submitToolOutputs(thread.id, run.id, {
          tool_outputs: handleFunctionCalls(run.required_action?.submit_tool_outputs.tool_calls)
        })
    }
    setStatus('ready')
    return run
  }

  const run = async (params: RunCreateParams, handleFunctionCalls: Function) => {
    if (!thread) throw new Error('Thread is null!')
    if (status !== 'ready') throw new Error('Thread is not ready!')
    setStatus('loading')
    const run = await openai.beta.threads.runs.create(thread.id, params)
    await waitForRun(run.id, 100, handleFunctionCalls)
    setStatus('ready')
    return run
  }

  return { object: thread, id: thread?.id, sendMessage, run, messages, status, setStatus }
}
