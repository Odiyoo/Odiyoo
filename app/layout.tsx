import type { Metadata } from 'next'
import './globals.css'
import moment from 'moment'
import 'moment/locale/nl'

moment.locale('nl')

export const metadata: Metadata = {
  title: 'Odiyoo | Uw betrouwbare partner in dakreiniging',
  description: 'Uw betrouwbare partner in dakreiniging en dakrenovaties',
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
