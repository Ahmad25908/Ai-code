import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Plant Identifier',
  description: 'Identify plants using AI powered by Google Gemini',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-b from-green-100 to-green-200 min-h-screen`}>
        <header className="bg-green-800 text-white py-4">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold">Plant Identifier</h1>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-green-800 text-white py-4 mt-8">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 Plant Identifier. Powered by Google Gemini AI.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}