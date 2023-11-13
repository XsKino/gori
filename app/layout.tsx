/* eslint-disable no-unused-vars */
import type { Metadata } from 'next'
import { Inter, Oswald } from 'next/font/google'
import './globals.css'
import React from 'react'
import Providers from './providers'
const inter = Inter({ subsets: ['latin'] })
const montserrat = Oswald({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gori',
  description: 'The best AI-powered Dungeon Master'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='dark'>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
