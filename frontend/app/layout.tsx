import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthProvider } from '@/components/AuthProvider'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Boilerplate App - Next.js + NestJS',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex-wrapper">
            <Navigation />
            <main className="container-custom py-4 flex-grow-1">
              {children}
            </main>
            <footer className="bg-dark text-white py-3 footer-class">
              <div className="container text-center">
                <p className="mb-0">Boilerplate Project &copy; {new Date().getFullYear()} - Next.js + NestJS + PostgreSQL</p>
              </div>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
