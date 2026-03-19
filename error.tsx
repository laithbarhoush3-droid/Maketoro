// src/app/error.tsx
'use client'
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error) }, [error])

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'80px 24px', position:'relative', zIndex:1 }}>
      <div style={{ textAlign:'center', maxWidth:480 }}>
        <div style={{ fontSize:64, marginBottom:20 }}>⚠️</div>
        <h2 style={{ fontFamily:'var(--font-orbitron)', fontSize:'1.2rem', fontWeight:700, color:'#E2E8F0', marginBottom:12 }}>Something Went Wrong</h2>
        <p style={{ color:'#64748B', fontFamily:'var(--font-rajdhani)', fontSize:'1rem', lineHeight:1.6, marginBottom:32 }}>
          An unexpected error occurred. Our team has been notified.
        </p>
        <div style={{ display:'flex', gap:12, justifyContent:'center' }}>
          <button onClick={reset} style={{
            padding:'12px 32px', borderRadius:8, cursor:'pointer', border:'none',
            background:'linear-gradient(135deg, #3B82F6, #22D3EE)', color:'white',
            fontFamily:'var(--font-orbitron)', fontSize:'0.68rem', fontWeight:700,
            letterSpacing:'0.08em', boxShadow:'0 0 20px rgba(59,130,246,0.3)',
          }}>Try Again</button>
          <a href="/" style={{
            padding:'12px 24px', borderRadius:8, textDecoration:'none',
            background:'rgba(59,130,246,0.1)', border:'1px solid rgba(59,130,246,0.25)',
            color:'#60A5FA', fontFamily:'var(--font-orbitron)', fontSize:'0.68rem', fontWeight:700,
          }}>Go Home</a>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <div style={{ marginTop:24, padding:'14px', background:'rgba(248,113,113,0.08)', border:'1px solid rgba(248,113,113,0.2)', borderRadius:8, textAlign:'left' }}>
            <code style={{ color:'#F87171', fontSize:'0.78rem', fontFamily:'var(--font-jetbrains)', wordBreak:'break-all' }}>{error.message}</code>
          </div>
        )}
      </div>
    </div>
  )
}
