import React from "react"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { CartProvider } from '@/lib/cart-context'
import { AdminProvider } from '@/lib/admin-context'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

import FloatingContact from '@/components/floating-contact';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'AutoCAD Store | Official Genuine Software Licenses',
  description: 'Buy genuine AutoCAD 2026 licenses for Windows PC. Instant email delivery, lifetime support, and best prices guaranteed.',
  keywords: 'AutoCAD 2026, Autodesk subscription, CAD software, low cost AutoCAD, AutoCAD for Windows, genuine AutoCAD license',
  icons: {
    icon: '/images/autocad-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased selection:bg-primary/30 selection:text-primary`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AdminProvider>
            <CartProvider>
              {children}
              <FloatingContact />
            </CartProvider>
          </AdminProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
