import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ParthThreads',
  description: 'Connect with like-minded people in vibrant communities.',
  generator: 'Parth Chauhan',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
