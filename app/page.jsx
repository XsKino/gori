/* eslint-disable no-unused-vars */
import { Button } from '@nextui-org/react'
import Image from 'next/image'
import NextLink from 'next/link'

import { cinzelDecorative as displayFont } from '@/styles/fonts'

import Logo from '@/components/Logo'

const Header = () => (
  <header className='h-screen w-screen overflow-hidden flex flex-col md:flex-row pt-[25vmin] md:p-0'>
    <div className='relative grid place-items-center md:aspect-square flex-1'>
      <Logo src='/img/gori_logo.png' className='absolute aspect-square h-[90vmin] max-h-[600px]' />
    </div>
    <section className='z-10 flex-1 flex flex-col gap-3 lg:gap-10 justify-center items-center md:items-start'>
      <div className='relative'>
        <h1
          className={`${displayFont.className} tracking-[0.35em] animate-pulse select-none absolute blur-md md:blur-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-100 text-7xl md:text-8xl xl:text-9xl font-bold`}>
          GORI
        </h1>
        <h1
          className={`${displayFont.className} tracking-[0.35em] bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-100 text-7xl md:text-8xl xl:text-9xl font-bold`}>
          GORI
        </h1>
      </div>
      <h2 className='text-3xl md:text-5xl xl:text-6xl font-bold text-foreground opacity-80'>
        A new way to play
      </h2>
      <div className='flex gap-4'>
        <NextLink
          href='/play'
          className='p-6 lg:p-10 lg:px-16 rounded-none text-2xl md:text-4xl border-4 opacity-80 hover:opacity-100 border-foreground bg-transparent text-foreground hover:border-foreground hover:bg-foreground hover:text-background'>
          Play Now
        </NextLink>
        <NextLink
          href='/app'
          className='p-6 lg:p-10 lg:px-16 rounded-none text-2xl md:text-4xl border-4 opacity-80 hover:opacity-100 border-foreground bg-transparent text-foreground hover:border-foreground hover:bg-foreground hover:text-background'>
          Start from a character
        </NextLink>
      </div>
    </section>
  </header>
)

const Accent = ({ title, children, className }) => (
  <section className={`w-full p-10 py-14 md:p-20 md:py-28 skew-y-3 my-12 ${className}`}>
    <div className='-skew-y-3'>
      <h2 className='text-4xl md:text-5xl xl:text-6xl font-bold text-foreground opacity-80 '>{title}</h2>
      <div className='flex flex-col gap-4'>{children}</div>
    </div>
  </section>
)

export default function Landing() {
  return (
    <main className='overflow-hidden bg-gradient-to-b from-black to-secondary-900 bg-cover bg-fixed flex flex-col gap-4 justify-center items-center'>
      <Header />
      <Accent title='What is Gori?' className='bg-gradient-to-tr from-primary-600 to-primary-300 '>
        <p className='text-2xl md:text-3xl xl:text-4xl font-bold text-foreground opacity-80'>
          Gori is a AI-powered Game Master for tabletop roleplaying games. It is designed to be a tool for
          both players and game masters to help them play and test their games.
        </p>
        <p className='text-2xl md:text-3xl xl:text-4xl font-bold text-foreground opacity-80'>
          Gori is currently in development and is not yet available for public use.
        </p>
      </Accent>
    </main>
  )
}
