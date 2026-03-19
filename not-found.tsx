// src/app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'80px 24px', position:'relative', zIndex:1 }}>
      <div style={{ position:'fixed', top:'40%', left:'50%', transform:'translateX(-50%)', width:600, height:400, borderRadius:'50%', background:'radial-gradient(ellipse, rgba(59,130,246,0.07) 0%, transparent 70%)', pointerEvents:'none' }} />
      <div style={{ textAlign:'center', maxWidth:500 }}>
        <div style={{ fontFamily:'var(--font-orbitron)', fontSize:'clamp(5rem, 15vw, 9rem)', fontWeight:900, background:'linear-gradient(135deg, #3B82F6, #22D3EE)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', lineHeight:1, marginBottom:24 }}>404</div>
        <h2 style={{ fontFamily:'var(--font-orbitron)', fontSize:'1.2rem', fontWeight:700, color:'#E2E8F0', marginBottom:12 }}>Page Not Found</h2>
        <p style={{ color:'#64748B', fontFamily:'var(--font-rajdhani)', fontSize:'1.05rem', lineHeight:1.6, marginBottom:36 }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
          <Link href="/" style={{
            padding:'12px 32px', borderRadius:8, textDecoration:'none',
            background:'linear-gradient(135deg, #3B82F6, #22D3EE)', color:'white',
            fontFamily:'var(--font-orbitron)', fontSize:'0.68rem', fontWeight:700,
            letterSpacing:'0.08em', boxShadow:'0 0 20px rgba(59,130,246,0.35)',
          }}>Go Home</Link>
          <Link href="/accounts" style={{
            padding:'12px 28px', borderRadius:8, textDecoration:'none',
            background:'rgba(59,130,246,0.1)', border:'1px solid rgba(59,130,246,0.25)',
            color:'#60A5FA', fontFamily:'var(--font-orbitron)', fontSize:'0.68rem', fontWeight:700,
          }}>Browse Accounts</Link>
        </div>
      </div>
    </div>
  )
}
