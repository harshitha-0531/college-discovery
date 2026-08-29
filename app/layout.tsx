import type { Metadata } from "next"
import Link from "next/link"
import "./globals.css"

export const metadata: Metadata = {
  title: "College Discovery Platform",
  description: "Find, compare, and predict eligible colleges",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased min-h-screen flex flex-col">
        <header className="border-b bg-white sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-blue-600">EduFind MVP</Link>
            <nav className="flex gap-6 font-medium text-sm">
              <Link href="/colleges" className="hover:text-blue-600 transition">Search Colleges</Link>
              <Link href="/compare" className="hover:text-blue-600 transition">Compare</Link>
              <Link href="/predictor" className="hover:text-blue-600 transition">Rank Predictor</Link>
            </nav>
          </div>
        </header>
        <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-8">{children}</main>
      </body>
    </html>
  )
}