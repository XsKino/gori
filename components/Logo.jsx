import React from 'react'
import Image from 'next/image'

export default function Logo({ className, src = '/img/gori_logo.png' }) {
  return (
    <div className={className}>
      <div className='relative h-full w-full grid place-items-center select-none'>
        <Image
          src={src}
          height={500}
          width={500}
          alt='Gori Logo'
          className='absolute blur-2xl [animation-duration:5s] animate-spinner-ease-spin -scale-100'
        />
        <Image
          src={src}
          height={500}
          width={500}
          alt='Gori Logo'
          className='h-full w-auto absolute scale-110 blur-3xl animate-pulse'
        />
        <Image
          src={src}
          height={500}
          width={500}
          alt='Gori Logo'
          className='h-full w-auto absolute scale-150 blur-3xl [animation-duration:5s] animate-spinner-ease-spin'
        />
        <Image
          src={src}
          height={500}
          width={500}
          alt='Gori Logo'
          className='h-full w-auto absolute brightness-200 contrast-125 blur-xl opacity-75 animate-pulse'
        />
        <Image
          src={src}
          height={500}
          width={500}
          alt='Gori Logo'
          className='h-full w-auto absolute brightness-200 contrast-0 blur-md opacity-75'
        />
        <Image src={src} height={500} width={500} alt='Gori Logo' className='h-full w-auto absolute' />
      </div>
    </div>
  )
}
