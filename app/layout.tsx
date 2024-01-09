import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Thanks Aunt Jill',
  description: 'AI Generated Thank You Cards',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
