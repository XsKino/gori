'use client'

import { Image } from '@nextui-org/react'

export default function Error({ title, children, className }) {
  return (
    <div className={`flex flex-col md:flex-row p-6 gap-6 rounded-3xl ${className}`}>
      <Image
        src='/img/error/image.png'
        width={500}
        height={500}
        alt='Error'
        className='aspect-square rounded-lg min-h-[70vmin]'
      />
      <div className='flex flex-1 flex-col gap-6'>
        <h1 className='text-4xl md:text-6xl font-bold text-foreground'>{title}</h1>
        <p className='text-2xl md:text-4xl text-foreground'>{children}</p>
      </div>
    </div>
  )
}
