'use client'

import { useRole } from '@/lib/gori'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import React, { useState } from 'react'

export default function Home() {
  const role = useRole()
  const [message, setMessage] = useState('')

  const submitMessage = () => {
    role.sendMessageAndRun(message)
    setMessage('')
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  return (
    <main className='flex min-h-screen min-w-screen flex-col justify-between gap-16 py-20 md:p-24'>
      <div className='flex-1 bg-[#fff2] md:rounded-lg p-4 flex flex-col-reverse gap-6'>
        {/* {(role.messages as any).data && (role.messages as any).data[0].content[0].text.value} */}
        {role.messages.map((message: any, index: number) => (
          <div key={index} className='flex flex-col gap-4'>
            <div
              className={`flex flex-col md:flex-row gap-2 pl-6 ${
                message.role === 'user' && 'rounded-lg bg-[#0004] p-6'
              }`}>
              <span className='font-bold text-gray-500 w-32 lg:w-1/6'>{message.role}</span>
              <span className='font-bold flex-1'>
                {message.content.map((message: any) => message.text.value).join('\n\n')}
              </span>
              <span className='text-sm text-red-500'>{message.createdAt}</span>
            </div>
          </div>
        ))}
      </div>
      <div className='flex gap-6'>
        <Input
          value={message}
          variant='bordered'
          onChange={onInputChange}
          type='text'
          label='Message'
          placeholder='Ask ksomething!'
        />
        <Button
          isDisabled={role.status !== 'ready'}
          onClick={submitMessage}
          color='primary'
          variant='solid'
          radius='full'>
          {role.status}
        </Button>
      </div>
    </main>
  )
}
