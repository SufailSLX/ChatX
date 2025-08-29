import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Name - ""',
  description: 'Modern MERN Chat Application BY SLX.Dev',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
