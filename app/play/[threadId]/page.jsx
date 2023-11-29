/* eslint-disable no-unused-vars */
'use client'

import Playground from '@/components/Playground'
import Gori from '@/lib/gori'

import { useState, useEffect } from 'react'
import Loader from '@/components/Loader'
import Error from '@/components/Error'

export default function Play({ params }) {
  const [thread, setThread] = useState(null)

  useEffect(() => {
    const getRole = async () => {
      try {
        const { thread: createdThread } = await Gori.getRole(params.threadId)
        setThread(createdThread)
      } catch {
        setThread('error')
      }
    }
    getRole()
  }, [params.threadId])

  if (!thread)
    return (
      <div className='h-screen grid place-items-center overflow-hidden'>
        <Loader className='h-[60vmin] [animation-duration:1.2s]' />
      </div>
    )

  if (thread === 'error')
    return (
      <div className='h-screen grid place-items-center overflow-hidden'>
        <Error title={`No papu :'v`}>{params.threadId} no es un thread válido</Error>
      </div>
    )

  return <Playground thread={thread} />
}
