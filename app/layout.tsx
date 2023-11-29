/* eslint-disable no-unused-vars */
import '@/styles/globals.css'
import React from 'react'
import Providers from './providers'
import { varelaRound as golbalFont } from '@/styles/fonts'

import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Gori',
  description: 'The best AI-powered Game Master'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='dark'>
      <body className={golbalFont.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
