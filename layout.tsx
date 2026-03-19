// src/app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'CraftVault — Premium Minecraft Accounts',
  description: 'Buy verified, premium Minecraft accounts with instant delivery. MVP+, rare capes, high Hypixel stats. Secure payments via Stripe.',
  keywords: 'minecraft accounts, buy minecraft account, MVP+ account, hypixel account, minecraft store',
  openGraph: {
    title: 'CraftVault — Premium Minecraft Accounts',
    description: 'Secure Minecraft account marketplace with instant delivery.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root {
            --font-orbitron: 'Orbitron', monospace;
            --font-rajdhani: 'Rajdhani', sans-serif;
            --font-jetbrains: 'JetBrains Mono', monospace;
          }
        `}</style>
      </head>
      <body>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Navbar />
          <main style={{ minHeight: '100vh' }}>{children}</main>
          <Footer />
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'rgba(15, 23, 42, 0.95)',
              color: '#E2E8F0',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              backdropFilter: 'blur(16px)',
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: '1rem',
            },
            success: { iconTheme: { primary: '#22D3EE', secondary: '#0A1628' } },
            error: { iconTheme: { primary: '#F87171', secondary: '#0A1628' } },
          }}
        />
      </body>
    </html>
  )
}
