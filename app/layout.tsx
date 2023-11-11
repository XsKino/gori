import type { Metadata } from 'next'
import { Inter,Oswald } from 'next/font/google'
import './globals.css'
import React from 'react'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })
const montserrat = Oswald ({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'StoryTeller',
  description: 'The best AI-powered engine for creating stories'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={montserrat.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
