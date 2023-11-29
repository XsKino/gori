/* eslint-disable no-unused-vars */
import { Button } from '@nextui-org/react'
import Image from 'next/image'

const Logo = ({ className }) => (
  <div className={className}>
    <div className='relative h-full w-full grid place-items-center select-none'>
      <Image
        src='/img/gori_logo.png'
        height={500}
        width={500}
        alt='Gori Logo'
        className='absolute blur-2xl'
      />
      <Image
        src='/img/gori_logo.png'
        height={500}
        width={500}
        alt='Gori Logo'
        className='h-full w-auto absolute scale-110 blur-3xl'
      />
      <Image
        src='/img/gori_logo.png'
        height={500}
        width={500}
        alt='Gori Logo'
        className='h-full w-auto absolute scale-150 blur-3xl'
      />
      <Image
        src='/img/gori_logo.png'
        height={500}
        width={500}
        alt='Gori Logo'
        className='h-full w-auto absolute brightness-200 contrast-125 blur-xl opacity-75'
      />
      <Image
        src='/img/gori_logo.png'
        height={500}
        width={500}
        alt='Gori Logo'
        className='h-full w-auto absolute brightness-200 contrast-0 blur-md opacity-75'
      />
      <Image
        src='/img/gori_logo.png'
        height={500}
        width={500}
        alt='Gori Logo'
        className='h-full w-auto absolute'
      />
    </div>
  </div>
)

export default function Landing() {
  return (
    <main className='bg-[url("/img/landing/bg.jpg")] bg-cover bg-fixed flex flex-col gap-4 justify-center items-center'>
      <section className='h-screen w-screen relative grid place-items-center overflow-hidden'>
        <Logo className='absolute aspect-square h-[90vmin] max-h-[600px]' />
      </section>
    </main>
  )
}
