// app/layout.tsx
import Link from 'next/link'
import './globals.css'

export const metadata = {
  title: 'TrustHouse',
  description: 'Created by',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
