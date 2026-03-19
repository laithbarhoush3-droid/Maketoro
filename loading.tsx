// src/app/loading.tsx
export default function Loading() {
  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', zIndex:1 }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ position:'relative', width:56, height:56, margin:'0 auto 20px' }}>
          <div style={{ width:56, height:56, border:'3px solid rgba(59,130,246,0.15)', borderTopColor:'#3B82F6', borderRadius:'50%', animation:'spin 0.9s linear infinite' }} />
          <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', fontSize:20 }}>⚡</div>
        </div>
        <p style={{ color:'#475569', fontFamily:'var(--font-orbitron)', fontSize:'0.65rem', letterSpacing:'0.12em', textTransform:'uppercase' }}>Loading</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
