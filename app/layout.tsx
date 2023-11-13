import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import BootstrapClient from 'components/BootstrapClient'
import Provider from 'components/Provider'
import { openGraphImage } from './image-metadata'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Rick And Morty Fan Site',
  description:
    'Rick And Morty Fan Site. This is a fan site for Rick And Morty. It is built with Next.js and Bootstrap.',
  openGraph: {
    ...openGraphImage,
    title: 'Rick And Morty',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Provider>
          {children}
          {/* <BootstrapClient /> */}
        </Provider>
      </body>
    </html>
  )
}
