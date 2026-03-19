// src/app/page.tsx
'use client'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import AccountCard from '@/components/marketplace/AccountCard'
import { AccountCardSkeleton } from '@/components/ui/index'
import type { MinecraftAccount } from '@/types'

const TRUST_ITEMS = [
  { icon: '🔐', title: 'AES-256 Encrypted', desc: 'All credentials stored with military-grade encryption' },
  { icon: '⚡', title: 'Instant Delivery', desc: 'Credentials delivered immediately after payment confirms' },
  { icon: '✅', title: 'Verified Accounts', desc: 'Every account tested and verified before listing' },
  { icon: '💳', title: 'Secure Payments', desc: 'Powered by Stripe — the industry standard' },
  { icon: '🔄', title: 'Refund Policy', desc: 'Admin-reviewed refunds for eligible cases' },
  { icon: '🛡️', title: 'Anti-Fraud', desc: 'Rate limiting, anomaly detection, and IP monitoring' },
]

const CATEGORIES = [
  { label: 'MVP++ Accounts', icon: '👑', filter: '?rank=MVP_PLUS_PLUS', color: '#FDE047', glow: 'rgba(234,179,8,0.3)' },
  { label: 'MVP+ Accounts', icon: '⭐', filter: '?rank=MVP_PLUS', color: '#A5B4FC', glow: 'rgba(99,102,241,0.3)' },
  { label: 'Rare Capes', icon: '🦸', filter: '?hasCape=true', color: '#C4B5FD', glow: 'rgba(139,92,246,0.3)' },
  { label: 'High Level (100+)', icon: '⚡', filter: '?minLevel=100', color: '#22D3EE', glow: 'rgba(34,211,238,0.3)' },
  { label: 'Budget Picks', icon: '💎', filter: '?maxPrice=20&sortBy=price_asc', color: '#4ADE80', glow: 'rgba(34,197,94,0.3)' },
  { label: 'Top Rated', icon: '🏆', filter: '?sortBy=newest', color: '#FB923C', glow: 'rgba(251,146,60,0.3)' },
]

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      const start = Date.now()
      const dur = 1500
      const tick = () => {
        const p = Math.min((Date.now() - start) / dur, 1)
        const ease = 1 - Math.pow(1 - p, 3)
        setVal(Math.round(ease * target))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
      observer.disconnect()
    })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])
  return <div ref={ref}>{val.toLocaleString()}{suffix}</div>
}

