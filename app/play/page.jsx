/* eslint-disable no-unused-vars */
'use client'

import Playground from '@/components/Playground'
import Gori from '@/lib/gori'

import { useState, useEffect } from 'react'
import Loader from '@/components/Loader'

export default function Play() {
  const [thread, setThread] = useState(null)

  useEffect(() => {
    const createRole = async () => {
      const { thread: createdThread } = await Gori.createRole({ assistantName: 'Gori', roleName: 'Test' })
      setThread(createdThread)
    }
    createRole()
  }, [])

  if (!thread)
    return (
      <div className='h-screen grid place-items-center overflow-hidden'>
        <Loader className='h-[60vmin] [animation-duration:1.2s]' />
      </div>
    )

  return <Playground thread={thread} />
}
