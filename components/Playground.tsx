'use client'

import React, { useState } from 'react'
import { Thread } from 'openai/resources/beta/index.mjs'
import { useRole } from '@/lib/gori'

import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { Skeleton } from '@nextui-org/skeleton'
import { RiSendPlaneFill } from 'react-icons/ri'
import { ImSad2 } from 'react-icons/im'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const inputPlaceholders = [
  'Placeholder message',
  'I wish to be a hero',
  'I wish to be a villain',
  "Wouldn't it be cool if I could fly?",
  'I want to be a wizard',
  'Make me fight a dragon',
  'Here is a list of items I want to buy:',
  'Maybe I should buy a sword',
  'I want to buy a sword',
  'Can I sell my sword?',
  'Can I eat the sword?',
  'Hmmph, I want to eat the sword',
  "So... where's the princess?",
  'I want to be a princess',
  'Maybe this rock is edible',
  "Please, don't eat the rock",
  'I want to be a rock',
  "Get in the car, loser, we're going shopping",
  'Hold my beer',
  'I was an adventurer too, until I took an arrow to the knee',
  'What is the meaning of life?',
  'What is the meaning of death?',
  'What did you say about my mother?',
  'I want to be a god',
  'I should get a pet',
  'Enter your message here',
  'I want to be a cat',
  'Prompt',
  'Ask the Game Master',
  'Talk to the Game Master',
  'What is the Game Master?',
  'Maybe I should kiss the Game Master'
]

export default function Playground({ thread }: { thread: Thread }) {
  const role = useRole(thread)
  const [message, setMessage] = useState('')
  const [placeholder, setPlaceholder] = useState('Message')

  const submitMessage = () => {
    role.sendMessageAndRun(message)
    setMessage('')
    setPlaceholder(inputPlaceholders[Math.floor(Math.random() * inputPlaceholders.length)])
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  return (
    <main className='flex bg-gradient-to-t from-background to-black h-screen flex-col justify-between gap-0 md:gap-4 md:p-9 md:px-24'>
      <h1 className='text-3xl flex justify-between'>
        <span>
          {typeof role.thread.object?.metadata === 'object' &&
            role.thread.object?.metadata &&
            (role.thread.object?.metadata as { roleName: string }).roleName}
        </span>
        <span className='opacity-20'>{role.thread.id}</span>
      </h1>
      <div className='flex-1 bg-[#fff2] md:rounded-lg p-4 flex flex-col-reverse gap-6 overflow-y-auto'>
        {role.messages.map((message: any, index: number) => (
          <div key={index} className='flex flex-col gap-4'>
            <div
              className={`flex flex-col md:flex-row gap-2 pl-6 ${
                message.role === 'user' && 'rounded-lg bg-[#0004] p-6'
              }`}>
              <span className='font-bold text-gray-500 w-32 lg:w-1/6'>
                {message.role === 'user' ? 'user' : role.assistant.object?.name}
              </span>
              <span className='font-bold flex-1'>
                {message.content.map((message: any) => message.text.value).join('\n\n')}
              </span>
              <span className='text-sm text-red-500'>{message.createdAt}</span>
            </div>
          </div>
        ))}
      </div>
      {role.status === 'starting' ? (
        <Skeleton />
      ) : (
        <div className='flex gap-6 p-6 md:p-0 h-22 md:h-16'>
          <Input
            value={message}
            variant='bordered'
            onChange={onInputChange}
            type='text'
            placeholder={placeholder}
            className='flex-1'
            classNames={{
              inputWrapper: 'h-full'
            }}
          />
          <Button
            isDisabled={role.status !== 'ready'}
            onClick={submitMessage}
            color='primary'
            variant='shadow'
            radius='full'
            className='h-full aspect-square w-8 md:w-16 text-xl md:text-3xl grid place-items-center text-foreground'
            isIconOnly>
            {role.status === 'ready' && <RiSendPlaneFill />}
            {(role.status === 'generating' || role.status === 'loading') && (
              <i className='animate-spinner-ease-spin [animation-duration:.6s]'>
                <AiOutlineLoading3Quarters />
              </i>
            )}
            {role.status === 'error' && <ImSad2 />}
          </Button>
        </div>
      )}
    </main>
  )
}