export default function HomePage() {
  const [featured, setFeatured] = useState<MinecraftAccount[]>([])
  const [loading, setLoading] = useState(true)
  const [particles] = useState(() => Array.from({ length: 20 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 3 + 1, dur: Math.random() * 4 + 3, delay: Math.random() * 3,
  })))

  useEffect(() => {
    fetch('/api/accounts?limit=6&sortBy=newest')
      .then(r => r.json())
      .then(d => { if (d.success) setFeatured(d.data.data) })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div style={{ paddingTop: 64, position: 'relative', zIndex: 1 }}>

      {/* ── HERO ─────────────────────────────────── */}
      <section style={{
        minHeight: '92vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '80px 24px 60px', position: 'relative', overflow: 'hidden',
      }}>
        {/* Animated background orbs */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', top: '10%', left: '20%', width: 400, height: 400, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
            animation: 'float 7s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', bottom: '20%', right: '15%', width: 300, height: 300, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34,211,238,0.09) 0%, transparent 70%)',
            animation: 'float 9s ease-in-out infinite reverse',
          }} />
          {/* Floating particles */}
          {particles.map(p => (
            <div key={p.id} style={{
              position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
              width: p.size, height: p.size, borderRadius: '50%',
              background: p.id % 2 === 0 ? 'rgba(59,130,246,0.4)' : 'rgba(34,211,238,0.4)',
              animation: `float ${p.dur}s ease-in-out ${p.delay}s infinite`,
            }} />
          ))}
        </div>

        <div style={{ position: 'relative', maxWidth: 900 }}>
          {/* Eyebrow */}
          <div className="fade-in-up fade-in-up-delay-1" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)',
            borderRadius: 100, padding: '6px 18px', marginBottom: 32,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22D3EE', animation: 'glowPulse 2s infinite', display: 'block' }} />
            <span style={{ fontFamily: 'var(--font-orbitron)', fontSize: '0.65rem', letterSpacing: '0.12em', color: '#22D3EE', textTransform: 'uppercase' }}>
              Secure Minecraft Marketplace
            </span>
          </div>

          <h1 className="fade-in-up fade-in-up-delay-2" style={{
            fontFamily: 'var(--font-orbitron)', fontSize: 'clamp(2rem, 6vw, 4.5rem)',
            fontWeight: 900, lineHeight: 1.1, marginBottom: 28,
            color: '#F1F5F9',
          }}>
            Buy Premium{' '}
            <span style={{
              background: 'linear-gradient(135deg, #3B82F6 0%, #22D3EE 50%, #3B82F6 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              animation: 'shimmer 3s linear infinite',
            }}>Minecraft Accounts</span>
          </h1>

          <p className="fade-in-up fade-in-up-delay-3" style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: '#94A3B8', marginBottom: 44,
            lineHeight: 1.7, maxWidth: 640, margin: '0 auto 44px',
            fontFamily: 'var(--font-rajdhani)', fontWeight: 500,
          }}>
            Verified accounts with MVP+, rare capes, and high Hypixel stats.
            Instant delivery, encrypted credentials, and secure Stripe checkout.
          </p>

          <div className="fade-in-up fade-in-up-delay-4" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/accounts" style={{
              padding: '14px 36px', borderRadius: 10, textDecoration: 'none',
              fontFamily: 'var(--font-orbitron)', fontSize: '0.75rem', fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              background: 'linear-gradient(135deg, #3B82F6, #22D3EE)',
              color: 'white', boxShadow: '0 0 32px rgba(59,130,246,0.45)',
              transition: 'all 0.3s',
              display: 'flex', alignItems: 'center', gap: 8,
            }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateY(-3px)'; el.style.boxShadow = '0 0 48px rgba(59,130,246,0.65)' }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 0 32px rgba(59,130,246,0.45)' }}
            >
              <span>Browse Accounts</span>
              <span>→</span>
            </Link>
            <Link href="/auth/register" style={{
              padding: '14px 36px', borderRadius: 10, textDecoration: 'none',
              fontFamily: 'var(--font-orbitron)', fontSize: '0.75rem', fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              background: 'rgba(59,130,246,0.08)',
              border: '1px solid rgba(59,130,246,0.3)',
              color: '#93C5FD', transition: 'all 0.3s',
            }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.background = 'rgba(59,130,246,0.15)'; el.style.transform = 'translateY(-3px)' }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'rgba(59,130,246,0.08)'; el.style.transform = 'translateY(0)' }}
            >Create Account</Link>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 48, justifyContent: 'center', marginTop: 64, flexWrap: 'wrap' }}>
            {[
              { label: 'Accounts Sold', target: 1240, suffix: '+' },
              { label: 'Satisfied Buyers', target: 890, suffix: '+' },
              { label: 'Avg. Delivery', target: 0, label2: '< 10 sec' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'var(--font-orbitron)', fontSize: '2rem', fontWeight: 800,
                  background: 'linear-gradient(135deg, #3B82F6, #22D3EE)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>
                  {s.label2 ? s.label2 : <CountUp target={s.target} suffix={s.suffix} />}
                </div>
                <div style={{ color: '#475569', fontSize: '0.8rem', fontFamily: 'var(--font-orbitron)', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────── */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'var(--font-orbitron)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, color: '#E2E8F0', marginBottom: 12 }}>
            Browse by Category
          </h2>
          <p style={{ color: '#64748B', fontFamily: 'var(--font-rajdhani)', fontSize: '1.05rem' }}>Find the perfect account for your playstyle</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
          {CATEGORIES.map(cat => (
            <Link key={cat.label} href={`/accounts${cat.filter}`} style={{ textDecoration: 'none' }}>
              <div className="glass-card" style={{
                padding: '24px 20px', textAlign: 'center', cursor: 'pointer',
                transition: 'all 0.25s ease', border: '1px solid rgba(59,130,246,0.15)',
              }}
                onMouseEnter={e => {
                  const el = e.currentTarget
                  el.style.transform = 'translateY(-4px)'
                  el.style.boxShadow = `0 0 24px ${cat.glow}`
                  el.style.borderColor = cat.glow
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget
                  el.style.transform = 'translateY(0)'
                  el.style.boxShadow = 'none'
                  el.style.borderColor = 'rgba(59,130,246,0.15)'
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 10 }}>{cat.icon}</div>
                <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '0.72rem', fontWeight: 700, color: cat.color, letterSpacing: '0.04em' }}>{cat.label}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED ACCOUNTS ────────────────────── */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 24px 80px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-orbitron)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, color: '#E2E8F0', marginBottom: 8 }}>
              Latest Accounts
            </h2>
            <p style={{ color: '#64748B', fontFamily: 'var(--font-rajdhani)', fontSize: '1rem' }}>Fresh listings, verified and ready</p>
          </div>
          <Link href="/accounts" style={{
            padding: '10px 22px', borderRadius: 8, textDecoration: 'none',
            fontFamily: 'var(--font-orbitron)', fontSize: '0.65rem', fontWeight: 700,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            border: '1px solid rgba(59,130,246,0.3)', color: '#60A5FA',
            background: 'rgba(59,130,246,0.08)', whiteSpace: 'nowrap',
          }}>View All →</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
          {loading
            ? Array(6).fill(0).map((_, i) => <AccountCardSkeleton key={i} />)
            : featured.map(acc => <AccountCard key={acc.id} account={acc} featured={acc.isFeatured} />)
          }
        </div>
      </section>

      {/* ── TRUST SECTION ────────────────────────── */}
      <section style={{
        borderTop: '1px solid rgba(59,130,246,0.1)',
        borderBottom: '1px solid rgba(59,130,246,0.1)',
        background: 'rgba(4,13,26,0.5)', padding: '80px 24px',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontFamily: 'var(--font-orbitron)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, color: '#E2E8F0', marginBottom: 12 }}>
              Why Choose CraftVault?
            </h2>
            <p style={{ color: '#64748B', fontFamily: 'var(--font-rajdhani)', fontSize: '1.05rem' }}>Security and trust are our foundation</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {TRUST_ITEMS.map((item, i) => (
              <div key={i} className="glass-card" style={{ padding: '28px 24px', transition: 'transform 0.2s', animationDelay: `${i * 0.1}s` }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <div style={{ fontSize: 32, marginBottom: 14 }}>{item.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-orbitron)', fontSize: '0.78rem', fontWeight: 700, color: '#E2E8F0', marginBottom: 8, letterSpacing: '0.04em' }}>{item.title}</h3>
                <p style={{ color: '#64748B', fontSize: '0.88rem', lineHeight: 1.6, fontFamily: 'var(--font-rajdhani)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────── */}
      <section style={{ textAlign: 'center', padding: '100px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 600, height: 300, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-orbitron)', fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: 900, color: '#E2E8F0', marginBottom: 20 }}>
            Ready to Level Up?
          </h2>
          <p style={{ color: '#64748B', fontFamily: 'var(--font-rajdhani)', fontSize: '1.1rem', marginBottom: 36, lineHeight: 1.6 }}>
            Browse our selection of verified premium Minecraft accounts with instant delivery.
          </p>
          <Link href="/accounts" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 48px',
            borderRadius: 12, textDecoration: 'none',
            fontFamily: 'var(--font-orbitron)', fontSize: '0.78rem', fontWeight: 800,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            background: 'linear-gradient(135deg, #3B82F6, #22D3EE)',
            color: 'white', boxShadow: '0 0 40px rgba(59,130,246,0.45)',
            animation: 'glow-pulse 3s ease-in-out infinite',
          }}>
            Shop Now — Instant Delivery ⚡
          </Link>
        </div>
      </section>
    </div>
  )
}
