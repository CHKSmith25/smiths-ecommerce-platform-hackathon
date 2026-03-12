import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Smiths Detection - IONSCAN 600',
  description: 'E-commerce platform for IONSCAN 600 trace detection devices',
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
