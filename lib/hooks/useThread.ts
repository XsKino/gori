import axios from 'axios'
import { Thread, ThreadCreateParams } from 'openai/resources/beta/index.mjs'
import { MessageContentText, RunCreateParams } from 'openai/resources/beta/threads/index.mjs'
import { useEffect, useState } from 'react'

export default function useThread(payload: string | ThreadCreateParams) {
  const [thread, setThread] = useState<Thread | null>(null)
  const [messages, setMessages] = useState<MessageContentText[]>([])
  const [status, setStatus] = useState<'starting' | 'loading' | 'generating' | 'ready' | 'error'>('starting')

  useEffect(() => {
    ;(async () => {
      if (typeof payload === 'string') {
        try {
          const thread = (await axios.get<Thread>('/api/thread/' + payload)).data
          setThread(thread)
          setStatus('ready')
        } catch (error) {
          setStatus('error')
          console.error(error)
        }
        return
      }

      if (typeof payload === 'object') {
        try {
          const thread = (await axios.post<Thread>('/api/thread', payload)).data
          setThread(thread)
          setStatus('ready')
        } catch (error) {
          setStatus('error')
          console.error(error)
        }
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateMessages = async () => {
    if (!thread) throw new Error('Thread is null!')
    try {
      const messages = (await axios.get('/api/message/' + thread.id)).data
      setMessages(!messages ? messages : (messages as any).data)
    } catch (error) {
      console.error(error)
    }
  }

  const sendMessage = async (content: string, fileIds?: string[]) => {
    if (!thread) throw new Error('Thread is null!')
    if (status !== 'ready') throw new Error('Thread is not ready!')
    setStatus('loading')
    try {
      const response = (
        await axios.post('/api/message/' + thread.id, {
          content,
          fileIds
        })
      ).data
      await updateMessages()
      setStatus('ready')
      return response
    } catch (error) {
      setStatus('error')
      console.error(error)
    }
  }

  const waitForRun = async (runId: string, pollInterval: number, handleFunctionCalls: Function) => {
    if (!thread) throw new Error('Thread is null!')
    const getRun = async () => (await axios.get('/api/run/' + thread.id + '/' + runId)).data
    let run

    try {
      run = await getRun()
    } catch (error) {
      console.error('Error in getRun:', error)
    }

    if (run?.status === 'completed') return run
    setStatus('generating')
    let functionsWereCalled = false
    while (
      run?.status !== 'completed' &&
      run?.status !== 'expired' &&
      run?.status !== 'failed' &&
      run?.status !== 'cancelled'
    ) {
      try {
        await new Promise(resolve => setTimeout(resolve, pollInterval))
        run = await getRun()

        if (
          run.status === 'requires_action' &&
          run.required_action.type === 'submit_tool_outputs' &&
          !functionsWereCalled
        ) {
          try {
            console.log('Submitting tool outputs...', handleFunctionCalls)
            // submit function output
            functionsWereCalled = true
            await axios.post('/api/run/' + thread.id + '/' + runId, {
              run,
              handleFunctionCalls
            })
          } catch (error) {
            console.error('Error in axios.post:', error)
          }
        }
      } catch (error) {
        setStatus('error')
        console.error('Error in while loop:', error)
      }
    }
    setStatus('ready')
    return run
  }

  const run = async (params: RunCreateParams, handleFunctionCalls: Function) => {
    if (!thread) throw new Error('Thread is null!')
    if (status !== 'ready') throw new Error('Thread is not ready!')
    setStatus('loading')
    try {
      const run = (await axios.post('/api/run/' + thread.id, params)).data
      await waitForRun(run.id, 100, handleFunctionCalls)
      await updateMessages()
      setStatus('ready')
      return run
    } catch (error) {
      setStatus('error')
      console.error(error)
    }
  }

  return { object: thread, id: thread?.id, sendMessage, run, messages, status, setStatus }
}
